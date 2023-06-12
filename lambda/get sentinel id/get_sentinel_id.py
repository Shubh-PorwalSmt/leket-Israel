import logging
import sys
import psycopg2

import satsearch

import pandas as pd

from datetime import datetime
from ast import literal_eval

conn_string = 'postgresql://user:password@host/dbname'

# Create and configure logger
logging.basicConfig(filename="get_sentinel_id.log", format='%(levelname)s:%(asctime)s:%(message)s')

# Creating an object
logger = logging.getLogger()

# Setting the threshold of logger to INFO
logger.setLevel(logging.INFO)


def field_info(geometry, time_range):
    try:
        sentinel_search = satsearch.Search.search(
            url="https://earth-search.aws.element84.com/v0",
            intersects=geometry,
            datetime=time_range,
            collections=['sentinel-s2-l2a-cogs'])

        sentinel_id = str(sentinel_search.items()[0])[4:9]
    except:
        print('Invalid polygon or date!')
        logger.warning('Invalid polygon or date!')
        exit(1)

    return sentinel_id


def read_from_csv(filename):
    df = pd.read_csv(filename, low_memory=False)
    last_entry = df.tail(1)
    # if ~last_entry['sentinel_id'].isnull().iloc[0]:
    #     print('Sentinel id is not null!')
    #     logger.info('Sentinel id is not null!')
    #     exit(0)
    last_entry = last_entry[['id', 'plot', 'sentinel_id']].rename(columns={'id': 'field_id', 'plot': 'geometry'})
    last_entry['geometry'] = '{"type": "Polygon", "coordinates": [' + last_entry['geometry'].astype(str) + ']}'
    geometry = literal_eval(last_entry['geometry'].iloc[0].replace("\'", "\""))
    return df, geometry


def save_to_csv(sentinel_id, dataframe, filename):
    dataframe.loc[dataframe.index[-1], ['sentinel_id']] = [sentinel_id]
    print(dataframe.tail(1))
    dataframe.to_csv(filename, index=False)


def read_from_rds(conn):
    try:
        df = pd.read_sql("SELECT id, plot, sentinel_id FROM field WHERE familiarity != 'לא רלוונטי' AND id=(select max(id) from field);", conn)
    except:
        print('Reading data from satellite table failed! Check database table and columns')
        logger.critical('Reading data from satellite table failed! Check database table and columns')
        sys.exit(1)
    # if ~df['sentinel_id'].isnull().iloc[0]:
    #     print('Sentinel id is not null!')
    #     logger.info('Sentinel id is not null!')
    #     exit(0)
    last_entry = df[['id', 'plot', 'sentinel_id']].rename(columns={'id': 'field_id', 'plot': 'geometry'})
    last_entry['geometry'] = '{"type": "Polygon", "coordinates": [' + last_entry['geometry'].astype(str) + ']}'
    geometry = literal_eval(last_entry['geometry'].iloc[0].replace("\'", "\""))
    return df, geometry


def save_to_rds(conn, sentinel_id):
    conn = psycopg2.connect(conn)
    conn.autocommit = True
    cursor = conn.cursor()

    # Updating the records
    sql = "UPDATE field SET sentinel_id = '" + sentinel_id + "' WHERE familiarity != 'לא רלוונטי' AND id=(select max(id) from field);"
    cursor.execute(sql)
    print("Table updated")

    # Commit your changes in the database
    conn.commit()

    # Closing the connection
    conn.close()


def main(date=datetime.today().strftime('%Y-%m-%d')):
    print('Reading from database')
    logger.info('Reading from database')
    # df, geometry = read_from_csv('field_sentinel_id.csv')
    df, geometry = read_from_rds(conn_string)
    print('Finished reading from database')
    logger.info('Finished reading from database')

    print('Sentinel id mining')
    logger.info('Sentinel id mining')
    sentinel_id = field_info(geometry, date)
    logger.info('Finished mining')

    print('Saving sentinel id to database')
    logger.info('Saving sentinel id to database')
    # save_to_csv(sentinel_id, df, 'field_sentinel_id.csv')
    save_to_rds(conn_string, sentinel_id)
    logger.info('Finished')


if __name__ == '__main__':
    today = datetime.today().strftime('%Y-%m-%d')
    # today = '2023-04-25'
    main(today)
