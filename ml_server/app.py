from flask import Flask, jsonify, request
from flask_cors import CORS
from contextlib import redirect_stdout
import io
import ast
import os
import matplotlib
matplotlib.use('Agg')  # Use 'Agg' backend
import matplotlib.pyplot as plt
from IPython.display import Image
import pandas as pd
import joblib
import shutil



# Get the path of the project directory
project_dir = os.path.dirname(os.path.abspath(__file__))

# Set display options to show all rows and columns
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)



app = Flask(__name__)
CORS(app, supports_credentials=True)


# ****************************************
# *** Function to evaluate python code ***
# ***      Used in profiling step      ***
# ****************************************
def profiling_evaluate_code(code,response):
    parsed = ast.parse(code)
    outputs = []

    with redirect_stdout(io.StringIO()) as f:
        try:
            for node in parsed.body:
                if isinstance(node, ast.Expr):
                    # Use eval for expressions
                    result = eval(compile(ast.Expression(node.value), "<string>", "eval"), globals())
                    if isinstance(result, pd.DataFrame):
                        # Display DataFrame as HTML table
                        json_data = result.to_json(orient="records")                        # # Create the dictionary object
                        table_object = {"type": "table", "data": json_data}
                        response.append(table_object)
                        display(json_data)
                    elif isinstance(result, plt.Axes):
                        # fig_object = {"type": "figure", "data": fig_num}
                        # response.append(fig_object)
                        # fig_num += 1
                        print(result)
                    elif isinstance(result, plt.Figure):
                        # fig_object = {"type": "figure", "data": fig_num}
                        # response.append(fig_object)
                        # fig_num += 1
                        print(result)
                    elif isinstance(result, pd.Series):
                        # Convert Series to dictionary before appending
                        serie_object = {"type": "text", "data": result.to_dict()}
                        response.append(serie_object)
                    else:
                        print(result)
                else:
                    # Use exec for other statements
                    exec(compile(ast.Module(body=[node], type_ignores=[]), "<string>", "exec"), globals())
        except Exception as e:
            print('Error!')
            print(f"{e.__class__.__name__} : {e}")

    return f.getvalue()


# ****************************************
# *** Function to evaluate python code ***
# ***   Used in creating model step    ***
# ****************************************
def evaluate_code(code):
    parsed = ast.parse(code)
    outputs = []

    with redirect_stdout(io.StringIO()) as f:
        try:
            for node in parsed.body:
                if isinstance(node, ast.Expr):
                    # Use eval for expressions
                    result = eval(compile(ast.Expression(node.value), "<string>", "eval"), globals())
                    if isinstance(result, pd.DataFrame):
                        # Display DataFrame as HTML table
                        html_table = result.to_html(classes="table table-bordered", justify="center", index=False)
                        display(html_table)
                    elif isinstance(result, plt.Figure):
                        # Save matplotlib plot as image in the project directory
                        img_path = os.path.join(project_dir, 'plot.png')
                        result.savefig(img_path)
                        plt.close(result)  # Close the plot to release resources
                        # print(img_path)  # Print image path
                    else:
                        # Display other objects
                        print(result)
                else:
                    # Use exec for other statements
                    exec(compile(ast.Module(body=[node], type_ignores=[]), "<string>", "exec"), globals())
        except Exception as e:
            print('Error!')
            print(f"{e.__class__.__name__} : {e}")

    return f.getvalue()



# ****************************************
# ***  Function to read code from txt  ***
# ****************************************
def read_file_as_string(file_path):
    try:
        with open(file_path, 'r') as file:
            file_content = file.read()
        return file_content
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None
    except Exception as e:
        print(f"Error reading file: {e}")
        return None


# ****************************************
# ***** Endpoint to upload Dataset   *****
# ****************************************
@app.route('/upload', methods=['POST'])
def upload_file():    
    file = request.files['file']
    
    # Process and save the file
    file.save('./dataset/' + file.filename)
    
    return jsonify({"bool": True, "message": 'File uploaded successfully'})


# ****************************************
# *** Endpoint to Get Dataset's name   ***
# ****************************************
@app.route('/files', methods=['GET'])
def get_files():
    folder_path = './dataset/'
    files = os.listdir(folder_path)
    return jsonify(files)

# ****************************************
# ***** Endpoint to Get ML Models   *****
# ****************************************
@app.route('/models', methods=['GET'])
def get_models():
    folder_path = './models/'
    files = os.listdir(folder_path)
    return jsonify(files)

# ****************************************
# *** Endpoint to make the profiling   ***
# ****************************************
@app.route('/profiling', methods=['POST'])
def profiling():
    request_data = request.json 
    datasetName = request_data['data']
    response = []
    for i in range(1, 9):
        if i == 2:
            # Ensure proper indentation
            code = f"""
# numbering the figures
fig_number = 1
raw_data = pd.read_csv('./dataset/{datasetName}')
df = raw_data.copy()
print(df.head(5))  # Printing the first 5 rows for verification
"""
        else:
            code = read_file_as_string(f"./profiling/code{i}.txt")
        profiling_evaluate_code(code, response)  # Assuming this function appends to response
    # Source directory to copy
    source_dir = './figures'
    # Destination directory to copy to
    destination_dir = '../client/src/assets/figures'
    # Check if destination directory exists
    if os.path.exists(destination_dir):
        # Remove destination directory and its contents
        shutil.rmtree(destination_dir)
    # Copy the source directory and its contents to the destination directory
    shutil.copytree(source_dir, destination_dir)
    return {'result': response}





# ****************************************
# *** Endpoint to create a model and   ***
# *** select automatically the best    ***
# *** params and best model to use     ***
# ****************************************
@app.route('/auto/create', methods=['POST'])
def evaluate():
    request_data = request.json 
    modeName = request_data['name']
    datasetName = request_data['dataset']
    type = request_data['type']
    print(modeName)
    print(datasetName)

    for i in range(1, 24):
        if i == 2:
            # Ensure proper indentation
            code = f"""
raw_data = pd.read_csv('./dataset/{datasetName}')
df = raw_data.copy()
df.head(2)
"""
            evaluate_code(code)
        else:
            code = read_file_as_string("./code/auto/code" + str(i) + ".txt")
            evaluate_code(code)

    if type == 0:
        code = read_file_as_string("./code/auto/code24.txt")
        evaluate_code(code)
        print("************************************")
        print("Start training Models (Binary)")
        print("************************************")
        code = read_file_as_string("./code/auto/code25.txt")
        evaluate_code(code)
        code = read_file_as_string("./code/auto/code26.txt")
        evaluate_code(code)
        print("************************************")
        print("Saving Models")
        print("************************************")
        code = f"""
import pandas as pd
import joblib

def choose_best_algorithm(validation_scores):
    # Calculate the mean score for each algorithm across all criteria
    mean_scores = validation_scores.mean()

    # Get the algorithm with the highest mean score
    best_algorithm = mean_scores.idxmax()

    return best_algorithm

best_algorithm = choose_best_algorithm(metrics_test)

for i, fit_model in enumerate(fitted_models_binary):
    model_name = clf_str[i]
    if model_name == best_algorithm:
        joblib.dump(fit_model, './models/'+model_name+f'_{modeName}.joblib')
"""
        evaluate_code(code)
    else:
        code = read_file_as_string("./code/auto/code27.txt")
        evaluate_code(code)
        print("************************************")
        print("Start training Models (MultiClass)")
        print("************************************")
        code = read_file_as_string("./code/auto/code28.txt")
        evaluate_code(code)
        code = read_file_as_string("./code/auto/code29.txt")
        evaluate_code(code)
        print("************************************")
        print("Saving Models")
        print("************************************")
        code = f"""
import pandas as pd
import joblib

def choose_best_algorithm(validation_scores):
    # Calculate the mean score for each algorithm across all criteria
    mean_scores = validation_scores.mean()

    # Get the algorithm with the highest mean score
    best_algorithm = mean_scores.idxmax()

    return best_algorithm

best_algorithm = choose_best_algorithm(metrics_test)

for i, fit_model in enumerate(fitted_models_multi):
    model_name = clf_str[i]
    if model_name == best_algorithm:
        joblib.dump(fit_model, './models/'+model_name+f'_{modeName}.joblib')
"""
        evaluate_code(code)

    return jsonify({'result': True})







# ****************************************
# *** Endpoint to create a model and   ***
# ***        select manually tt        ***
# ****************************************
@app.route('/manual/create', methods=['POST'])
def evaluateManual():
    request_data = request.json 
    modeName = request_data['name']
    datasetName = request_data['dataset']
    type = request_data['type']
    modelName = request_data['model']
    params = request_data['params']
   

    for i in range(1, 24):
        if i == 2:
            # Ensure proper indentation
            code = f"""
raw_data = pd.read_csv('./dataset/{datasetName}')
df = raw_data.copy()
df.head(2)
"""
            evaluate_code(code)
        else:
            code = read_file_as_string("./code/manual/code" + str(i) + ".txt")
            evaluate_code(code)

    if type == 0:
        code = read_file_as_string("./code/manual/code24.txt")
        evaluate_code(code)
        print("************************************")
        print("Start training Models (Binary)")
        print("************************************")
        code = f"""
argument = "{modelName}"

if argument == 'knn':
    clf = KNeighborsClassifier()
    clf_str = "KNN"
    clf_params = {params}
elif argument == 'svc':
    clf = SVC()
    clf_str = "SVC"
    clf_params = {params}
elif argument == 'rfc':
    clf = RandomForestClassifier()
    clf_str = "RFC"
    clf_params = {params}
else:
    clf = XGBClassifier()
    clf_str = "XGB"
    clf_params = {params}
"""
        evaluate_code(code)
        code = read_file_as_string("./code/manual/code25.txt")
        evaluate_code(code)
        code = read_file_as_string("./code/manual/code26.txt")
        evaluate_code(code)
        print("************************************")
        print("Saving Models")
        print("************************************")
        code = f"""
import pandas as pd
import joblib


for i, fit_model in enumerate(fitted_models_binary):
    joblib.dump(fit_model, './models/'+clf_str+f'_{modeName}.joblib')
        
"""
        evaluate_code(code)
    else:
        code = read_file_as_string("./code/manual/code27.txt")
        evaluate_code(code)
        print("************************************")
        print("Start training Models  (MultiClass)")
        print("************************************")
        code = f"""
argument = f"{modelName}"

if argument == 'knn':
    clf = KNeighborsClassifier()
    clf_str = "KNN"
    clf_params = {params}
elif argument == 'svc':
    clf = SVC()
    clf_str = "SVC"
    clf_params = {params}
elif argument == 'rfc':
    clf = RandomForestClassifier()
    clf_str = "RFC"
    clf_params = {params}
else:
    clf = XGBClassifier()
    clf_str = "XGB"
    clf_params = {params}
"""
        evaluate_code(code)
        code = read_file_as_string("./code/manual/code28.txt")
        evaluate_code(code)
        code = read_file_as_string("./code/manual/code29.txt")
        evaluate_code(code)
        print("************************************")
        print("Saving Models")
        print("************************************")
        code = f"""
import pandas as pd
import joblib

for i, fit_model in enumerate(fitted_models_multi):
    joblib.dump(fit_model, './models/'+clf_str+f'_{modeName}.joblib')
"""
        evaluate_code(code)


    return jsonify({'result': True})


def extract_import_lines_from_files():
    import_lines = []
    for i in range(1, 26):
        file_path = "./code/auto/code" + str(i) + ".txt"
        try:
            with open(file_path, 'r') as file:
                lines = file.readlines()
                import_lines.extend([line.strip() for line in lines if 'import' in line])
        except FileNotFoundError:
            print(f"File {file_path} not found.")
    return '\n'.join(import_lines)

# ****************************************
# ****  Endpoint to make predictions  ****
# ****************************************
@app.route('/predict', methods=['POST'])
def predict():
    # import_string = extract_import_lines_from_files()
    request_data = request.json  
    # Access the inner list
    data_list = request_data['data'][0]
    type = data_list[0]
    air_temp = data_list[1]  # Provide the air temperature value
    process_temp = data_list[2]  # Provide the process temperature value
    rotational_speed = data_list[3]  # Provide the rotational speed value
    torque = data_list[4]  # Provide the torque value
    tool_wear = data_list[5]  # Provide the tool wear value
    loaded_model = joblib.load('./models/XGB.joblib')
    predictions = loaded_model.predict([[type,air_temp, process_temp, rotational_speed, torque, tool_wear]])
    return jsonify({'result': predictions.tolist()})

# ****************************************
# ***** Endpoint to GET Dataset CSV  ****
# ****************************************
@app.route('/download_csv', methods=['POST'])
def download_csv():
    request_data = request.json 
    csvName = request_data['name']
    folder_path = './dataset/'
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(folder_path+csvName)
    
    # Convert the DataFrame to CSV format (you may customize parameters like index, encoding, etc.)
    csv_data = df.to_csv(index=False)
    
    # Set response headers
    headers = {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=data.csv'
    }
    
    # Return the CSV file as a response
    return csv_data, 200, headers


if __name__ == '__main__':
    app.run(port=8080, debug=True)
