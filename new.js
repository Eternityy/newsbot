/*jshint esversion: 6 */

var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
var express = require('express');
var app = express();


var price_url = "https://www.investing.com/crypto/currencies";
var coin_url = "https://coinmarketcap.com/";
var invest_url = "https://www.tradingview.com/symbols/BTCUSD/technicals/";

url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error, response, html){
  if(!error){
    var $ = cheerio.load(html);

    var title, release, rating;
    var json = { title : "", release : "", rating : "" };

    $('div.plot_summary_wrapper > div.plot_summary > div:nth-child(2) > span > a > span').filter(function(){
      var data = $(this);
      title = data.text();
      json.title = title;
      console.log(title);
    });

/*
    var postElements = $("td.left.bold.elp.name.cryptoName.first.js-currency-name");
    postElements.each(function() {
      var postTitle = $(this).find("a").text().trim();

      console.log(postTitle);
    });
*/

  fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

  });

}

  // To write to the system we will use the built in 'fs' library.
  // In this example we will pass 3 parameters to the writeFile function
  // Parameter 1 :  output.json - this is what the created filename will be called
  // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
  // Parameter 3 :  callback function - a callback function to let us know the status of our function



});
