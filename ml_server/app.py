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
import datetime
import glob
import json
from profiling import profilingProcess


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
# *** Endpoint to Get Dataset's name   ***
# ****************************************
@app.route('/files/infos', methods=['GET'])
def get_files_infos():
    folder_path = './dataset/'
    files = os.listdir(folder_path)
    file_info = []
    for file_name in files:
        file_path = os.path.join(folder_path, file_name)
        creation_time = datetime.datetime.fromtimestamp(os.path.getctime(file_path))
        file_info.append({'name': file_name, 'creation_date': creation_time.strftime('%Y-%m-%d %H:%M:%S')})
    return jsonify(file_info)

# ****************************************
# ***** Endpoint to Get ML Models   *****
# ****************************************
@app.route('/models', methods=['GET'])
def get_models():
    folder_path = './models/'
    files = os.listdir(folder_path)
    return jsonify(files)

# ****************************************
# **** Endpoint to Get used ML Model  ****
# ****************************************
@app.route('/models/use', methods=['GET'])
def get_used_model():
    folder_path = './usedModel/'
    files = os.listdir(folder_path)
    return jsonify(files)

# ****************************************
# ***** Endpoint to use a ML Model   *****
# ****************************************
@app.route('/models/use', methods=['POST'])
def use_models():
    request_data = request.json 
    modelname = request_data['name']
    folder_path = './models/'
    target_folder = './usedModel/'
    # Remove the entire target folder if it exists
    if os.path.exists(target_folder):
        shutil.rmtree(target_folder)

    # Recreate the empty target folder
    os.makedirs(target_folder)

    # Construct paths for source and destination
    source_path = os.path.join(folder_path, modelname)
    destination_path = os.path.join(target_folder, modelname)
    
    # Copy the model file to the destination folder
    shutil.copy2(source_path, destination_path)
    
    return jsonify({'message': 'Model copied successfully.'}), 200

# ****************************************
# ***** Endpoint to delete a ML Model   *****
# ****************************************
@app.route('/models/delete', methods=['POST'])
def delete_models():
    request_data = request.json 
    modelname = request_data['name']
    folder_path = './models/'
    folder_path_json = './metrics/'

    MLModel = modelname+".joblib"
    json0 = modelname+"0.json"
    json1 = modelname+"1.json"

    # Construct the path for the file to be deleted
    file_path = os.path.join(folder_path, MLModel)
    # Construct the path for the json0 file to be deleted
    file_path1 = os.path.join(folder_path_json, json0)
    # Construct the path for the json1 file to be deleted
    file_path2 = os.path.join(folder_path_json, json1)

    # Check if the file exists
    if os.path.exists(file_path):
        # Delete the file
        os.remove(file_path)

    # Check if the json file exists
    if os.path.exists(folder_path_json):
        # Delete the file
        os.remove(file_path1)
        os.remove(file_path2)

    return jsonify({'message': f'Model "{modelname}" deleted successfully.'}), 200
        
# ****************************************
# ***** Endpoint to delete a ML Model   *****
# ****************************************
@app.route('/dataset/delete', methods=['POST'])
def delete_dataset():
    request_data = request.json 
    modelname = request_data['name']
    folder_path = './dataset/'

    # Construct the path for the file to be deleted
    file_path = os.path.join(folder_path, modelname)

    # Check if the file exists
    if os.path.exists(file_path):
        # Delete the file
        os.remove(file_path)
        return jsonify({'message': f'Dataset "{modelname}" deleted successfully.'}), 200
    else:
        return jsonify({'error': f'Dataset "{modelname}" not found.'}), 404
        
    
# ****************************************
# *** Endpoint to make the profiling   ***
# ****************************************
@app.route('/profiling', methods=['POST'])
def profiling():
    request_data = request.json 
    datasetName = request_data['data']
    response = []
    code = read_file_as_string(f"./profiling/code1.txt")
    profiling_evaluate_code(code, response)

    code = f"""
# numbering the figures
raw_data = pd.read_csv('./dataset/{datasetName}')
df = raw_data.copy()
print(df.head(5))  # Printing the first 5 rows for verification
"""
    profiling_evaluate_code(code, response)
    code = read_file_as_string(f"./profiling/code2.txt")
    profiling_evaluate_code(code, response)
    profilingProcess.execute_profiling(datasetName)
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

    json_folder = './json'  # Directory where your JSON files are located
    json_files = ['data1.json', 'data2.json', 'data3.json', 'data4.json', 'data5.json', 'data6.json', 'data7.json']
    # Array to hold the JSON strings
    json_strings = []
    
    for filename in json_files:
        filepath = os.path.join(json_folder, filename)
        with open(filepath, 'r') as f:
            # Read the JSON content
            json_content = json.load(f)
            # Convert the JSON content to a string
            json_str = json.dumps(json_content)
            # Append the JSON string to the list
            json_strings.append(json_str)

    return jsonify(json_strings)





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

metrics_val.to_json("./metrics/Binary_'+model_name+f'_{modeName}0.json")
metrics_test.to_json("./metrics/Binary_'+model_name+f'_{modeName}1.json")
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
        joblib.dump(fit_model, './models/Binary_'+model_name+f'_{modeName}.joblib')
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

metrics_val.to_json("./metrics/Multi_'+model_name+f'_{modeName}0.json")
metrics_test.to_json("./metrics/Multi_'+model_name+f'_{modeName}1.json")

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
        joblib.dump(fit_model, './models/Multi_'+model_name+f'_{modeName}.joblib')
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

knn = KNeighborsClassifier()
svc = SVC()
rfc = RandomForestClassifier()
xgb = XGBClassifier()

if argument == 'knn':
    clf = [knn]
    clf_str = ["KNN"]
    clf_params = {params}
    params = pd.Series(data=[clf_params],index=clf)
elif argument == 'svc':
    clf = [svc]
    clf_str =["SVC"]
    clf_params = {params}
    params = pd.Series(data=[clf_params],index=clf)
elif argument == 'rfc':
    clf = [rfc]
    clf_str = ["RFC"]
    clf_params = {params}
    params = pd.Series(data=[clf_params],index=clf)
else:
    clf = [xgb]
    clf_str = ["XGB"]
    clf_params = {params}
    params = pd.Series(data=[clf_params],index=clf)
"""
        evaluate_code(code)
        code = read_file_as_string("./code/manual/code25.txt")
        evaluate_code(code)
        code = read_file_as_string("./code/manual/code26.txt")
        evaluate_code(code)
        print("************************************")
        print("Saving Models")
        print("************************************")
        UppermodelName = modelName.upper()
        code = f"""


metrics_val.to_json('./metrics/Binary_'+f'{UppermodelName}'+f'_{modeName}0.json')
metrics_test.to_json('./metrics/Binary_'+f'{UppermodelName}'+f'_{modeName}1.json')

import pandas as pd
import joblib


for i, fit_model in enumerate(fitted_models_binary):
    joblib.dump(fit_model, './models/Binary_'+clf_str[0]+f'_{modeName}.joblib')
        
"""
        evaluate_code(code)
    else:
        code = read_file_as_string("./code/manual/code27.txt")
        evaluate_code(code)
        print("************************************")
        print("Start training Models  (MultiClass)")
        print("************************************")
        code = f"""
argument = "{modelName}"

knn = KNeighborsClassifier()
svc = SVC()
rfc = RandomForestClassifier()
xgb = XGBClassifier()

if argument == 'knn':
    clf = [knn]
    clf_str = ["KNN"]
    clf_params = {params}
    params = pd.Series(data=[clf_params],index=clf)
elif argument == 'svc':
    clf = [svc]
    clf_str =["SVC"]
    clf_params = {params}
    params = pd.Series(data=[clf_params],index=clf)
elif argument == 'rfc':
    clf = [rfc]
    clf_str = ["RFC"]
    clf_params = {params}
    params = pd.Series(data=[clf_params],index=clf)
else:
    clf = [xgb]
    clf_str = ["XGB"]
    clf_params = {params}
    params = pd.Series(data=[clf_params],index=clf)
"""
        evaluate_code(code)
        code = read_file_as_string("./code/manual/code28.txt")
        evaluate_code(code)
        code = read_file_as_string("./code/manual/code29.txt")
        evaluate_code(code)
        print("************************************")
        print("Saving Models")
        print("************************************")
        UppermodelName = modelName.upper()
        code = f"""

metrics_val.to_json('./metrics/Multi_'+f'{UppermodelName}'+f'_{modeName}0.json')
metrics_test.to_json('./metrics/Multi_'+f'{UppermodelName}'+f'_{modeName}1.json')


import pandas as pd
import joblib

for i, fit_model in enumerate(fitted_models_multi):
    joblib.dump(fit_model, './models/Multi_'+clf_str[0]+f'_{modeName}.joblib')
"""
        evaluate_code(code)                  

    # Return the JSON data
    return jsonify("DONE")


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
    folder_path = './usedModel/'
    source_files = glob.glob(os.path.join(folder_path, '*.joblib'))
    source_path = source_files[0]
    loaded_model = joblib.load(source_path)
    filename = os.path.basename(source_path)
    if filename.startswith('Binary_'):
        model_type = 0
    else:
        model_type = 1
    predictions = loaded_model.predict([[type,air_temp, process_temp, rotational_speed, torque, tool_wear]])
    return jsonify({'result': predictions.tolist(), 'type': model_type})

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

# ****************************************
# *****   Endpoint to GET Metrics    *****
# ****************************************
@app.route('/metrics', methods=['POST'])
def get_metrics():
    directory = './metrics'
    request_data = request.json 
    name = request_data['name']
    # List all files in the directory
    files = os.listdir(directory)

    # Initialize an empty dictionary to store the JSON data
    json_data = {}

    # Iterate through each file
    for file_name in files:
        # Assuming all files in the directory are JSON files
        if file_name == name+"0.json" or file_name == name+"1.json":
            with open(os.path.join(directory, file_name), 'r') as file:
                # Read the JSON data from the file
                data = json.load(file)
                
                # Check if data is a dictionary
                if isinstance(data, dict):
                    # Get the first key and its value
                    first_key = next(iter(data.keys()))  # Get the first key
                    value = data[first_key]
                    
                    # Check if the value is also a dictionary
                    if isinstance(value, dict):
                        # Create a new dictionary with the first key's content and rename it to 'key'
                        new_data = {'key': value}
                        # Get the filename without extension
                        filename_without_extension = os.path.splitext(file_name)[0]
                        # Store the modified JSON data in the dictionary with the filename (without extension) as the key
                        json_data[filename_without_extension] = new_data
                    else:
                        # Handle case where the value is not a dictionary
                        print(f"Skipping file {file_name}: first key's value is not a dictionary")
                else:
                    # If data is not a dictionary, skip the file or handle it as needed
                    print(f"Skipping file {file_name}: not a JSON object")

    # Return the JSON data
    return jsonify(json_data)


if __name__ == '__main__':
    app.run(port=8080, debug=True)
