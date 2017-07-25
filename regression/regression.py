import matplotlib.pyplot as plt
import numpy as np
from sklearn import datasets, linear_model, metrics
from sklearn.model_selection import train_test_split
from collections import OrderedDict
import random

TEST_SIZE = 0.2   # 0.2 (20%) recommended

# Choose columns to be used in training and testing:
COLUMNS = OrderedDict([
    ('total', 4),
    #('given', 5),
    #('gold', 6),
    #('purple', 7),
    #('orange', 8),
    #('blue', 9),
    #('green', 10),
    ('abstractions', 11),
    #('ifs', 12),
    #('ifelse', 13),
    #('loops', 14),
    #('lists', 15),
    ('proc', 16),
    #('proc_params', 17),
    #('variables', 18)
])

# Load the dataset.
# -> X is a feature matrix that contains vector representations of questions,
#       only parameters specified in columns above will be loaded
# -> y contains the dependent variables, i.e. complexities
X = np.genfromtxt('./pca/2017.csv',
                    dtype=(int, float),
                    delimiter=',',
                    skip_header=1,
                    usecols=COLUMNS.values()
                )

y = np.genfromtxt('./pca/2017.csv',
                    dtype=float,
                    delimiter=',',
                    skip_header=1,
                    usecols=(3) # complexity is stored in the third column
                )


# Split X and y into training and testing sets.
# -> test_size parameter is a real value from 0 (0%) to 1 (100%, no data goes to train set):
#       Since we're using a different dataset for testing, let's do test_size = 0
random.seed()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=TEST_SIZE, random_state=random.randint(1,100))

print(len(y_test))
# In case X consists of one column, turn column into row (~transpose)
if len(COLUMNS) == 1:
    X_train = X_train.reshape(len(X_train), 1)
    X_test = X_test.reshape(len(X_test), 1)

# Create linear regression object
model = linear_model.LinearRegression(
    fit_intercept=False, # centers data
    normalize=False
)

# Train the model using the training sets
model.fit(X_train, y_train)


# Regression coefficients
print('~~~ COEFFICIENTS ~~~')
i = 0
zzz=''
for col in COLUMNS:
    zzz = zzz + '{:.2f}\t'.format(model.coef_[i])
    #print('{} = {:.2f}'.format(col, model.coef_[i]))
    i += 1

print(zzz)

# Variance score: 1 means perfect prediction
print('\n\nTraining set variance score: {}'.format(model.score(X_train, y_train)))


##### TESTING STARTS HERE #####

# Since we are using a different dataset to test, let's load it:
"""
X_test = np.genfromtxt('./pca/ram.csv',
                    dtype=(float, int),
                    delimiter=',',
                    skip_header=1,
                    usecols=COLUMNS.values()
                )

y_test = np.genfromtxt('./pca/ram.csv',
                    dtype=float,
                    delimiter=',',
                    skip_header=1,
                    usecols=(3) # again, complexities are stored in the 3rd column
                )

"""
print('\n\n~~~ PREDICTED , ACTUAL ~~~')
for i in range(0, len(X_test)):
    sample = X_test[i].reshape(1, -1) # apparently (1, -1) is the size of a single sample
    prediction = model.predict(sample)[0]
    print('{:.2f} , {}'.format(prediction, y_test[i]))
