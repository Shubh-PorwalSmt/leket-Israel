# -*- coding: utf-8 -*-
"""
Created on Sun Dec 25 08:09:22 2022

@author: ohadz
"""

import datetime
import shapefile
import geopandas as gpd
import os
from shapely.geometry import Point # a bit about shapes: https://www.learndatasci.com/tutorials/geospatial-data-python-geopandas-shapely/
from shapely import wkt

time_start=datetime.datetime.now()

# you need to download the files from google drive
field_shapefilename='AgriParcelsForDashboard.shp'
folder_shapefilename='GIS_Data'

field_shapes = shapefile.Reader(os.path.join(folder_shapefilename,field_shapefilename))

#first feature of the shapefile
field_feature = field_shapes.shapeRecords()
field_feature_iter = field_shapes.iterShapeRecords()
field_id_list = [f.record[1] for f in  field_feature_iter]
field_idx=field_id_list.index(206253)
fieldnames = [f[0] for f in field_shapes.fields[1:]]


# example for fieldname(4) and fieldID 206253
print(fieldnames[4]+': '+str(field_feature[field_id_list.index(206253)].record[fieldnames[4]]))

print('polygon points: \n' + str(field_feature[field_id_list.index(206253)].shape.points))