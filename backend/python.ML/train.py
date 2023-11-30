import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from joblib import dump
from sklearn import svm
from sklearn.model_selection import train_test_split

df = pd.read_csv('D:/last/backend/csv/A.csv')
D = df.shape[1] - 1
X = df.iloc[:,:11].values
y = df.iloc[:,D:]
Y= np.squeeze(y)
x_train,x_test,y_train, y_test = train_test_split( X, Y, test_size=0.3 , random_state=0)
clf = svm.SVC(kernel='rbf', C=100000).fit(x_train, y_train)
print("\n accuracy ", clf.score(x_test, y_test)*100 ,"% \n")
dump(clf,'model.joblib')

