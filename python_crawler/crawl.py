from selenium import webdriver
from bs4 import BeautifulSoup
import json
import os

price_url = 'https://www.investing.com/crypto/currencies'

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


# This is function for storing price elements in price_json.
def store_price_element (price_dictionary, price_element, soup_result):
    count = 1
    for n in soup_result:
        price_dictionary[price_element].append(n.text.strip())
        print(n.text.strip())
        count += 1
        if count == 21:
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

# Using soup.select, find all elements i want by CSS selector! (7)
names = soup.select('td.left.bold.elp.name.cryptoName')
prices = soup.select('td.price.js-currency-price > a')
caps = soup.select('td.js-market-cap')
vols = soup.select('td.js-24h-volume')
total_vols = soup.select('td.js-total-vol')
chg24s = soup.select('td.js-currency-change-24h')
chg7s = soup.select('td.js-currency-change-7d')

# using store_price_element function, store values to price_json dic.
store_price_element(price_json, 'name', names)
store_price_element(price_json, 'price', prices)
store_price_element(price_json, 'cap', caps)
store_price_element(price_json, 'vol', vols)
store_price_element(price_json, 'total_vol', total_vols)
store_price_element(price_json, 'chg24', chg24s)
store_price_element(price_json, 'chg7', chg7s)

# Create json file and store price_element values
with open(os.path.join(BASE_DIR, 'result.json'), 'w+') as json_file:
    json.dump(price_json, json_file, indent = 2)
