def execute_profiling(datasetName):
    import numpy as np
    import pandas as pd
    import io

    from IPython.core.display import display, HTML
    import plotly.graph_objects as go
    import plotly.express as px
    from plotly.subplots import make_subplots
    import plotly.io as pio
    import json
    import os

    import seaborn as sns
    from importlib import reload
    import matplotlib
    import matplotlib.pyplot as plt
    import warnings
    # numbering the figures
    fig_number = 2
    data_number = 1
    raw_data = pd.read_csv(f'./dataset/{datasetName}')
    df = raw_data.copy()
    new_table = df.head(5)
    output_json_path = f'./json/data1.json'  
    new_table.to_json(output_json_path, orient='records', lines=False)


    # print('Features non-null values and data type:')
    # df.info()  #information about the DataFrame
    # n = df.shape[0]
    # print('Check for duplicate values:',
    #     df['Product ID'].unique().shape[0]!=n)

    # Collect DataFrame info
    info_buffer = io.StringIO()
    df.info(buf=info_buffer)
    info_str = info_buffer.getvalue()
    info_buffer.close()

    # Check for duplicate values
    n = df.shape[0]
    duplicate_check = df['Product ID'].unique().shape[0] != n

    # Combine all results into a dictionary
    results = {
        'dataframe_info': info_str,
        'duplicate_check': duplicate_check
    }

    # Define the output JSON file path
    data_number = 1  # initialize or update this variable as needed
    output_json_path = f'./json/data2.json'

    # Save the results dictionary as a JSON file
    with open(output_json_path, 'w') as json_file:
        json.dump(results, json_file, indent=4)
        data_number += 1


    df.replace("?",np.nan,inplace=True)
    # Remove first character and set to numeric dtype
    if df['Product ID'].dtype != 'object':
        df['Product ID'] = df['Product ID'].astype(str)
    df['Product ID'] = df['Product ID'].str.extract('(\d+)', expand=False)
    df['Product ID'] = pd.to_numeric(df['Product ID'])
    # Histogram of ProductID
    plt.show()


    # Drop ID columns
    df1 = df.copy()
    df1.drop(columns=['UDI','Product ID'], inplace=True)

    df1.describe()


    # Set numeric columns dtype to float
    df1['Tool wear [min]'] = df1['Tool wear [min]'].astype('float64')
    df1['Rotational speed [rpm]'] = df1['Rotational speed [rpm]'].astype('float64')
    # Rename features
    df1.rename(mapper={'Air temperature [K]': 'Air temperature',
                        'Process temperature [K]': 'Process temperature',
                        'Rotational speed [rpm]': 'Rotational speed',
                        'Torque [Nm]': 'Torque',
                        'Tool wear [min]': 'Tool wear'}, axis=1, inplace=True)

    # show the numeric characters
    df_numeric = df1.select_dtypes(include=[np.number])
    df_numeric.describe(include='all').T
    plt.figure(figsize=(5,5))
    plot_kws={"s": 1}
    sns.heatmap(df1.isna().transpose(),
                cmap='cividis',
                linewidths=0.0,
            ).set_facecolor('white')
    plt.close()

    # Taking a look at 'Failure Type' variable
    grouped_df = df1.groupby(['Target','Failure Type']).count().drop(['Process temperature',
                                                        'Rotational speed',
                                                        'Torque',
                                                        'Tool wear',
                                                        'Air temperature'],axis=1).rename(columns = {'Type':'count'})

    # Convert the grouped DataFrame to a dictionary
    result_dict = grouped_df.reset_index().to_dict(orient='records')

    # Define the output JSON file path    
    output_json_path = './json/data3.json'

    # Save the dictionary as a JSON file
    with open(output_json_path, 'w') as json_file:
        json.dump(result_dict, json_file, indent=4)

    target_counts = df1['Target'].value_counts(normalize=True)

    # Convert the resulting Series to a dictionary
    result_dict = target_counts.to_dict()

    # Define the output JSON file path
    output_json_path = './json/data4.json'

    # Save the dictionary as a JSON file
    with open(output_json_path, 'w') as json_file:
        json.dump(result_dict, json_file, indent=4)

    # Create lists of features and target names
    features = [col for col in df1.columns
                if df1[col].dtype=='float64' or col =='Type']
    target = ['Target','Failure Type']
    # Portion of data where RNF=1
    idx_RNF = df1.loc[df['Failure Type']=='Random Failures'].index
    df1.loc[idx_RNF,target]

    target_loc = df1.loc[idx_RNF,target]

    # Convert the resulting Series to a dictionary
    result_dict = target_loc.to_dict()

    # Define the output JSON file path
    output_json_path = './json/data7.json'

    # Save the dictionary as a JSON file
    with open(output_json_path, 'w') as json_file:
        json.dump(result_dict, json_file, indent=4)

    first_drop = df1.loc[idx_RNF,target].shape[0]
    print('Number of observations where RNF=1 but Machine failure=0:',first_drop)
    # Drop corresponding observations and RNF column
    df1.drop(index=idx_RNF, inplace=True)

    # Portion of data where Machine failure=1 but no failure cause is specified
    idx_ambiguous = df1.loc[(df1['Target']==1) &
                        (df1['Failure Type']=='No Failure')].index
    second_drop = df1.loc[idx_ambiguous].shape[0]
    print('Number of ambiguous observations:', second_drop)
    display(df1.loc[idx_ambiguous,target])
    df1.drop(index=idx_ambiguous, inplace=True)
    # Global percentage of removed observations
    print('Global percentage of removed observations:',
        (100*(first_drop+second_drop)/n))
    df1.reset_index(drop=True, inplace=True)   # Reset index
    n = df1.shape[0]

    df1.shape[0]

    df1.reset_index(inplace=True, drop=True)

        # Default theme
    sns.set_theme(palette='tab10',
                font_scale=1.5,
                rc=None)

    import matplotlib
    matplotlib.rcParams.update({'font.size': 11})

    plt.figure(figsize=(12,5))

    plt.subplot(1,2,1)
    ax1 = sns.countplot(x='Type', hue='Type', data=df1, palette='tab10', legend=False)  # Assign x to hue
    ax1.bar_label(ax1.containers[0])
    plt.title("Type", fontsize=15, color='Red')

    plt.subplot(1,2,2)
    ax2 = df1['Type'].value_counts().plot.pie(explode=[0.1, 0.1,0.1],autopct='%1.2f%%',shadow=True, colors=sns.color_palette('tab10'))
    ax2.set_title(label = "Type", fontsize = 15, color='Red')

    plt.tight_layout()

    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()


    # Define lighter shades of green and blue
    light_green = '#008000'  # Lighter shade of green
    light_blue = '#000080'   # Lighter shade of blue

    colors = [light_green, light_blue]  # Define colors

    plt.pie(df1['Target'].value_counts(),  explode=[0.1, 0.2], labels=['Not failure', 'Failure'],
            autopct='%1.1f%%', wedgeprops={'edgecolor': 'black'}, shadow=True, startangle=25,
            colors=colors, textprops={'color': 'white'})  # Set text color to white
    plt.title('Failure vs not failure', color='white')  # Set title color to white
    plt.tight_layout()
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    fig, axes = plt.subplots(1,3, figsize=[15,5])
    axes.flatten()
    j=0
    colors = ['#008000', '#000080']
    for i in ['L', 'M', 'H']:
        df_product_type = df1[df1['Type'] == i]
        axes[j].pie(df_product_type['Target'].value_counts(), labels=['Failure', 'Not failure'],
                    autopct='%1.2f%%', wedgeprops={'edgecolor': 'black'}, shadow=True, startangle=25,
                    colors=colors,textprops={'color': 'white'})
        axes[j].set_title('% of failure for ' + i + ' products')
        j+=1

    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    sns.pairplot(df1,hue='Target', height = 3)
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    import matplotlib.pyplot as plt
    import seaborn as sns

    plt.rcParams['axes.labelsize'] = 12
    plt.rcParams['axes.titlesize'] = 16

    # Create subplots
    fig, axes = plt.subplots(1, 2, figsize=[15,5])
    axes = axes.flatten()
    j = 0

    # Define colors for 'Target' values
    colors = ['green', 'blue']

    # Loop through attributes
    for i in ['Torque', 'Rotational speed']:
        # Plot violins for each group based on 'Target' variable
        sns.violinplot(data=df1, x='Target', y=i, ax=axes[j], hue='Target', palette=colors, dodge=False)
        axes[j].set_title(i + ' violin distribution wrt target')
        axes[j].legend_.remove()  # Remove legend
        j += 1

    plt.tight_layout()
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()


    #plt.figure(figsize=(8, 8))
    #sns.heatmap(df1.corr(), annot=True)
    #plt.show()


    numeric_df = df1.select_dtypes(include=['float64', 'int64'])  # Select only numeric columns
    plt.figure(figsize=(8, 8))
    sns.heatmap(numeric_df.corr(), annot=True)
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    # Observe distribution of failures in a pie chart
    import plotly.graph_objects as go
    import plotly.express as px

    fig = px.pie(df1,
                title='Failure Types',
                names='Failure Type')

    fig.update_layout(margin=dict(t=0, b=0, l=0, r=0))

    # fig_path = "./figures/fig" + str(fig_number) + ".png"
    # fig.savefig(fig_path)
    # fig_number += 1


    fig, ax = plt.subplots(1,2, figsize=[22,8])
    plt.title('Rot. Speed vs Torque wrt Failure Type')
    sns.scatterplot(data=df1, x='Rotational speed', y='Torque', hue='Failure Type', palette=['#E9C0CB', '#39A692', '#976EBD', '#ACBF5C', '#DF8B4E'], ax=ax[0])
    sns.scatterplot(data=df1[df1['Target'] == 1], x='Rotational speed', y='Torque', hue='Failure Type', palette=['#39A692', '#976EBD', '#ACBF5C', '#DF8B4E'], ax=ax[1])

    ax[0].set_title('Including class no failure')
    ax[1].set_title('Excluding class no failure')

    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()



    print('----- SKEWNESS ------------')
    fig, axes = plt.subplots(2, 5, figsize=[25,10])
    j = 0
    colors = ['#E1728F', '#409E7D']

    for i in ['Air temperature', 'Process temperature', 'Rotational speed', 'Torque', 'Tool wear']:
        sns.histplot(data=df1, x=i, kde=True, ax=axes[0,j], hue='Target', palette=colors, legend=False)
        sns.boxplot(data=df1, x=i, ax=axes[1,j])
        j += 1
        print('{} skewness = {}'.format(i, round(df1[i].skew(), 2)))
    print('---------------------------')

    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    # Function to calculate the maximum and minumum value from the boxplot
    def maximum_box(x):
        Q1 = x.quantile(0.25)
        Q3 = x.quantile(0.75)
        IQR = Q3 - Q1
        maximum = Q3 + 1.5*IQR
        minimum = Q1 - 1.5*IQR
        return maximum, minimum

    for i in ['L', 'M', 'H']:
        df_product_type = df1[df1['Type'] == i]
        max_rotational_speed, min_rotational_speed = maximum_box(df_product_type['Rotational speed'])
        max_torque, min_torque = maximum_box(df_product_type['Torque'])
        print('Values from boxplot for type product ' + i + ':')
        print(f'Maximum torque value: {round(max_torque,2)}')
        print(f'Minimum torque value: {round(min_torque,2)}')
        print(f'Maximum rotational speed value: {round(max_rotational_speed,2)}')
        print(f'Minimum rotational speed value: {round(min_rotational_speed,2)}')
        print('='*20)

        max_rotational_speed, min_rotational_speed = maximum_box(df1['Rotational speed'])

    max_torque, min_torque = maximum_box(df1['Torque'])

    max_torque_values = df1[df1['Torque'] >= max_torque]['Type'].value_counts()  # Torque values above the boxplot maximum
    min_torque_values = df1[df1['Torque'] <= min_torque]['Type'].value_counts()  # Torque values below the boxplot minimum
    max_rotational_speed_values = df1[df1['Rotational speed'] >= max_rotational_speed]['Type'].value_counts()  # Rotational spede values above the boxplot maximum



    total_max_min_values = max_torque_values.sum() + min_torque_values.sum() + max_rotational_speed_values.sum()  # Total of instance under and above the minimum and maximum threshold from the boxplot, respectively.
    ratio = total_max_min_values/df.shape[0]  # Percetange of these values with respect to the entire dataset
    print('Percentage of values under and above the minimum and maximum threshold from the boxplot: {}'.format(ratio))

    output_json_path = './json/data6.json'
    # Convert NumPy float64 to Python float
    ratio_as_python_float = float(ratio)

    # Serialize to JSON
    json_data = json.dumps({'ratio': ratio_as_python_float})

    # Save to a file
    with open(output_json_path, 'w') as json_file:
        json_file.write(json_data)

    # Portion of df where there is a failure and causes percentage
    idx_fail = df1.loc[df['Failure Type'] != 'No Failure'].index
    df_fail = df.loc[idx_fail]
    df_fail_percentage = 100*df_fail['Failure Type'].value_counts()/df_fail['Failure Type'].shape[0]
    print('Failures percentage in data:',
        round(100*df1['Target'].sum()/n,2))
    # Pie plot
    plt.title('Causes involved in Machine failures')
    plt.pie(x=df_fail_percentage.array, labels=df_fail_percentage.index.array,
            colors=sns.color_palette('tab10')[0:4], autopct='%.0f%%')
    #plt.show()
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    from sklearn.model_selection import train_test_split
    from imblearn.over_sampling import SMOTENC
    # n_working must represent 80% of the desired length of resampled dataframe
    n_working = df1['Failure Type'].value_counts()['No Failure']
    desired_length = round(n_working/0.8)
    spc = round((desired_length-n_working)/4)  #samples per class
    # Resampling
    balance_cause = {'No Failure':n_working,
                    'Overstrain Failure':spc,
                    'Heat Dissipation Failure':spc,
                    'Power Failure':spc,
                    'Tool Wear Failure':spc}
    sm = SMOTENC(categorical_features=[0,7], sampling_strategy=balance_cause, random_state=0)
    df_res, y_res = sm.fit_resample(df1, df1['Failure Type'])

    # Portion of df_res where there is a failure and causes percentage
    idx_fail_res = df_res.loc[df_res['Failure Type'] != 'No Failure'].index
    df_res_fail = df_res.loc[idx_fail_res]
    fail_res_percentage = 100*df_res_fail['Failure Type'].value_counts()/df_res_fail.shape[0]

    # Percentages
    print('Percentage increment of observations after oversampling:',
        round((df_res.shape[0]-df1.shape[0])*100/df1.shape[0],2))
    print('SMOTE Resampled Failures percentage:',
        round(df_res_fail.shape[0]*100/df_res.shape[0],2))

    # Pie plot
    fig, axs = plt.subplots(ncols=2, figsize=(12,4))
    fig.suptitle('Causes involved in Machine failures')
    axs[0].pie(x=df_fail_percentage.array, labels=df_fail_percentage.index.array,
            colors=sns.color_palette('tab10')[0:4], autopct='%.0f%%')
    axs[1].pie(x=fail_res_percentage.array, labels=fail_res_percentage.index.array,
            colors=sns.color_palette('tab10')[0:4], autopct='%.0f%%')
    axs[0].title.set_text('Original')
    axs[1].title.set_text('After Resampling')
    #plt.show()
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    # # Kdeplot of numeric features (After resampling) - hue=Type
    # fig, axs = plt.subplots(nrows=2, ncols=3, figsize=(19,7))
    # fig.suptitle('Features distribution (After resampling)')
    # custom_palette = {'L':'tab:blue', 'M':'tab:orange', 'H':'tab:green'}
    # for j, feature in enumerate(num_features):
    #     sns.kdeplot(ax=axs[j//3, j-3*(j//3)], data=df_res, x=feature,
    #               hue='Type', fill=True, palette=custom_palette)
    # plt.show()




    import matplotlib.pyplot as plt
    import seaborn as sns

    # Assuming df_res is your DataFrame and you want to extract numeric columns as num_features
    num_features = df_res.select_dtypes(include=['int64', 'float64']).columns

    # Plotting KDE plots for numeric features with 'Type' as hue
    fig, axs = plt.subplots(nrows=2, ncols=3, figsize=(19,7))
    fig.suptitle('Features distribution (After resampling)')
    custom_palette = {'L':'tab:blue', 'M':'tab:orange', 'H':'tab:green'}

    for j, feature in enumerate(num_features):
        sns.kdeplot(ax=axs[j//3, j-3*(j//3)], data=df_res, x=feature,
                    hue='Type', fill=True, palette=custom_palette)

    #plt.show()
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    # Kdeplot of numeric features (Original)
    fig, axs = plt.subplots(nrows=2, ncols=3, figsize=(18,7))
    fig.suptitle('Original Features distribution')
    enumerate_features = enumerate(num_features)
    for j, feature in enumerate_features:
        sns.kdeplot(ax=axs[j//3, j-3*(j//3)], data=df1, x=feature,
                    hue='Target', fill=True, palette='tab10')
    plt.show()
    # Kdeplot of numeric features (After resampling)
    fig, axs = plt.subplots(nrows=2, ncols=3, figsize=(18,7))
    fig.suptitle('Features distribution after oversampling')
    enumerate_features = enumerate(num_features)
    for j, feature in enumerate_features:
        sns.kdeplot(ax=axs[j//3, j-3*(j//3)], data=df_res, x=feature,
                    hue=df_res['Target'], fill=True, palette='tab10')
    
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    # Kdeplot of numeric features (After resampling) - Diving deeper
    fig, axs = plt.subplots(nrows=2, ncols=3, figsize=(18,7))
    fig.suptitle('Features distribution after oversampling - Diving deeper')
    enumerate_features = enumerate(num_features)
    for j, feature in enumerate_features:
        sns.kdeplot(ax=axs[j//3, j-3*(j//3)], data=df_res, x=feature,
                    hue=df_res['Failure Type'], fill=True, palette='tab10')

    # Before preprocessing
    print("Before Preprocessing:")
    #print(df_res.head())

    from sklearn.preprocessing import StandardScaler
    from sklearn.decomposition import PCA

    sc = StandardScaler()
    type_dict = {'L': 0, 'M': 1, 'H': 2}
    cause_dict = {'No Failure': 0,
                'Power Failure': 1,
                'Overstrain Failure': 2,
                'Heat Dissipation Failure': 3,
                'Tool Wear Failure': 4}
    df_pre = df_res.copy()
    # Encoding
    df_pre['Type'].replace(to_replace=type_dict, inplace=True)
    df_pre['Failure Type'].replace(to_replace=cause_dict, inplace=True)
    # Scaling
    df_pre[num_features] = sc.fit_transform(df_pre[num_features])

    # after preprocessing
    print("after Preprocessing:")
    # print(df_pre.head()) # Print the first few rows of the original dataset
    pre_table = df_pre.head(5)

    output_json_path = f'./json/data5.json'
    pre_table.to_json(output_json_path, orient='records', lines=False)

    pca = PCA(n_components=len(num_features))
    X_pca = pd.DataFrame(data=pca.fit_transform(df_pre[num_features]), columns=['PC'+str(i+1) for i in range(len(num_features))])
    var_exp = pd.Series(data=100*pca.explained_variance_ratio_, index=['PC'+str(i+1) for i in range(len(num_features))])
    # print('Explained variance ratio per component:', round(var_exp,2), sep='\n')
    # print('Explained variance ratio with 3 components: '+str(round(var_exp.values[:3].sum(),2)))

    # PCA for Data visualization
    pca3 = PCA(n_components=3)
    X_pca3 = pd.DataFrame(data=pca3.fit_transform(df_pre[num_features]), columns=['PC1','PC2','PC3'])

    # Loadings Analysis
    fig, axs = plt.subplots(ncols=3, figsize=(18,4))
    fig.suptitle('Loadings magnitude')
    pca_loadings = pd.DataFrame(data=pca3.components_, columns=num_features)
    for j in range(3):
        ax = axs[j]
        sns.barplot(ax=ax, x=pca_loadings.columns, y=pca_loadings.values[j])
        ax.tick_params(axis='x', rotation=90)
        ax.title.set_text('PC'+str(j+1))
    
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    X_pca3.rename(mapper={'PC1':'Temperature',
                      'PC2':'Power',
                      'PC3':'Tool Wear'}, axis=1, inplace=True)

    # PCA plot
    color = []
    col = df_pre['Failure Type'].map({0:'tab:blue',1:'tab:orange',2:'tab:green',3:'tab:red',4:'tab:purple'})
    color.append(col)
    idx_w = col[col == 'tab:blue'].index
    color.append(col.drop(idx_w))
    colors = ['tab:blue','tab:orange','tab:green','tab:red','tab:purple']
    labelTups = [('No Failure','tab:blue'),
                ('Power Failure', 'tab:orange'),
                ('Overstrain Failure','tab:green'),
                ('Heat Dissipation Failure', 'tab:red'),
                ('Tool Wear Failure','tab:purple')]

    fig = plt.figure(figsize=(18,6))
    fig.suptitle('Data in 3D PCA space')
    full_idx = X_pca3.index

    for j, idx in enumerate([full_idx,idx_fail_res]):
        ax = fig.add_subplot(1, 2, j+1, projection='3d')

        lg = ax.scatter(X_pca3.loc[idx,'Temperature'],
                        X_pca3.loc[idx,'Power'],
                        X_pca3.loc[idx,'Tool Wear'],
                        c=color[j])
        ax.set_xlabel('$Temperature$')
        ax.set_ylabel('$Power$')
        ax.set_zlabel('$Tool Wear$')
        ax.title.set_text('With'+str(j*'out')+' "No Failure" class')
        ax.view_init(35, -10)
        custom_lines = [plt.Line2D([],[], ls="", marker='.',
                                mec='k', mfc=c, mew=.1, ms=20) for c in colors[j:]]
        ax.legend(custom_lines, [lt[0] for lt in labelTups[j:]],
                loc='center left', bbox_to_anchor=(1.0, .5))

    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()

    # Correlation Heatmap
    plt.figure(figsize=(7,4))
    sns.heatmap(data=df_pre.corr(), mask=np.triu(df_pre.corr()), annot=True, cmap='BrBG')
    plt.title('Correlation Heatmap')
    fig_path = "./figures/fig" + str(fig_number) + ".png"
    plt.savefig(fig_path)
    fig_number += 1
    plt.close()