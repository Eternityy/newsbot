/*jshint esversion: 6 */
// Need this one to use ES^ features!!

var request = require("request");
var cheerio = require("cheerio");

// Urls we will use.

// price in USD and change(24hour)! - coinmarketcap
var price_url = "https://coinmarketcap.com/";
// put kimchi premium, a.k.a 'Korean Premium'!
var kimchi_url = "http://scolkg.com/";
// Ocillators and Moving Averages!!
var trading_url = "https://www.tradingview.com/symbols/BTCUSD/technicals/";
// coindesk news!
var coindesk_url = "https://tokenpost.kr/";
// cointelegraph news!
var cointele_url = "http://news.mt.co.kr/gazua/gazuaList.html";
// Investment news!
var invest_url = "http://www.investmentnews.com/section/news";

// price comparison between Upbit/Bittrex(+EOS in Bithum)!
// Also include  + KIMCHI PREMIUM!!

// price from bittrex, only EOS from bitfinex
var usd_price = {
  btc,
  bcc,
  eth,
  xmr,
  ltc,
  neo,
  btg,
  etc,
  omg,
  xrp,
  ada,
  eos
};

// Here kimchi premium goes!

var kim_pre = {
  btc,
  bcc,
  eth,
  xmr,
  ltc,
  neo,
  btg,
  etc,
  omg,
  xrp,
  ada,
  eos
};


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

// Buy, Sell, Neutral Indicator

const act_neutral = '**Neutral**';
const act_buy = '**`Buy`**';
const act_sell = '**`Sell`**';

// Moving Averages

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

var Ichimoku_Cloud_Base_Line,
    Volume_Weighted_Moving_Average_20,
    Hull_Moving_Average9;

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




// request values from site...

request(url, function(error, response, body) {
  if (error) throw error;

  var $ = cheerio.load(body);

  var postElements = $("section.posts article.post");


  // post element value iteration
  // be careful what attribute you put in find() and attr()
  postElements.each(function() {
    var postTitle = $(this).find("h1").text();
    var postUrl = $(this).find("h1 a").attr("href");
    console.log(postTitle);
    console.log(postUrl);

    // code which can store values using call back function.
    // to each indecies...
  });

});
