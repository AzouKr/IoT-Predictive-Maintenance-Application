import pandas as pd

import json

def save_metrics_to_json(metrics_val, metrics_test, filename="metrics.json"):
  with open(filename, 'w') as f:
    # Combine metrics from both validation and test sets into a single dictionary
    combined_metrics = {
        "validation": metrics_val,
        "test": metrics_test
    }
    json.dump(combined_metrics, f, indent=4)  # Add indentation for readability

validation_scores = pd.DataFrame({
    'KNN': [0.956, 0.956, 0.957, 0.957],
    'SVC': [0.968, 0.993, 0.969, 0.968],
    'RFC': [0.975, 0.998, 0.975, 0.975],
    'XGB': [0.981, 0.999, 0.981, 0.981]
}, index=['ACC', 'AUC', 'F1', 'F2'])


validation_scores.to_json("validation_scores.json")

