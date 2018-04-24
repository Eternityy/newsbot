var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var urlencode = require('urlencode');


// English news
// coindesk news!
var coindesk_url = "https://coindesk.com";
// cointelegraph news!
var cryptonews_url = "https://cryptonews.com/";

//Korean news
//tokenpost news!
var tokenpost_url = "https://tokenpost.kr/";
//moneytoday news!
var coindeskkorea_url = "http://coindeskkorea.com";

// Japanese news
var bittimes_url = "https://bittimes.net/news";

// Chinese news
var cn_8btc_url = "http://www.8btc.com/sitemap";
var bitcoin86_url = "http://www.bitcoin86.com/news/";

us_news_json = {};
kr_news_json = {};
jp_news_json = {};
cn_news_json = {};

// 10 articles for each languagues
for (i=1; i < 21; i++) {
  us_news_json[i] = [];
  kr_news_json[i] = [];
  jp_news_json[i] = [];
  cn_news_json[i] = [];
}

var us_news_body = "";
var kr_news_body = "";
var jp_news_body = "";
var cn_news_body = "";

function scrap_news(url, css_selector, news_json, start, last) {
  return new Promise(function (resolve, reject){
    request(url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            count = start; // if count == 7, return false(break). total 6!
            $(css_selector).each(function () {
                var data = $(this);

                news_json[count].push(data.text());
                news_json[count].push(data.attr("href"));
                count++;
                if (count == last) {
                  resolve();
                  return false;
                }
            });
        }
    });
  });
}

function us_make_news_body() {
  return new Promise(function (resolve, reject){
    us_news_body = "<br>"; count = 1;
    for (count = 1; count < 11; count++) {
      us_news_body = us_news_body + "- **&#128240;**[" + us_news_json[count][0] +
    "](" + us_news_json[count][1] + ")<br/><br/>";
      if (count == 10) {resolve(); return false;}
    }

    us_news_body.concat("<br>");
  });
}

function kr_make_news_body() {
  return new Promise(function (resolve, reject){
    kr_news_body = "<br/>"; count = 1;
    for (count = 1; count < 16; count++) {
      kr_news_body = kr_news_body + "- **&#128240;**[" + kr_news_json[count][0] +
    "](" + kr_news_json[count][1] + ")<br/><br/>";
      if (count == 15) {resolve(); return false;}
    }
    kr_news_body.concat("<br/>");
  });
}

function jp_make_news_body() {
  return new Promise(function (resolve, reject){
    jp_news_body = "<br/>";
    for (count = 1; count < 11; count++) {
      jp_news_body = jp_news_body + "- **&#128240;**[" + jp_news_json[count][0] +
    "](" + jp_news_json[count][1] + ")<br/><br/>";
      if (count == 10) {resolve(); return false;}
    }
    jp_news_body.concat("<br/>");
  });
}



function us_news_write() {
  fs.open('json_news/us_news.txt', 'w', function (err, file) {
    if (err) throw err;
    fs.writeFile("json_news/us_news.txt", us_news_body, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(us_news_body);
        console.log("US json_news was saved!");
    });
  });
}

function korean_news_write() {
  fs.open('json_news/korea_news.txt', 'w', function (err, file) {
    if (err) throw err;
    fs.writeFile("json_news/korea_news.txt",kr_news_body, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(kr_news_body);
        console.log("Korean json_news was saved!");
    });
  });
}

function japanese_news_write() {
  fs.open('json_news/japan_news.txt', 'w', function (err, file) {
    if (err) throw err;
    fs.writeFile("json_news/japan_news.txt", jp_news_body, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(jp_news_body);
        console.log("Japanese json_news was saved!");
    });
  });
}

function japanese_news_write() {
  fs.open('json_news/japan_news.txt', 'w', function (err, file) {
    if (err) throw err;
    fs.writeFile("json_news/japan_news.txt", jp_news_body, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(jp_news_body);
        console.log("Japanese json_news was saved!");
    });
  });
}

// read prices, trade element (thank you python!) and make a table
// then for each trade element, add description of indicators


// -> news scrap and storation


// scrap news, and merge them with prices / trade indicators + description
// section.news > div h4 > a : crytonews.com
scrap_news(coindesk_url, "div.post-info > h3 > a",
          us_news_json, 1, 11)
.then(us_make_news_body)
  .then(us_news_write)

.then(scrap_news(tokenpost_url, "div > div.subNewsRight > a",
          kr_news_json, 1, 11))
.then(scrap_news(coindeskkorea_url, "#post-12134 > div h2 > a",
          kr_news_json, 11, 16))
  .then(kr_make_news_body)
  .then(korean_news_write)

.then(scrap_news(bittimes_url, "#grid-main > article > div > div> h2 > a",
          jp_news_json, 1, 11))
  .then(jp_make_news_body)
  .then(japanese_news_write);
