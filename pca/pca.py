import csv
import numpy as np
from matplotlib.mlab import PCA
from numpy import genfromtxt
from collections import OrderedDict

# Choose columns to be used in PCA:
COLUMNS = OrderedDict([
    ('total', 4),
    ('given', 5),
    ('yellow', 6),
    ('purple', 7),
    ('orange', 8),
    ('blue', 9),
    ('green', 10),
    ('abstractions', 11),
    ('ifs', 12),
    ('ifelse', 13),
    ('loops', 14),
    ('lists', 15),
    ('proc', 16),
    ('proc_params', 17),
    ('variables', 18),
    ('complex', 19)
])

data = genfromtxt('pca/2017.csv',
                    dtype=None,
                    delimiter=',',
                    skip_header=1,
                    usecols=COLUMNS.values()
                )

pca = PCA(data)

for i in range(0,len(data)):
    print("%f , %f" % (pca.Y[i][0], pca.Y[i][1]))
