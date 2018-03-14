/*jshint esversion: 6 */

var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


// test url goes.

var coinmarketcap_url = "https://coinmarketcap.com/";
var invest_url = "https://www.tradingview.com/symbols/BTCUSD/technicals/";

//Reference this code when you get stuck!!
// Ref link : https://ansuchan.com/nodejs-web-crawling-with-cheerio/

/*

request(url, function(error, response, body) {
  if (error) throw error;

  var $ = cheerio.load(body);

  var postElements = $("section.posts article.post");
  postElements.each(function() {
    var postTitle = $(this).find("h1").text();
    //var postUrl = $(this).find("h1 a").attr("href");
    var postpreview = $(this).find("p").text();
    console.log(postTitle);
    console.log(postpreview);
  });
});

*/

// price request

//app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2

function testscrap() {

  let url = 'http://www.imdb.com/title/tt5052448/?ref_=fn_al_tt_1';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      });

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      });
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    });

//    res.send('Check your console!');
  });
}

testscrap();


/*

// price request
request(invest_url, function(error, response, html) {
  if (error) throw error;

  var $ = cheerio.load(html);

  var investment = $("div.tablesWrapper-3-2f1vZg-");
  investment.each(function() {
    var coin1 = $(this).find('td.cell-6KbOCOru-').text();

    var coin_price = $(this).find('a[href^="pid"]').text();
    var coin_cap = $(this).find('td.js-market-cap').text();
    var coin_volume24 = $(this).find('td.js-24h-volume').text();
    var coin_volumeall = $(this).find('td.js-total-vol').text();
    var coin_change24 = $(this).find('td.js-currency-change-24h redFont pid-945629-pcp').text();
    var coin_change7 = $(this).find('td.js-currency-change-7d redFont').text();

    console.log(coin1);

    console.log(coin_price);
    console.log(coin_cap);
    console.log(coin_volume24);
    console.log(coin_volumeall);
    console.log(coin_change24);
    console.log(coin_change7);

  });
});
*/
