import logging
import psycopg2
import pandas as pd
from sqlalchemy import create_engine

# replace with database credentials
conn_string = "postgresql://user:password@host/dbname"

logger = logging.getLogger()
logger.setLevel(logging.INFO)


# daily market prices update into RDS from external website
def lambda_handler(event, context):
    db = create_engine(conn_string)

    logger.info("SUCCESS: Connection to RDS PostgreSQL instance succeeded")
    print("SUCCESS: Connection to RDS PostgreSQL instance succeeded")

    # connect to database
    conn = psycopg2.connect(conn_string)
    conn.autocommit = True
    cursor = conn.cursor()

    # query for the last serial id from market table of the db
    query = "SELECT MAX(Id) FROM market;"
    cursor.execute(query)
    last_id = cursor.fetchone()[0]

    # query for all the products in the product enum of the db
    query = "SELECT unnest(enum_range(NULL::product))::text AS product;"
    cursor.execute(query)
    products = [product[0] for product in cursor.fetchall()]

    # conn.commit()
    conn.close()

    # fetch Excel file with the correct sheet
    market = pd.read_excel(r'https://prices.moag.gov.il/media/historyPrices.xlsx', sheet_name='שוק צריפין')

    logger.info("SUCCESS: fetching excel file succeeded")
    print("SUCCESS: fetching excel file succeeded")

    # process dataframe as average and change date format
    market_products = market.groupby(['מין', 'תאריך']).mean()['מחיר ממוצע'].reset_index()
    market_products['תאריך'] = pd.to_datetime(market_products['תאריך'], format='%m/%d/%Y', exact=False)

    # get today prices
    today_date = pd.to_datetime("today").strftime("%d/%m/%Y")
    today_market_prices = market_products[market_products['תאריך'] == today_date].reset_index()

    # change columns names to English
    today_market_prices.rename(columns={'מין': 'product', 'תאריך': 'date', 'מחיר ממוצע': 'price', 'index': 'id'}, inplace=True)

    # remove products from dataframe that are not in the product enum of the db
    today_market_products = today_market_prices['product'].unique()
    for prod in today_market_products:
        if prod not in products:
            logger.info(prod, "is not in product enum in database. Removing it from today market prices")
            print(prod, "is not in product enum in database. Removing it from today market prices")
            today_market_prices = today_market_prices[today_market_prices['product'] != prod]

    # add 'id' column from the latest serial id
    today_market_prices['id'] = list(range(last_id+1, last_id+1+len(today_market_prices)))

    print(today_market_prices)

    # insert into 'market' table of the db
    result = today_market_prices.to_sql(name='market', con=db, if_exists='append', index=False)

    logger.info("SUCCESS: Updated today market prices into RDS DB")
    print("SUCCESS: Updated today market prices into RDS DB")

    return result
