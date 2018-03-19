/*jshint esversion: 6 */

// I finally found what i wanted...

//var phantom = require("phantom");

var page = require('webpage').create();
var fs = require('fs');
var path = './json_data/price.json';

var price_content = {
    name: [],
    price: [],
    cap: [],
    vol: [],
    total_vol: [],
    chg24: [],
    chg7: []
};

var i = 0;

var invest_url = 'https://www.investing.com/crypto/currencies';
var trade_url = 'https://www.tradingview.com/symbols/BTCUSD/technicals/';

page.open(invest_url, function(status) {
  var coin_name = page.evaluate(function() {
    return [].map.call(document.querySelectorAll('td[class*="js-currency-name"] a'), function(link) {
      return link.textContent;
    });
  });

  var price = page.evaluate(function() {
    return [].map.call(document.querySelectorAll('tr>td>a[href^="/crypto/currency-pairs"]'), function(link) {
      return link.textContent;
    });
  });

  var market_cap = page.evaluate(function() {
    return [].map.call(document.querySelectorAll('tr td.js-market-cap'), function(link) {
      return link.textContent;
    });
  });

  var volume = page.evaluate(function() {
    return [].map.call(document.querySelectorAll('tr td.js-24h-volume'), function(link) {
      return link.textContent;
    });
  });

  var total_vol = page.evaluate(function() {
    return [].map.call(document.querySelectorAll('tr td.js-total-vol'), function(link) {
      return link.textContent;
    });
  });

  var change_24 = page.evaluate(function() {
    return [].map.call(document.querySelectorAll('tr td[class^="js-currency-change-24h"]'), function(link) {
      return link.textContent;
    });
  });

  var change_7 = page.evaluate(function() {
    return [].map.call(document.querySelectorAll('tr td[class^="js-currency-change-7d"]'), function(link) {
      return link.textContent;
    });
  });


  console.log(coin_name[0], coin_name[1], coin_name[2]);
  console.log(market_cap[0], market_cap[1], market_cap[2]);
  console.log(price[0], price[1], price[2]);
  console.log(volume[0], volume[1], volume[2]);
  console.log(total_vol[0], total_vol[1], total_vol[2]);
  console.log(change_24[0], change_24[1], change_24[2]);
  console.log(change_7[0], change_7[1], change_7[2]);


  fs.write(path, price_content, 'w');
  console.log('It works!!!');

  phantom.exit();
});
