# -*- coding: utf-8 -*-
"""
Created on Mon Nov  7 08:37:13 2022

@author: ohadz
"""

# Connect to Element84 satellite data on AWS
# guide: https://carpentries-incubator.github.io/geospatial-python/05-access-data/
from pystac_client import Client
from shapely.geometry import Point
import rioxarray
import xarray 
from matplotlib import figure
import matplotlib.pyplot as plt
import numpy as np
import os
from pathlib import Path
from math import pi
from numpy import cos, sin
import pyproj

def plot_image(datatoplot,nameofdata):
    fig=figure.Figure( figsize=(15, 10))
    axis = fig.subplots(
        ncols=1, nrows=1, subplot_kw={"xticks": [], "yticks": [], "frame_on": False},squeeze =False
    )

    ax=axis[0,0]
    ax.imshow(datatoplot) 
    fig.savefig(os.path.join(plot_folder,nameofdata+'.png'),dpi=600,bbox_inches = 'tight')
    return fig


plot_folder='plots'
Path(plot_folder).mkdir(parents=True, exist_ok=True)

api_url = "https://earth-search.aws.element84.com/v0"

client = Client.open(api_url)

collection = "sentinel-s2-l2a-cogs"  # Sentinel-2, Level 2A, COGs

# point = Point(4.89, 52.37)  # original point from tutorial, sweden
# point = Point(34.826, 31.914)  # near Netzer Sereni
point = Point(17.214151,40.492683)  # 

bbox = point.buffer(0.001).bounds
polygondf=0.01

# the polygon for the cutoff only works if the bottom part is bigger then the upper part. 
# this is because we are in the northern hemisphere :)

polygon_coords_deg=[[point.coords[0][0]-polygondf, point.coords[0][1]+polygondf*1.1],
                    [point.coords[0][0]+polygondf*1.1, point.coords[0][1]+polygondf],
                    [point.coords[0][0]+polygondf, point.coords[0][1]-polygondf*1.1],
                    [point.coords[0][0]-polygondf*1.1, point.coords[0][1]-polygondf]]
    


search = client.search(
    collections=[collection],
    bbox=bbox,
    datetime="2021-12-31/2022-12-31",
    query=["eo:cloud_cover<10"]
)
 

print(search.matched())
items = search.get_all_items()

for item in items:
    print(item)
    print(item.datetime)
    print(item.geometry)
    print(item.properties)

assets = items[0].assets  # first item's asset dictionary
print(assets.keys())

for key, asset in assets.items():
    print(f"{key}: {asset.title}")

print(assets["thumbnail"].href)
RGB_href=[assets["B04"].href,assets["B03"].href,assets["B02"].href]
RGB=[rioxarray.open_rasterio(single_href) for single_href in RGB_href] # open the raster for each band in the href 
# b01_href = assets["B01"].href
# b01 = rioxarray.open_rasterio(b01_href) # this is the Xarray we need.
# print(b01)

# RGB[0].coords['x'].values
RGB_norm=[x.values[0]/np.amax(x.values[0]) for x in RGB]
# RGB_norm=[x.values[0] for x in RGB]
rgb_plot=np.dstack(RGB_norm)

# # ploting without any memory leaks for python (spyder)
fig1=plot_image(rgb_plot*3.5,'RGB_test') # times 3.5 to increase image brightness

# the "field" cooridantes 
# polygon_coords_deg=[[34.84438962232621, 32.023623293760565],
# [34.9291950080731,32.02305946378322],
# [34.92292837796022,31.97691585006503],
# [34.84297133733332,31.983593991372558 ]]

p=pyproj.Proj(proj='utm', zone=36, ellps='WGS84')

polygon_coords_utm=[[p(x[0],x[1])[0],p(x[0],x[1])[1]] for x in polygon_coords_deg]

coords_x=RGB[0].coords['x'].values
coords_y=RGB[0].coords['y'].values
# polygon_coords_utm_index=[tunnel_fast(coords_x,coords_y,coord[0],coord[1]) for coord in polygon_coords_utm]
idx = [min([(np.abs(coords_x - x[0])).argmin() for x in polygon_coords_utm]),max([(np.abs(coords_x - x[0])).argmin() for x in polygon_coords_utm])]
idy = [min([(np.abs(coords_y - x[1])).argmin() for x in polygon_coords_utm]),max([(np.abs(coords_y - x[1])).argmin() for x in polygon_coords_utm])]

RGB_norm_small=[x.values[0][idy[0]:idy[1],idx[0]:idx[1]]/np.amax(x.values[0][idy[0]:idy[1],idx[0]:idx[1]]) for x in RGB]
# RGB_norm=[x.values[0] for x in RGB]
rgb_plot_small=np.dstack(RGB_norm_small)

# # ploting without any memory leaks for python (spyder)
fig2=plot_image(rgb_plot_small*2.5,'RGB_test_small') # times 3.5 to increase image brightness

