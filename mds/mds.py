import csv
from numpy import genfromtxt
from collections import OrderedDict
from sklearn import manifold
from sklearn.metrics import euclidean_distances

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
    ('variables', 18)
])

data = genfromtxt('pca/2017.csv',
                    dtype=None,
                    delimiter=',',
                    skip_header=1,
                    usecols=COLUMNS.values()
                )

similarities = euclidean_distances(data)

mds = manifold.MDS(n_components=2, max_iter=3000, eps=1e-9,
      random_state=3, dissimilarity="precomputed", n_jobs=1)

pos = mds.fit(similarities).embedding_


for i in range(0,len(pos)):
    print("%f , %f" % (pos[i][0], pos[i][1]))
