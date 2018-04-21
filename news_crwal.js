var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var urlencode = require('urlencode');


// English news
// coindesk news!
var coindesk_url = "https://coindesk.com";
// cointelegraph news!
var ccn_url = "https://ccn.com";

//Korean news
//tokenpost news!
var tokenpost_url = "https://tokenpost.kr/";
//moneytoday news!
var mt_url = "http://news.mt.co.kr/gazua/gazuaList.html";

// Japanese news
var cryptojapan_url = "http://ja.cryptojapan.net/";

us_news_json = {};
kr_news_json = {};
jp_news_json = {};

// 10 articles for each languagues
for (i=1; i < 11; i++) {
  us_news_json[i] = [];
  kr_news_json[i] = [];
  jp_news_json[i] = [];
}

function us_news1(callback) {
  return new Promise(function (resolve, reject){
    request(coindesk_url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            count = 1; // if count == 7, return false(break). total 6!
            $("div.post-info > h3 > a").each(function () {
                var data = $(this);

                us_news_json[count].push(data.text());
                us_news_json[count].push(data.attr("href"));
                count++;
                if (count == 8) {
                  resolve();
                  return false;
                }
                //console.log(us_news_json);
            });
        }
    });
  });
}

function us_news2(callback) {
  return new Promise(function (resolve, reject){
    request(ccn_url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            count = 8; // if count == 7, return false(break). total 6!
            $("header > h4 > a").each(function () {
                var data = $(this);

                us_news_json[count].push(data.text());
                us_news_json[count].push(data.attr("href"));

                if (count == 10) {
                  resolve(res);
                  return false;
                }
                count++;
            });
        }
    });
  });
}


function korean_news1(callback) {
  return new Promise(function (resolve, reject){
    request(tokenpost_url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            count = 1; // if count == 7, return false(break)
            $("div > div.subNewsRight > a").each(function () {
                var data = $(this);

                kr_news_json[count].push(data.text());
                kr_news_json[count].push(tokenpost_url + data.attr("href"));

                count++;
                if (count == 11) {
                  resolve();
                  return false;
                }
            });
        }
    });
  });
}
// due to encoding issue, do not scrap news from moneytoday!


//Japanese news
//cryptojapan news!
// -> crawl every news on page 1 (10)
var bittimes_url = "https://bittimes.net/news";

function japanese_news1(callback) {
  return new Promise(function (resolve, reject){
    request(bittimes_url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            count = 1; // if count == 7, return false(break)
            $("#grid-main > article > div > div> h2 > a").each(function () {
                var data = $(this);
                jp_news_json[count].push(data.text());
                jp_news_json[count].push(data.attr("href"));
                count++;
                if (count == 11) {
                  resolve();
                  return false;
                }
            });
        }
    });
  });
}


function us_news_write() {
  fs.open('json_news/us_news.txt', 'w', function (err, file) {
    if (err) throw err;
    fs.writeFile("json_news/us_news.txt", us_news_json, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(us_news_json);
        console.log("US json_news was saved!");
    });
  });
}

function korean_news_write() {
  fs.open('json_news/korea_news.txt', 'w', function (err, file) {
    if (err) throw err;
    fs.writeFile("json_news/korea_news.txt", kr_news_json, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(kr_news_json);
        console.log("Korean json_news was saved!");
    });
  });
}


function japanese_news_write() {
  fs.open('json_news/japan_news.txt', 'w', function (err, file) {
    if (err) throw err;
    fs.writeFile("json_news/japan_news.txt", jp_news_json, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(jp_news_json);
        console.log("Japanese json_news was saved!");
    });
  });
}

us_news1()
  .then(us_news2)
//.then(make_news_body)
  .then(us_news_write);

korean_news1()
//.then(make_news_body)
  .then(korean_news_write);

japanese_news1()
//.then(make_news_body)
  .then(japanese_news_write);
