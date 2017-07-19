import csv

from matplotlib.mlab import PCA
from numpy import genfromtxt


test = genfromtxt('pca/initial-data.csv',
                    dtype=None,
                    delimiter=',',
                    skip_header=1,
                    usecols=(4,5,6,7,8,9,10,11,12,13,16,18)
                )

pca = PCA(test)

for i in range(0,len(test)):
    print("%f , %f" % (pca.Y[i][0], pca.Y[i][1]))
