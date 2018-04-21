from selenium import webdriver
from bs4 import BeautifulSoup
import json
import os
import shutil
import re

# Prices and market cap etc!!
price_url = 'https://www.investing.com/crypto/currencies'
# Ocillators and Moving Averages!!
trading_url = "https://www.tradingview.com/symbols/BTCUSD/technicals/";

########################################################################
# Below are News urls!
# English news
# coindesk news!
coindesk_url = "https://coindesk.com";
# cointelegraph news!
cointele_url = "https://cointelegraph.com";
# Investment news!
invest_url = "http://www.investmentnews.com/section/news";

##############################

# Korean news
# tokenpost news!
tokenpost_url = "https://tokenpost.kr/";
# moneytoday news!
mt_url = "http://news.mt.co.kr/gazua/gazuaList.html";

##############################

# Japanese news

# cryptojapan news!
# -> crawl every news on page 1
cryptojapan_url = "http://ja.cryptojapan.net/";


##############################

# Chinese news

##############################

# Spanish news

########################################################################

# Use this Dictionary to store price elements in 'investing.com'
# 1 :[name, price, cap, volume...] 2 : [...]
price_json = dict()

for i in range(1, 21):
    price_json.update({i:[]})


# Total 26. Oscillators : 11, Exponential/Simple - 6 each, + 3
trading_json = dict()

for i in range(1, 27):
    trading_json.update({i:[]})

# Not sure i would use this (Not used for the time being)
us_news_json = dict()

for i in range(1, 14):
    us_news_json.update({i:[]})


kr_news_json = dict()

for i in range(1, 14):
    kr_news_json.update({i:[]})

# This is function for storing price elements in price_json. (total : 20)
def store_price_element (price_dictionary, soup_result):
    count = 0
    ranking = 1
    for n in soup_result:
        price_dictionary[ranking].append(n.text.strip())
        print(n.text.strip())
        count += 1
        ranking += 1
        if count == 20:
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



driver.get(coindesk_url)
html = driver.page_source #  Elements
soup = BeautifulSoup(html, 'html.parser') # Use BeautifulSoup

### Crawl news title, link and preview from coindesk!

coindesk_soup = soup.select('div.post-info > h3 > a')

# Store title/link values
store_news_element(us_news_json, coindesk_soup, 1, 5)
count = 1
for link in coindesk_soup:
    us_news_json[count].append(link.get('href'))
    if count == 5: break
    count+=1


### Crawl news title, link and preview from cointelegraph!
driver.get(cointele_url)
html = driver.page_source #  Elements
soup = BeautifulSoup(html, 'html.parser') # Use BeautifulSoup


cointele_soup = soup.select('#posts-content > div > div > div > div > a')
# Store title/link values
count = 6
for link in cointele_soup:
    #k = (re.sub("(\u2018|\u2019)", "'", link.get('title')))
    us_news_json[count].append(link.get('title'))
    if count == 13: break
    count+=1
count = 6
for link in cointele_soup:
    us_news_json[count].append(link.get('href'))
    if count == 13: break
    count+=1

# korean and japanese have encoding/decoding issues.
# scrap news on javascript!

# Create json file and store price_element values
with open("json_data/price_result.json", 'w+') as json_file:
    json.dump(price_json, json_file, indent = 2)

# Create json file and store trade_element values (Os, Move)
with open("json_data/trading_result.json", 'w+') as json_file:
    json.dump(trading_json, json_file, indent = 2)

# Create json file and store us_news_element values
with open("json_news/us_news.json", 'w+') as json_file:
    json.dump(us_news_json, json_file, indent = 2)
