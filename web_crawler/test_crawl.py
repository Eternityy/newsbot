from selenium import webdriver
from bs4 import BeautifulSoup
import json
import os
import shutil



import re
s = "\u2018Hi\u2019"
k = (re.sub("(\u2018|\u2019)", "'", s))
print(k)
