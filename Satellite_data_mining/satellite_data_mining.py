import logging
import sys
import os
import boto3

import pystac_client

import rasterio as rio
from rasterio import mask
from rasterio import warp

import pandas as pd
import numpy as np

from datetime import datetime
from ast import literal_eval
import requests
import json

conn_string = 'postgresql://user:password@host/dbname'
leket_username = os.environ['LEKET_USERNAME']
leket_password = os.environ['LEKET_PASSWORD']

api = os.environ['BACKEND_API']
creds = {"username": leket_username, "password": leket_password}

scl_threshold = {'cloud_high_thresh': 0.1, 'cloud_medium_thresh': 0.2, 'other_scl_thresh': 0.5}

summary = {'satellite': {},
           'data': {
               'Date': None,
               'Length': 0,
               'Count': {
                   'With stats': 0,
                   'No stats': 0
                         },
               'SCL': {
                   'Total pixels': 0,
                   'No Data (Missing data)': 0,
                   'Saturated or defective pixel': 0,
                   'Topographic casted shadows': 0,
                   'Cloud shadows': 0,
                   'Vegetation': 0,
                   'Not-vegetated': 0,
                   'Water': 0,
                   'Unclassified': 0,
                   'Cloud medium probability': 0,
                   'Cloud high probability': 0,
                   'Thin cirrus': 0,
                   'Snow or ice': 0
               },
               'Valid': {
                   'Count': 0
               },
               'Invalid': {
                   'SCL threshold': scl_threshold,
                   'Count': {
                       'Total': 0,
                       'NDVI': 0,
                       'SCL': {
                           'Cloud high probability': 0,
                           'Cloud medium probability': 0,
                           'Thin cirrus': 0,
                           'Cloud shadows': 0,
                           'Topographic casted shadows': 0,
                           'Unclassified': 0
                       }
                   }
               }
           }}

# Create and configure logger
logging.basicConfig(filename="satellite_data_mining.log", format='%(levelname)s:%(asctime)s:%(message)s')

# Creating an object
logger = logging.getLogger()

# Setting the threshold of logger to INFO
logger.setLevel(logging.INFO)

np.seterr(divide='ignore', invalid='ignore')
satellite_dict = {'date': [], 'field_id': [], 'statistics': []}


def NDVI(nir, red):
    ndvi = (nir - red) / (nir + red)
    return {"max": np.nanmax(ndvi),
            "mean": np.nanmean(ndvi),
            "median": np.nanmedian(ndvi),
            "min": np.nanmin(ndvi),
            "std": np.nanstd(ndvi)}


def SCL(scl):
    scl_legend = {0: 'No Data (Missing data)', 1: 'Saturated or defective pixel', 2: 'Topographic casted shadows',
                  3: 'Cloud shadows', 4: 'Vegetation', 5: 'Not-vegetated', 6: 'Water', 7: 'Unclassified',
                  8: 'Cloud medium probability', 9: 'Cloud high probability', 10: 'Thin cirrus', 11: 'Snow or ice'}

    unique, counts = np.unique(scl, return_counts=True)
    scl_percent = dict()

    if bool(scl_legend.keys() & set(unique)):
        total_pixels = np.count_nonzero(scl)
        scl_percent['Total pixels'] = total_pixels
        for i, val in enumerate(set(unique)):
            if val != 0:
                scl_percent[scl_legend[val]] = counts[i] / total_pixels
        return scl_percent
    else:
        return None


def field_info(geometry, date):
    sentinel_stac_client = pystac_client.Client.open("https://earth-search.aws.element84.com/v1")
    items = sentinel_stac_client.search(
        intersects=geometry,
        datetime=date,
        collections=["sentinel-2-l2a"]).item_collection()

    for item in items.to_dict()['features']:
        print('id:', item['id'], 'eo:cloud_cover:', item['properties']['eo:cloud_cover'])
    return items


def setup(dataframe, time_range):
    print('Searching tiles for ' + time_range)

    sentinel_dict = dict()
    for sentinel_id in dataframe['sentinel_id'].unique():
        if isinstance(sentinel_id, str):
            geometry = dataframe[dataframe['sentinel_id'] == sentinel_id].tail(1)['geometry'].iloc[0]
            geometry = literal_eval(geometry.replace("\'", "\""))
            sentinel_dict[sentinel_id] = field_info(geometry, time_range)

    for key in sentinel_dict.keys():
        if len(list(sentinel_dict[key])) == 0:
            print('Missing tile for ' + key)
            logger.critical('Missing tile for ' + key)
            # exit(0)
            sentinel_dict[key] = None
            date = None
        else:
            sentinel_dict[key] = sentinel_dict[key][0]
            date = sentinel_dict[key].properties['datetime'][0:10]
            summary['satellite'][key] = sentinel_dict[key].properties

    print('Fetching tiles...')

    bands_s3 = dict()
    for key in sentinel_dict.keys():
        if sentinel_dict[key] is not None:
            bands_s3[key] = {
                'red': rio.open(sentinel_dict[key].assets['red'].href),
                'nir': rio.open(sentinel_dict[key].assets['nir'].href),
                'scl': rio.open(sentinel_dict[key].assets['scl'].href)
            }

    if len(bands_s3) == 0:
        print('No tiles for ' + time_range)
        logger.critical('No tiles for ' + time_range)
        exit(0)
    else:
        print('Done!')

    summary['data']['Date'] = date
    summary['data']['Length'] = len(dataframe)
    return bands_s3, date


def filter_stats(stats):

    filtered = False
    for key in stats['SCL'].keys():
        if key == 'Cloud high probability':
            if stats['SCL'][key] > scl_threshold['cloud_high_thresh']:
                filtered = True
                summary['data']['Invalid']['Count']['SCL'][key] += 1

        if key == 'Cloud medium probability':
            if stats['SCL'][key] > scl_threshold['cloud_medium_thresh']:
                filtered = True
                summary['data']['Invalid']['Count']['SCL'][key] += 1

        if key in ['Topographic casted shadows', 'Cloud shadows', 'Thin cirrus', 'Unclassified']:
            if stats['SCL'][key] > scl_threshold['other_scl_thresh']:
                filtered = True
                summary['data']['Invalid']['Count']['SCL'][key] += 1

    return filtered, stats


def insert_data(index, length, date, field_id, stats, warning=''):
    print("Field number " + str(index + 1) + "/" + str(length) + " " + date + " id: " + str(int(field_id)))
    if stats is None:
        print(warning)
        logger.warning(warning + ' Field ID: ' + str(field_id))
        summary['data']['Count']['No stats'] += 1
    else:
        # print(stats)

        if stats['NDVI'] is not None:
            satellite_dict['date'].append(date)
            satellite_dict['field_id'].append(int(field_id))
            satellite_dict['statistics'].append(json.dumps(stats))
            summary['data']['Valid']['Count'] += 1
        else:
            summary['data']['Invalid']['Count']['Total'] += 1


def satellite(dataframe, bands_s3):
    date = 'Not available'
    for index, row in dataframe.iterrows():
        field_id, geometry, sentinel_id = row['field_id'], row['geometry'], row['sentinel_id']
        if sentinel_id in bands_s3.keys():
            date = summary['satellite'][sentinel_id]['created']
            try:
                geometry = literal_eval(geometry.replace("\'", "\""))
                sentinel_bands = bands_s3[sentinel_id]

                scl_roi_polygon = warp.transform_geom({'init': 'epsg:4326'}, sentinel_bands['scl'].crs, geometry)
                scl, out_transform = mask.mask(sentinel_bands['scl'], [scl_roi_polygon], crop=True)

                stats = {'NDVI': None, 'SCL': SCL(scl[0])}
                for key in stats['SCL'].keys():
                    summary['data']['SCL'][key] += stats['SCL'][key]

                filtered, stats = filter_stats(stats)

                if not filtered:
                    red_roi_polygon = warp.transform_geom({'init': 'epsg:4326'}, sentinel_bands['red'].crs, geometry)
                    red, out_transform = mask.mask(sentinel_bands['red'], [red_roi_polygon], crop=True)

                    nir_roi_polygon = warp.transform_geom({'init': 'epsg:4326'}, sentinel_bands['nir'].crs, geometry)
                    nir, out_transform = mask.mask(sentinel_bands['nir'], [nir_roi_polygon], crop=True)

                    stats['NDVI'] = NDVI(nir[0], red[0])

                    if (stats['NDVI']['max'] > 1) | (stats['NDVI']['min'] < 0) | np.isnan(stats['NDVI']['mean']):
                        stats['NDVI'] = None
                        summary['data']['Invalid']['Count']['NDVI'] += 1

                insert_data(index, len(dataframe), date, field_id, stats)

            except:
                insert_data(index, len(dataframe), date, field_id, None, 'No statistics! Check for polygon validity!')
        else:
            insert_data(index, len(dataframe), date, field_id, None, 'No statistics! Check for tile availability!')

    summary['data']['Count']['With stats'] = summary['data']['Valid']['Count'] + summary['data']['Invalid']['Count']['Total']
    for key in summary['data']['SCL'].keys():
        summary['data']['SCL'][key] /= summary['data']['Count']['With stats']


def read_from_csv(filename):
    df = pd.read_csv(filename, low_memory=False)
    df = df[df['familiarity'] != 'לא רלוונטי']
    df = df[['id', 'plot', 'sentinel_id']].rename(columns={'id': 'field_id', 'plot': 'geometry'})
    df['geometry'] = '{"type": "Polygon", "coordinates": [' + df['geometry'].astype(str) + ']}'
    return df


def save_to_csv(filename):
    dataframe = pd.DataFrame.from_dict(satellite_dict)
    dataframe.to_csv(filename, index=False)


def read_from_rds(conn):
    try:
        df = pd.read_sql("SELECT id, plot, sentinel_id FROM field WHERE familiarity != 'לא רלוונטי';", conn)
    except:
        print('Reading data from satellite table failed! Check database table and columns')
        logger.critical('Reading data from satellite table failed! Check database table and columns')
        sys.exit(1)
    df = df.rename(columns={'id': 'field_id', 'plot': 'geometry'})
    df['geometry'] = '{"type": "Polygon", "coordinates": [' + df['geometry'].astype(str) + ']}'
    return df


def save_to_rds(conn):
    dataframe = pd.DataFrame.from_dict(satellite_dict)
    try:
        last_id = pd.read_sql("SELECT MAX(Id) FROM satellite", conn_string)['max'][0] + 1
    except:
        print('Reading data from satellite table failed! Check database table and columns')
        logger.critical('Reading data from satellite table failed! Check database table and columns')
        sys.exit(1)

    if last_id == 1:
        last_id = 0
    dataframe['id'] = range(last_id, last_id + summary['data']['Valid']['Count'])
    dataframe = dataframe[['id', 'date', 'field_id', 'statistics']]
    dataframe['like'] = [None] * summary['data']['Valid']['Count']

    try:
        dataframe.to_sql(name='satellite', con=conn, if_exists='append', index=False)
    except:
        print('Data insertion into satellite table failed! Check database table and columns')
        logger.critical('Data insertion into satellite table failed! Check database table and columns')
        sys.exit(1)


def get_api_token(url, obj):
    return requests.post(url + 'auth/login', json=obj).json()


def read_fields_from_api(url, token):
    # read first 100 fields
    resp = requests.post(url + 'fields/get-field-by-filter',
                         headers={'Authorization': 'token {}'.format(token['accessToken'])},
                         json={"page": 0, "pageSize": 100}).json()
    df = pd.DataFrame.from_dict(resp['fields'], orient='columns')
    field_count = resp['fieldCount']

    # read all other fields (from 101 and higher)
    for i in range(int(field_count / 100)):
        resp = requests.post(url + 'fields/get-field-by-filter',
                             headers={'Authorization': 'token {}'.format(token['accessToken'])},
                             json={"page": i+1, "pageSize": 100}).json()

        df = pd.concat([df, pd.DataFrame.from_dict(resp['fields'], orient='columns')], ignore_index=True)

    # Uncomment if you want to filter 'IRRELEVANT' fields for data mining
    df = df[df['familiarity'] != 'IRRELEVANT']
    # Filter polygons with NaN values
    df = df[df['polygon'].apply(lambda x: isinstance(x, str))]
    df = df[['id', 'polygon', 'sentinel_id']].rename(columns={'id': 'field_id', 'polygon': 'geometry'})
    # Reverse polygon for data mining
    for index, row in df.iterrows():
        reverse_coordinates = [[[coords[1], coords[0]] for coords in json.loads(row['geometry'])['coordinates'][0]]]
        df.loc[index, 'geometry'] = str({"type": "Polygon", "coordinates": reverse_coordinates})
    return df


def update_fields_sentinel_ids_to_api(df, date, url, token):
    sentinel_search_url = "https://earth-search.aws.element84.com/v1"
    sentinel_stac_client = pystac_client.Client.open(sentinel_search_url)
    count = 0
    null_number = str(df['sentinel_id'].isna().sum())
    for index, row in df.iterrows():
        geometry = literal_eval(row['geometry'].replace("\'", "\""))
        if row['sentinel_id'] is not None:
            continue
        try:
            items = sentinel_stac_client.search(
                intersects=geometry,
                datetime=date,
                collections=["sentinel-2-l2a"]).item_collection()

            sentinel_id = items[0].id.split('_')[1]
            requests.patch(url + 'fields/update-field/' + str(row['field_id']),
                           headers={'Authorization': 'token {}'.format(token['accessToken'])},
                           json={"sentinel_id": sentinel_id})
            df.at[index, 'sentinel_id'] = sentinel_id
            count = count + 1
            print(str(count) + '/' + null_number + ' ' + str(row['field_id']) + ' updated')
        except:
            print('Check tile availability for field id ' + str(row['field_id']) + ' at ' + date)
            continue
    return df


def post_satellite_data_to_api(url, token):
    for date, field_id, statistics in zip(satellite_dict['date'],
                                          satellite_dict['field_id'],
                                          satellite_dict['statistics']):
        requests.post(url + 'satellites/create',
                      headers={'Authorization': 'token {}'.format(token['accessToken'])},
                      json={"date": date,
                            "field_id": field_id,
                            "ndvi_max": json.loads(statistics)["NDVI"]["max"],
                            "ndvi_min": json.loads(statistics)["NDVI"]["min"],
                            "ndvi_std": json.loads(statistics)["NDVI"]["std"],
                            "ndvi_mean": json.loads(statistics)["NDVI"]["mean"],
                            "ndvi_median": json.loads(statistics)["NDVI"]["median"]})

        requests.patch(url + 'fields/update-field/' + str(field_id),
                       headers={'Authorization': 'token {}'.format(token['accessToken'])},
                       json={"latest_satelite_metric": round(json.loads(statistics)["NDVI"]["mean"], 2),
                             "latest_satelite_date": date})


def main(date):
    print('Reading from database')
    logger.info('Reading from database')
    # df = read_from_csv('field_sentinel_id.csv')
    # df = read_from_rds(conn_string)
    token = get_api_token(api, creds)
    df = read_fields_from_api(api, token)
    print('Finished reading from database')
    logger.info('Finished reading from database')

    print('Checking for missing sentinel ids')
    logger.info('Checking for missing sentinel ids')
    n_missing_sentinel_id = df['sentinel_id'].isna().sum()

    if n_missing_sentinel_id > 0:
        print('There are ' + str(n_missing_sentinel_id) + ' fields with missing sentinel ids')
        logger.info('There are ' + str(n_missing_sentinel_id) + ' fields with missing sentinel ids')
        df = update_fields_sentinel_ids_to_api(df, date, api, token)
        print('Finished updating sentinel ids')
        logger.info('Finished updating sentinel ids')
    else:
        print('There are no fields with missing sentinel ids')
        logger.info('There are no fields with missing sentinel ids')

    print(datetime.now().strftime('%Y-%m-%d %H:%M:%S') + ' Starting satellite setup')
    logger.info('Starting satellite setup')
    bands, date = setup(df, date)
    print(datetime.now().strftime('%Y-%m-%d %H:%M:%S') + ' Finished satellite setup')
    logger.info('Finished satellite setup')

    time_started = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(time_started + ' Starting data mining for ' + str(len(df)) + ' fields')
    logger.info('Starting data mining for ' + str(len(df)) + ' fields')
    satellite(df, bands)
    print(time_started + ' Started data mining')
    print(datetime.now().strftime('%Y-%m-%d %H:%M:%S') + ' Finished data mining')
    logger.info('Finished data mining')

    print(summary)
    logger.info('Summary ' + str(summary))

    print(datetime.now().strftime('%Y-%m-%d %H:%M:%S') + ' Saving to database')
    logger.info('Saving to database')
    # save_to_csv('satellite.csv')
    # save_to_rds(conn_string)
    post_satellite_data_to_api(api, token)
    print(datetime.now().strftime('%Y-%m-%d %H:%M:%S') + ' Finished')
    logger.info('Finished')


if __name__ == '__main__':
    # runs every day at 22:00 IST
    time_range = datetime.today().strftime('%Y-%m-%d')
    # time_range = '2023-06-14'
    main(time_range)


def get_secret():

    secret_name = "NDVI-backend-api"
    region_name = "us-east-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    # Decrypts secret using the associated KMS key.
    secret = get_secret_value_response['SecretString']

    # Your code goes here.
