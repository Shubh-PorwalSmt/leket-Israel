import logging
import psycopg2
from sqlalchemy import create_engine

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
from prophet import Prophet

# replace with database credentials
conn_string = "postgresql://user:password@host/dbname"

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# set the days of the prediction scores and the forcast components
score_forcast_days = 6
score_forcast = 'yearly'

# predictions for today until score_forcast_days
from_date = str(datetime.today())[0:10]
to_date = str(datetime.today() + timedelta(days=score_forcast_days))[0:10]


# function for mission scores made by the prophet prediction model
def mission_score(mission, min_count):
    # processing dataframe, set of products and dictionary
    products = mission.groupby(['product', 'date']).sum()['amount_kg'].reset_index()
    unique_products = products['product'].unique()
    product = dict()

    # Remove all products with low number of missions (below min_count) and save to dictionary
    for idx, prod in enumerate(unique_products):
        value = products[products['product'] == prod].drop('product', axis=1).set_index('date')
        if len(value) >= min_count:
            product[prod] = value

    # Create attractiveness scores dictionary and dataframe
    score_dict = dict()
    score = pd.DataFrame(columns=[str(date)[0:10] for date in pd.date_range(from_date, to_date, freq='D')])

    # train model for every product
    for prod_name in product.keys():
        # prepare data for model training
        df = product[prod_name].reset_index()
        df.rename(columns={'date': 'ds', 'amount_kg': 'y'}, inplace=True)

        # create prophet instance model and train on data
        m = Prophet()
        m.fit(df)

        # create time delta for the last date of the product till today
        delta = datetime.today() - df['ds'].max()

        # make predictions
        future = m.make_future_dataframe(periods=(delta.days + score_forcast_days))
        forecast = m.predict(future)

        # save forcast components into dictionary
        score_dict[prod_name] = forecast[-score_forcast_days:][['ds', 'trend', 'weekly', 'yearly', 'yhat']].set_index('ds')

        # create score between 0 and 1 by using MinMaxScaler()
        forecast['score'] = MinMaxScaler().fit_transform(np.array(forecast[score_forcast]).reshape(-1, 1))

        # save scores from time delta
        score.loc[prod_name] = list(forecast[forecast['ds'] >= from_date]['score'])

    return score


# function for market scores made by the prophet prediction model
def market_score(market):
    # processing dataframe, set of products and dictionary
    products = market.groupby(['product', 'date']).mean()['price'].reset_index()
    unique_products = products['product'].unique()
    product = dict()

    # Save dataframe for each product in the dictionary
    for prod in unique_products:
        df = products[products['product'] == prod].drop('product', axis=1).set_index('date')
        product[prod] = df

    # Create attractiveness scores dictionary and dataframe
    score_dict = dict()
    score = pd.DataFrame(columns=[str(date)[0:10] for date in pd.date_range(from_date, to_date, freq='D')])

    # train model for every product
    for prod_name in product.keys():
        # prepare data for model training
        df = product[prod_name].reset_index()
        df.rename(columns={'date': 'ds', 'price': 'y'}, inplace=True)

        # create prophet instance model and train on data
        m = Prophet()
        m.fit(df)

        # create time delta for the last date of the product till today
        delta = datetime.today() - df['ds'].max()

        # make predictions
        future = m.make_future_dataframe(periods=(delta.days + score_forcast_days))
        forecast = m.predict(future)

        # save forcast components into dictionary
        score_dict[prod_name] = forecast[-score_forcast_days:][['ds', 'trend', 'weekly', 'yearly', 'yhat']].set_index('ds')

        # create score between 0 and 1 by using MinMaxScaler(). In this case lower price is higher score
        forecast['score'] = 1 - MinMaxScaler().fit_transform(np.array(forecast[score_forcast]).reshape(-1, 1))

        # save scores from time delta
        score.loc[prod_name] = list(forecast[forecast['ds'] >= from_date]['score'])

    return score


# function for satellite scores made by the prophet prediction model
def satellite_score(satellite):
    # TODO: Calculate satellite scores
    score = pd.DataFrame(columns=[str(date)[0:10] for date in pd.date_range(from_date, to_date, freq='D')])

    return score


# function for returning last serial id from table from the db
def last_id(conn_str, table):
    conn = psycopg2.connect(conn_str)
    conn.autocommit = True
    cursor = conn.cursor()

    query = "SELECT MAX(Id) FROM " + table
    cursor.execute(query)

    last_serial_id = cursor.fetchone()[0]

    # conn.commit()
    conn.close()
    return last_serial_id


# function for creating attractiveness dataframe for mission, market, satellite and average scores
def attractiveness_score(mission, market, satellite, serial_id):
    attractiveness = pd.DataFrame(columns=['id',
                                           'date',
                                           'field_id',
                                           'product',
                                           'mission_score',
                                           'market_score',
                                           'satellite_score',
                                           'average_score',
                                           'like'])
    # dates and products of all scores
    dates = mission.columns
    products = list(set().union(mission.index, market.index, satellite.index))

    # reset serial number if there are no data in attractiveness table
    if serial_id is None:
        serial_id = -1

    # retrieve every score by date and product
    for date in dates:
        for prod in products:
            mission_score = mission[date].loc[prod] if prod in mission.index else None
            market_score = market[date].loc[prod] if prod in market.index else None
            # TODO: Replace satellite scores with true values
            satellite_score = None

            # calculate the average score
            scores = [mission_score, market_score, satellite_score]
            average_score = np.mean([score for score in scores if score is not None])

            # add one to the serial id
            serial_id += 1

            # add new row to dataframe
            # TODO: Replace field ids with true values
            new_row = [serial_id, date, None, prod, mission_score, market_score, satellite_score, average_score, None]
            attractiveness.loc[len(attractiveness)] = new_row

    return attractiveness


# weekly update of attractiveness scores of mission, market, satellite and average into the RDS
def lambda_handler(event, context):
    db = create_engine(conn_string)
    db_connection = db.connect()

    logger.info("SUCCESS: Connection to RDS PostgreSQL instance succeeded")
    print("SUCCESS: Connection to RDS PostgreSQL instance succeeded")

    # fetch 'mission' data from the 'mission' table
    mission = pd.read_sql_table('mission', db_connection, columns=['product', 'date', 'amount_kg'])
    # fetch 'market' data from the 'market' table
    market = pd.read_sql_table('market', db_connection, columns=['product', 'date', 'price'])
    # fetch 'satellite' data from the 'satellite' table
    # TODO: Read true NDVI values from satellite database
    satellite = pd.read_sql_table('satellite', db_connection)

    # create attractiveness dataframe by using the attractiveness_score function
    attractiveness = attractiveness_score(
        mission_score(mission, 30),
        market_score(market),
        satellite_score(satellite),
        last_id(conn_string, 'attractiveness'))

    print(attractiveness)

    # insert into 'attractiveness' table of the db
    result = attractiveness.to_sql(name='attractiveness', con=db, if_exists='append', index=False)

    logger.info("SUCCESS: Updated attractiveness into RDS DB")
    print("SUCCESS: Updated attractiveness into RDS DB")

    return result
