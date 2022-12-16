# -*- coding: utf-8 -*-
"""
@author: ohadz
"""

# Connect to Element84 satellite data on AWS
# guide: https://carpentries-incubator.github.io/geospatial-python/05-access-data/

from pystac_client import Client # satellite catalogue: https://stacspec.org/en
from shapely.geometry import Point # a bit about shapes: https://www.learndatasci.com/tutorials/geospatial-data-python-geopandas-shapely/
import rioxarray # raster array library. there are more. need GDAL as prerequisite. https://pypi.org/project/GDAL/
from matplotlib import figure
import numpy as np
import os
from pathlib import Path
import pyproj # earth projections library: https://pyproj4.github.io/pyproj/stable/
import dill # similar to pickle, more options and serializations 
import datetime
from shapely.ops import transform
import geopandas as gpd
import fiona
from shapely import wkt
import matplotlib.pyplot as plt

# plot a satellite image without axis
def plot_image(datatoplot,nameofdata,x_field,y_field):
    fig=figure.Figure( figsize=(15, 10))
    axis = fig.subplots(
        ncols=1, nrows=1, subplot_kw={"xticks": [], "yticks": [], "frame_on": False},squeeze =False
    )

    ax=axis[0,0]
    ax.imshow(datatoplot) 
    fig.savefig(os.path.join(plot_folder,nameofdata+'.png'),dpi=300,bbox_inches = 'tight')
    return fig

# plot a satellite index image without axis and with colorbar
def plot_index(datatoplot,nameofdata,x_field,y_field):
    fig=figure.Figure( figsize=(15, 10))
    axis = fig.subplots(
        ncols=1, nrows=1, subplot_kw={"xticks": [], "yticks": [], "frame_on": False},squeeze =False
    )

    ax=axis[0,0]
    im=ax.imshow(datatoplot,cmap='RdYlGn',vmin=-1, vmax=1) # plots
    cax = fig.add_axes([ax.get_position().x1+0.01,ax.get_position().y0,0.02,ax.get_position().height]) # scale the colorbar
    cbar=fig.colorbar(im,cax=cax, shrink=0.95) # plot the scaled colorbar
    cbar.set_label(nameofdata[0:nameofdata.index('_')]+' [-]', rotation=270) # add label to the colorbar

    fig.savefig(os.path.join(plot_folder,nameofdata+'.png'),dpi=300,bbox_inches = 'tight')
    
    return fig

# calculate the satellite indices to plot. one or more. 
def satellite_index(data,bandlist,itemdate,**kwargs):
    # currently, default "index" is RGB
    if 'fieldpolygon_utm' in kwargs:
        x_field,y_field=kwargs['fieldpolygon_utm'].exterior.xy
    else:
        x_field,y_field=(np.nan,),(np.nan,)
    if 'index_list' in kwargs: # we can add as many indices as we want.
        if 'RGB' in kwargs['index_list']:
            # RGB = Red, Green, Blue. in that order.
            
            RGB_data=[data[bandlist.index('B04')].astype(float, order='C'),data[bandlist.index('B03')].astype(float, order='C'),data[bandlist.index('B02')].astype(float, order='C')]
            RGB_norm_small=[x.values/np.amax(x.values) for x in RGB_data] # send to function instead
            RGB_plot_small=np.dstack(RGB_norm_small)
            plot_image(RGB_plot_small*2.5,'RGB_small_'+itemdate,x_field,y_field)  # times 3.5 to increase image brightness
            
        if 'NDVI' in kwargs['index_list']:
            
            # ndvi = (NIR - RED) / (NIR + RED)
            band08=data[bandlist.index('B08')].values.astype(float, order='C')
            band04=data[bandlist.index('B04')].values.astype(float, order='C')
            NDVI_data=(band08-band04) / (band08+band04)
            plot_index(NDVI_data,'NDVI_small_'+itemdate,x_field,y_field) 
    else:
        RGB_data=[data[bandlist.index('B04')],data[bandlist.index('B03')],data[bandlist.index('B02')]]
        RGB_norm_small=[x.values/np.amax(x.values) for x in RGB_data] # send to function instead
        RGB_plot_small=np.dstack(RGB_norm_small)
        plot_image(RGB_plot_small*2.5,'RGB_small_'+itemdate,x_field,y_field) # times 3.5 to increase image brightness


    # for now it's not returing anything. only plotting the images. easy to add a return of wanted indices
    # either mean values or
    return 

time_start=datetime.datetime.now()


api_url = "https://earth-search.aws.element84.com/v0" # this is the stac location on amazon. 

client = Client.open(api_url)

collection = "sentinel-s2-l2a-cogs"  # Sentinel-2, Level 2A, COGs

# point = Point(4.89, 52.37)  # original point from tutorial, sweden
# point = Point(34.826, 31.914)  # near Netzer Sereni
# point = Point(34.52770841, 31.30868833)  # near Urim. watermelons
kmlfilename='TestField1_poligon.kml'
fiona.supported_drivers['KML'] = 'rw'

gpd.io.file.fiona.drvsupport.supported_drivers['KML'] = 'rw'
df = gpd.read_file(kmlfilename, driver='KML')
fieldpolygon=df.geometry[0]

point=wkt.loads(fieldpolygon.centroid.wkt) # for some reason, the polygon is fliped with lat long. not sure why
# point=wkt.loads(transform(flip, fieldpolygon).centroid.wkt)
# fieldpolygon=wkt.loads(transform(flip, fieldpolygon).wkt) # this corrects the polygon for the right order as well
point = Point( 40.492683, 17.214151)  # 


# # the "field" coordinates. right now it's BGU airport :) 
# # this should be an external input, for now it's here
# polygon_coords_deg=[[34.84438962232621, 32.023623293760565],
# [34.9291950080731,32.02305946378322],
# [34.92292837796022,31.97691585006503],
# [34.84297133733332,31.983593991372558 ]]

# polygondf=0.1
# polygon_coords_deg=[[34.52770841-polygondf, 31.30868833+polygondf],
# [34.52770841+polygondf,31.30868833+polygondf],
# [34.52770841+polygondf,31.30868833-polygondf],
# [34.52770841-polygondf,31.30868833-polygondf ]]

polygondf=0.01

# the polygon for the cutoff only works if the bottom part is bigger then the upper part. 
# this is because we are in the northern hemisphere :)

polygon_coords_deg=[[point.coords[0][0]-polygondf, point.coords[0][1]+polygondf*1.1],
                    [point.coords[0][0]+polygondf*1.1, point.coords[0][1]+polygondf],
                    [point.coords[0][0]+polygondf, point.coords[0][1]-polygondf*1.1],
                    [point.coords[0][0]-polygondf*1.1, point.coords[0][1]-polygondf]]
    
# polygon_coords_deg=[[point.coords[0][1]+polygondf*1.1,point.coords[0][0]-polygondf],
#                     [ point.coords[0][1]+polygondf,point.coords[0][0]+polygondf*1.1],
#                     [ point.coords[0][1]-polygondf*1.1,point.coords[0][0]+polygondf],
#                     [ point.coords[0][1]-polygondf,point.coords[0][0]-polygondf*1.1]]
                
                     
# polygon_coords_deg=[[34.51, 31.32],
# [34.545,31.319],
# [34.542,31.29],
# [34.509,31.292 ]]

# the filename need some more work. it will probably be easier with a database? 
# should include field coordianates, dates relevant (from to?),
filename_dill='coords_x_'+str(point.x)+'_y_'+str(point.y)+'.dill'
plot_folder='plots_'+'coords_x_'+str(point.x)+'_y_'+str(point.y)
dill_folder='dills'
Path(plot_folder).mkdir(parents=True, exist_ok=True)
Path(dill_folder).mkdir(parents=True, exist_ok=True)

dataset_small={}

# this is not working well at the moment
# if os.path.exists(os.path.join(dill_folder,filename_dill)): # loads an exisiting satellite image, if exists
#     dataset_small=dill.load(open(os.path.join(dill_folder,filename_dill),'rb'))


bbox = point.buffer(0.01).bounds # the catalogue need a bounding box to retieve data


# search function. has many more options, for now this is enough. search for the entire year of 2022
search = client.search(
    collections=[collection],
    bbox=bbox,
    datetime="2021-12-31/2022-12-31",
    query=["eo:cloud_cover<10"]
)
 

print(search.matched())
items = search.get_all_items()

if dataset_small:
    # need to add a check for the dates. something for tomorrow. add year to the dill, and don't chcek for dates?
    for filedate in list(dataset_small):
        satellite_index(dataset_small[filedate],filedate,index_list=['RGB'])

        # fig2=plot_image(rgb_plot_small[filedate]*2.5,'RGB_test_small_'+filedate) # times 3.5 to increase image brightness
        print('\n done with '+filedate+' time elapsed: '+str((datetime.datetime.now()-time_start).total_seconds())+' seconds')
else:

    print('\n Starting satellite data acquisiton. time elapsed: '+str((datetime.datetime.now()-time_start).total_seconds())+' seconds')
    for item in  items:
        # print(item)
        # print(item.datetime)
        # print(item.geometry)
        # print(item.properties)
    
        assets = item.assets  
        
        # get satellite bands. there are several, in sentinel 2, all the visual bands start with B.
        bandlist=[d for d, s in zip(list(assets), [('B' in x) for x in list(assets)]) if s]
        dataset_href=[assets[x].href for x in bandlist]
        dataset=[rioxarray.open_rasterio(single_href) for single_href in dataset_href] # open the raster for each band in the href 
        
        # transform from lot/lan to the correct UTM. each image might be saved in a different coordiante system. depend onthe location.
        satellite_projection=pyproj.Proj(proj='utm', zone=int(item.id[4:6]), ellps='WGS84')
        polygon_coords_utm=[[satellite_projection(x[0],x[1])[0],satellite_projection(x[0],x[1])[1]] for x in polygon_coords_deg] 
        
        # item cooridnates 
        coords_x=dataset[0].coords['x'].values
        coords_y=dataset[0].coords['y'].values
        dataset_small[item.datetime.strftime("%Y_%m_%d")]=\
            [x[0].rio.clip_box(minx=min(polygon_coords_utm)[0], miny=min(polygon_coords_utm)[1], 
                                maxx=max(polygon_coords_utm)[0], maxy=max(polygon_coords_utm)[1]) for x in dataset]
        
        field_projection = pyproj.Transformer.from_crs('EPSG:4326', 'utm'+item.id[4:6], always_xy=True).transform
        utm_field = transform(field_projection, fieldpolygon)
        
        
        
        # send for the index function. must send a dataset of all bands, a date string, in the future field ID? 
        # when no index is choosen, it plots and saves only RGB.
        satellite_index( dataset_small[item.datetime.strftime("%Y_%m_%d")],bandlist,item.datetime.strftime("%Y_%m_%d"),index_list=['RGB','NDVI'], fieldpolygon_utm=utm_field)

        print('\n done with '+item.datetime.strftime("%Y_%m_%d")+' time elapsed: '+str((datetime.datetime.now()-time_start).total_seconds())+' seconds')
    
    
    # https://stackoverflow.com/questions/58193119/how-is-dill-different-from-pythons-pickle-module        
    dill.dump(dataset_small, open(os.path.join(dill_folder,filename_dill), 'wb'))

