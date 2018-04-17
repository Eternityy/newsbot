from selenium import webdriver
from bs4 import BeautifulSoup
import json
import os
import shutil


price_json =  {
    1 : ["1", "2", "@", "4", "5"],
    2: [],
    3: [],
    4: [],
    5: [],
    'chg24': [],
    'chg7': []
}

for i in range (1, 5) :
  for item in price_json[i] :
      print(item)
