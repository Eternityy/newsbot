/*jshint esversion: 6 */

// I finally found what i wanted...

//var phantom = require("phantom");



var page = require('webpage').create();

var invest_url = 'https://www.investing.com/crypto/currencies';
var trade_url = 'https://www.tradingview.com/symbols/BTCUSD/technicals/';

// price indicators in investing.com!

var coin_name;
var price;
var market_cap;
var volume;
var total_vol;
var change_24;
var change_7;

// list of investment indices from trading view!

// Oscillators

var Relative_Strength_Index;  //(14)
var Stochastic_Fast; //(14, 3, 1)
var Commodity_Channel_Index; //(20)
var Average_Directional_Index; //(14)
var Awesome_Oscillator;
var Momentum; //(10)
var MACD_Level; // (12, 27)
var RSI_Fast; // (3, 3, 14, 14)
var Williams_Percent_Range; //(14)
var Bull_Bear_Power;
var Ultimate_Oscillator; //(7, 14, 28)

var ocillators = [];

// Buy, Sell, Neutral Indicator

const act_neutral = '**Neutral**';
const act_buy = '**`Buy`**';
const act_sell = '**`Sell`**';

// Moving Averages

var moving_avg = [];


var Ichimoku_Cloud_Base_Line,
    Volume_Weighted_Moving_Average_20,
    Hull_Moving_Average9;

var simple_moving = {
  avg_10,
  avg_20,
  avg_30,
  avg_50,
  avg_100,
  avg_200
};

var expo_moving = {
  avg_10,
  avg_20,
  avg_30,
  avg_50,
  avg_100,
  avg_200
};


// pivot point


var pivot_classic = {
  s3 : '',
  s2 : '',
  s1 : '',
  p  : '',
  r1 : '',
  r2 : '',
  r3 : ''
};


var pivot_fibo = {
  s3 : '',
  s2 : '',
  s1 : '',
  p  : '',
  r1 : '',
  r2 : '',
  r3 : ''
};


// cryptonews!!

// coindesk
var coindesk1 = {title : "", summary : "", url : ""};
var coindesk2 = {title : "", summary : "", url : ""};
var coindesk3 = {title : "", summary : "", url : ""};

// cointelegraph
var cointele1 = {title : "", summary : "", url : ""};
var cointele2 = {title : "", summary : "", url : ""};
var cointele3 = {title : "", summary : "", url : ""};

// InvestmentNews
var cointele1 = {title : "", summary : "", url : ""};
var cointele2 = {title : "", summary : "", url : ""};
var cointele3 = {title : "", summary : "", url : ""};

// actual text format goes :




/*
// working, but only return bitcoin.(no serialization)
page.open('https://www.investing.com/crypto/currencies', function (status) {
    if (status) {
        //var html = page.content;
        // console.log(html);
        var coin_name = [];

        for (i = 0; i < 20; i++) {
        coin_name[i] = page.evaluate(function(){
        return document.querySelector('td[class*="js-currency-name"] a').textContent;
      });
      console.log("Coin name : " + coin_name[i]);
    }

  }
  phantom.exit();
});

*/

// list all the prices in investing.com!

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
  console.log(price[0], price[1], price[2]);
  console.log(volume[0], volume[1], volume[2]);
  console.log(total_vol[0], total_vol[1], total_vol[2]);
  console.log(change_24[0], change_24[1], change_24[2]);
  console.log(change_7[0], change_7[1], change_7[2]);

  console.log('It works!!!');
  phantom.exit();
});
