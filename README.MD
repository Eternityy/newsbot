myapp.js -> get json files for posting, post, vote_bot, etc.


web_crawler/crawl.py -> crwal prices, trading_indicators.


json_data -> prices, trading_indicators folder.


json_news -> news data for each languages.


json_passwords -> DO NOT UPLOAD PW ON GITHUB. USE LOCAL DIR.


when use web crawler, store value like below!!!
-> BOTH price_result and osc_and_moving_result!!!

1 : ["bitcoin", "555$", "444$", "20%", ...]
2 : ["Eth", "45$", ...]

so that you can use this dictionary type when you make json_body!!!
(use python. for item in price_json[i] : ...)
//EXAMPLE :

for i in range (1, 21) :
  for item in price_json[i] :
    // TODO
