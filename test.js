/*jshint esversion: 6 */

var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

// Use as counter to check only 20 coins iterated in request!!
var price_counter = 0;

// test url goes.

var price_url = "https://www.investing.com/crypto/currencies";
var coin_url = "https://coinmarketcap.com/";
var invest_url = "https://www.tradingview.com/symbols/BTCUSD/technicals/";

//Reference this code when you get stuck!!
// Ref link : https://ansuchan.com/nodejs-web-crawling-with-cheerio/

/*

// Give this poor request a url to get working!!

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

// Scraping Example(working very well!!)
/*
var url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error, response, body){
    if(!error){
      var $ = cheerio.load(body);

      var directors, writers, stars;
      var json = { directors : "", writers : "", stars : ""};

      $('[itemprop=director] [itemprop=name]').filter(function(){
        var data = $(this);
        directors = data.text().trim();

        json.directors = directors;
      });

      $('[itemprop=director]').filter(function(){
        var data = $(this);
        writers = data.children().last().children().last().text().trim();

        json.writers = writers;
      });

      $('.ratingValue').filter(function(){
        var data = $(this);
        stars = data.text().trim();

        json.stars = stars;
      });
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log(`File successfully written! -
      Check your project directory for the output.json file`);
    });
});

*/

// price request!

request(price_url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      // use css selector, find tag which include price
      //var priceElement = $("body");

      $('td.left>a').each(function() {
        var coin_name = $(this);
        var market_cap;
        var price;
        var volume;
        var total_vol;
        var change_24;
        var change_7;
        //var shit = $(this).find('div a').text();

        //console.log(shit);
        console.log(coin_name);

        //price_counter++;


        // This if statement should be in the last part.
/*
        if(price_counter >= 20) {
          return false;
        }
*/
        //var postUrl = $(this).find("h1 a").attr("href");



        // 6 filters for each property
        /*
          $('[itemprop=director] [itemprop=name]').filter(function(){
            var data = $(this);
            directors = data.text().trim();

            json.directors = directors;
          });

          $('[itemprop=director]').filter(function(){
            var data = $(this);
            writers = data.children().last().children().last().text().trim();

            json.writers = writers;
          });

          $('.ratingValue').filter(function(){
            var data = $(this);
            stars = data.text().trim();

            json.stars = stars;
          });


          fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the output.json file');
          });

          */

        });

    }

});






/*
Making json files haha!
for (i = 0; i < 20; i++) {
  var json = { name : "", price : "", cap : "", vol : "", total_vol : "", chg24 : "", chg7 : ""};
  fs.writeFile(`price${i}.json`, JSON.stringify(json, null, 4), function(err){
    console.log('File successfully written!');
  });
}
*/
