from selenium import webdriver
from bs4 import BeautifulSoup
import json
import os
import shutil


# currently making price table & index table!
with open("json_data/price_result.json") as data_file:
    price_json = json.load(data_file)
with open("json_data/trading_result.json") as data_file:
    trade_json = json.load(data_file)

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


def make_price_table(price_json, index_name):
    # you should add </tbody></table> at the end of the table
    price_body = index_name["body_head"][0]
    price_body = ''.join([price_body, "<table><thead><tr>"])

    for i in range (27, 34):
        price_body = ''.join([price_body, "<th>"])
        price_body = ''.join([price_body, index_name[str(i)][0]])
        price_body = ''.join([price_body, "</th>"])
    price_body += "</tr></thead><tbody>"
    #print(price_body)
    for i in range(1, 31):
        price_body = ''.join([price_body, "<tr>"])
        for j in range(0, 7):
            price_body = ''.join([price_body, "<td>"])
            price_body = ''.join([price_body, price_json[str(i)][j]])
            price_body = ''.join([price_body, "</td>"])
        price_body = ''.join([price_body, "</tr>"])
    price_body = ''.join([price_body, "</tbody></table><br/><br/><br/>"])
    print(price_body)
    return price_body


def make_trade_table(trade_json, index_name, table_des):
    trade_body = ""
    for i in range(1, 12):
        trade_body = ''.join([trade_body, "<table><thead><tr>"])
        trade_body = ''.join([trade_body, "<th>"+index_name["34"][0]+"</th>"])
        trade_body = ''.join([trade_body, "<th>"+index_name["35"][0]+"</th>"])
        trade_body = ''.join([trade_body, "<th>"+index_name["36"][0]+"</th>"])
        trade_body = ''.join([trade_body, "</tr></thead><tbody><tr>"])
        trade_body = ''.join([trade_body, "<td>"+index_name[str(i)][0]+"</td>"])
        for j in range(1,3):
            trade_body = ''.join([trade_body, "<td>"+trade_json[str(i)][j]+"</td>"])
        trade_body = ''.join([trade_body, "</tr></tbody></table><br/>"])
        trade_body = ''.join([trade_body, table_des[str(i)][0]])
        trade_body = ''.join([trade_body, "<br/><br/><br/><br/>"])

    trade_body = ''.join([trade_body, "<table><thead><tr>"])
    trade_body = ''.join([trade_body, "<th>"+index_name["34"][0]+"</th>"])
    trade_body = ''.join([trade_body, "<th>"+index_name["35"][0]+"</th>"])
    trade_body = ''.join([trade_body, "<th>"+index_name["36"][0]+"</th>"])
    trade_body = ''.join([trade_body, "</tr></thead><tbody>"])

    for i in range(12, 24):
        trade_body = ''.join([trade_body, "<tr><td>"+index_name[str(i)][0]+"</td>"])
        trade_body = ''.join([trade_body, "<td>"+trade_json[str(i)][1]+"</td>"])
        trade_body = ''.join([trade_body, "<td>"+trade_json[str(i)][2]+"</td></tr>"])
    trade_body = ''.join([trade_body, "</tbody></table><br/>"])
    trade_body = ''.join([trade_body, table_des[str(12)][0]+"<br/><br/><br/><br/>"])
    for i in range(24, 27):
        trade_body = ''.join([trade_body, "<table><thead><tr>"])
        trade_body = ''.join([trade_body, "<th>"+index_name["34"][0]+"</th>"])
        trade_body = ''.join([trade_body, "<th>"+index_name["35"][0]+"</th>"])
        trade_body = ''.join([trade_body, "<th>"+index_name["36"][0]+"</th>"])
        trade_body = ''.join([trade_body, "</tr></thead><tbody><tr>"])
        trade_body = ''.join([trade_body, "<td>"+index_name[str(i)][0]+"</td>"])
        for j in range(1,3):
            trade_body = ''.join([trade_body, "<td>"+trade_json[str(i)][j]+"</td>"])
        trade_body = ''.join([trade_body, "</tr></tbody></table><br/>"])
        trade_body = ''.join([trade_body, table_des[str(i-11)][0]])
        trade_body = ''.join([trade_body, "<br/><br/><br/>"])
    trade_body = ''.join([trade_body, "<br/>News<br/>"])
    print(trade_body)
    return trade_body

us_trade = make_trade_table(trade_json, us_index_name, us_table_des)
us_price = make_price_table(price_json, us_index_name)

us_body1 = open("json_data/us_body.txt", 'w')
us_body1.write(us_price+us_trade)
us_body1.close()
