from selenium import webdriver
from bs4 import BeautifulSoup
import json
import os
import shutil

# Prices and market cap etc!!
price_url = 'https://www.investing.com/crypto/currencies'
# Ocillators and Moving Averages!!
trading_url = "https://www.tradingview.com/symbols/BTCUSD/technicals/";

########################################################################
# Below are News urls!
# English news
# coindesk news!
coindesk_url = "";
# cointelegraph news!
cointele_url = "";
# Investment news!
invest_url = "http://www.investmentnews.com/section/news";

##############################

# Korean news
# tokenpost news!
tokenpost_url = "https://tokenpost.kr/";
# moneytoday news!
mt_url = "http://news.mt.co.kr/gazua/gazuaList.html";



# Use this Dictionary to store price elements in 'investing.com'
price_json =  {
    'name': [],
    'price': [],
    'cap': [],
    'vol': [],
    'total_vol': [],
    'chg24': [],
    'chg7': []
}


# Total 26. Oscillators : 11, Exponential/Simple - 6 each, + 3
osc_and_moving_json = {
    'name': [],
    'value': [],
    'action': []
}


pivot_json = {
    'pivot': [],
    'classic': [],
    'Fibonacci': []
}


# This is function for storing price elements in price_json. (total : 20)
def store_price_element (price_dictionary, price_element, soup_result):
    count = 0
    for n in soup_result:
        price_dictionary[price_element].append(n.text.strip())
        print(n.text.strip())
        count += 1
        if count == 20:
            break

def store_osc_and_moving_element (osc_and_moving_dictionary, soup_result):
    count = 0
    discriminator = 0; # decide each one goes to right Dictionary.
    # %3 : 0 - Name, 1 - Value, 2 - Action
    for n in soup_result:
        if (discriminator % 3 == 0):
            osc_and_moving_dictionary['name'].append(n.text.strip())
        elif (discriminator % 3 == 1):
            osc_and_moving_dictionary['value'].append(n.text.strip())
        elif (discriminator % 3 == 2):
            osc_and_moving_dictionary['action'].append(n.text.strip())

        print(n.text.strip())
        discriminator += 1;
        count += 1
        if count == 26*3:
            break


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

# 코드가.. 미리 죄송합니다ㅠ (나중에 다시 깔끔하게...)
### Using soup.select, find all elements i want by CSS selector! (7)
names = soup.select('td.left.bold.elp.name.cryptoName')
prices = soup.select('td.price.js-currency-price > a')
caps = soup.select('td.js-market-cap')
vols = soup.select('td.js-24h-volume')
total_vols = soup.select('td.js-total-vol')
chg24s = soup.select('td.js-currency-change-24h')
chg7s = soup.select('td.js-currency-change-7d')

### using store_price_element function, store values to price_json dic.
store_price_element(price_json, 'name', names)
store_price_element(price_json, 'price', prices)
store_price_element(price_json, 'cap', caps)
store_price_element(price_json, 'vol', vols)
store_price_element(price_json, 'total_vol', total_vols)
store_price_element(price_json, 'chg24', chg24s)
store_price_element(price_json, 'chg7', chg7s)


# Now, go to site to get tradeElement
# Waiting for feedback! -> Just do it... (No feedback :(...)

driver.get(trading_url)
html = driver.page_source #  Elements
soup = BeautifulSoup(html, 'html.parser') # Use BeautifulSoup


### Crawl Oscillator etc from trading view!
osc_and_moving_data = soup.select('table > tbody > tr > td')

# Store oscillator values
store_osc_and_moving_element(osc_and_moving_json, osc_and_moving_data)

# Create json file and store price_element values
with open("json_data/price_result.json", 'w+') as json_file:
    json.dump(price_json, json_file, indent = 2)

# Create json file and store trade_element values (Os, Move)
with open("json_data/osc_and_moving_result.json", 'w+') as json_file:
    json.dump(osc_and_moving_json, json_file, indent = 2)
