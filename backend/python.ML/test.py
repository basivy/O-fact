import joblib
import pandas as pd
import collections, numpy as np
from sklearn.preprocessing import LabelEncoder
from collections import Counter
import statistics
import string
import math

lr = joblib.load('model.joblib')
data = pd.read_csv("/home/pi/Desktop/EnoseV2/test/test.csv")
print(data.shape[1]) 
d1 = data.shape[1] - 1
X1 = data.iloc[:,:11].values
pre = lr.predict(X1)
encoder =  LabelEncoder()
y1 = encoder.fit_transform(pre)
c = Counter(pre)
c1 = Counter(pre).most_common()
my_array = np.array(c1)
S = my_array[:,1]
S1 = list(map(int, S))
Neam = my_array[:,0]
cum = np.shape(S1)
cumreal = cum[0]
for i in range(cumreal):
    print(Neam[i],  math.trunc(S1[i]/sum(S1)*100),'%')

