from selenium import webdriver
from bs4 import BeautifulSoup
import json
import os
import shutil
import re
from pprint import pprint

# Prices and market cap etc!!
price_url = 'https://www.investing.com/crypto/currencies'
# Ocillators and Moving Averages!!
trading_url = "https://www.tradingview.com/symbols/BTCUSD/technicals/";

# Use this Dictionary to store price elements in 'investing.com'
# 1 :[name, price, cap, volume...] 2 : [...]
price_json = dict()
for i in range(1, 31):
    price_json.update({i:[]})

# Total 26. Oscillators : 11, Exponential/Simple - 6 each, + 3
trading_json = dict()
for i in range(1, 27):
    trading_json.update({i:[]})

# This is function for storing price elements in price_json. (total : 20)
def store_price_element (price_dictionary, soup_result):
    count = 0
    ranking = 1
    for n in soup_result:
        price_dictionary[ranking].append(n.text.strip())
        print(n.text.strip())
        count += 1
        ranking += 1
        if count == 30:
            break

def store_trading_element (trading_dictionary, soup_result):
    ranking = 1 # decide each one goes to right Dictionary.
    count = 0
    # 1 : name, value, buy/sell/neutral
    for n in soup_result:

        trading_dictionary[ranking].append(n.text.strip())

        print(n.text.strip())

        count += 1;
        if count % 3 == 0:
            ranking += 1
        if count == 26*3:
            break

# store news element (start : start from the last news scrap + 1)
def store_news_element (news_dictionary, soup_result, start, total):
    # decide each one goes to right Dictionary.
    # 1, 2, 3 ... (title, link, preview for each key)
    count = 1
    for n in soup_result:

        news_dictionary[start].append(n.text.strip())
        print(n.text.strip())
        start += 1
        if count == total:break
        count += 1


# chromedriver.exe file should be in the same folder with .py file!
driver = webdriver.Chrome('/Users/ejrrb/Downloads/chromedriver_win32/chromedriver')

# wait her to load...
driver.implicitly_wait(3)

# dir of python files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Go to site to get priceElement
driver.get(price_url)
html = driver.page_source #  Elements
soup = BeautifulSoup(html, 'html.parser') # Use BeautifulSoup

# My_Code_Sucks_And_You_Know_It https://www.youtube.com/watch?v=wyx6JDQCslE
### Using soup.select, find all elements i want by CSS selector! (7)
names = soup.select('td.left.bold.elp.name.cryptoName')
prices = soup.select('td.price.js-currency-price > a')
caps = soup.select('td.js-market-cap')
vols = soup.select('td.js-24h-volume')
total_vols = soup.select('td.js-total-vol')
chg24s = soup.select('td.js-currency-change-24h')
chg7s = soup.select('td.js-currency-change-7d')

### using store_price_element function, store values to price_json dic.
store_price_element(price_json, names)
store_price_element(price_json, prices)
store_price_element(price_json, caps)
store_price_element(price_json, vols)
store_price_element(price_json, total_vols)
store_price_element(price_json, chg24s)
store_price_element(price_json, chg7s)


# Now, go to site to get tradeElement
# Waiting for feedback! -> Just do it... (No feedback :(...)

driver.get(trading_url)
html = driver.page_source #  Elements
soup = BeautifulSoup(html, 'html.parser') # Use BeautifulSoup


### Crawl Oscillator etc from trading view!
trading_data = soup.select('table > tbody > tr > td')

# Store oscillator values
store_trading_element(trading_json, trading_data)


# korean and japanese have encoding/decoding issues.
# scrap news on javascript!

# Create json file and store price_element values
with open("json_data/price_result.json", 'w+') as json_file:
    json.dump(price_json, json_file, indent = 2)

# Create json file and store trade_element values (Os, Move)
with open("json_data/trading_result.json", 'w+') as json_file:
    json.dump(trading_json, json_file, indent = 2)

driver.close()

# currently making price table & index table!
with open("json_data/us_index_name.json") as data_file:
    us_index_name = json.load(data_file)
with open("json_data/us_table_des.json") as data_file:
    us_table_des = json.load(data_file)
with open("json_data/kr_index_name.json") as data_file:
    kr_index_name = json.load(data_file)
with open("json_data/kr_table_des.json") as data_file:
    kr_table_des = json.load(data_file)
with open("json_data/jp_index_name.json") as data_file:
    jp_index_name = json.load(data_file)
with open("json_data/jp_table_des.json") as data_file:
    jp_table_des = json.load(data_file)
with open("json_data/cn_index_name.json") as data_file:
    cn_index_name = json.load(data_file)
with open("json_data/cn_table_des.json") as data_file:
    cn_table_des = json.load(data_file)
