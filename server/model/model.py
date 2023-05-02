# Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics
from sklearn.metrics import classification_report
import pickle


# Downscaling method for BSC and MSc grades
def downscale(score):
    return score / 10 / 2


# Import and clean dataset
dataset = pd.read_csv('hirable.csv')
dataset = dataset.drop(["sl_no", "ssc_p", "ssc_b", "hsc_p", "hsc_b", "hsc_s", "specialisation", "salary", "degree_t"],
                       axis=1)

dataset = dataset.rename(columns={'degree_p': 'bsc', 'mba_p': 'msc'})
dataset['gender'] = dataset.gender.replace(['M', 'F'], [1, 2])
dataset['workex'] = dataset.workex.replace(['Yes', 'No'], [1, 0])
dataset['status'] = dataset.status.replace(['Placed', 'Not Placed'], [1, 0])

degrees = ['bsc', 'msc']

for col in degrees:
    dataset[col] = downscale(dataset[col])

# Separating into dependent and independent variables
X = dataset.drop(['status'], axis=1)
y = dataset.status

# Splitting dataset into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.8, random_state=1)

# Fitting with random forest model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Prediction and testing
y_prediction = model.predict(X_test)

# Report and Accuracy Score
print("Accuracy:", metrics.accuracy_score(y_test, y_prediction))
print("Classification Report RF:\n", classification_report(y_test, y_prediction))

# Saving model
pickle.dump(model, open('predictive-model.pkl', 'wb'))

# Load Model
loaded_model = pickle.load(open('predictive-model.pkl', 'rb'))
result = loaded_model.score(X_test, y_test)
print(result)
