
/*jshint esversion: 6 */ /* jshint node: true */


/****************************************************
*													*
*		this is just for test. IGNORE THIS.			*
*													*
****************************************************/
/*
var fs = require('fs');
// investing.com 에서 가져온 가격 정보를 fs 모듈로 불러오기 (상위 20개)
// 현재 가격 정보는 크롤링은 만들어 놨음.(crawl.py -> price_result.json)
let price_body = "<table> \\\
  <thead> \\\
    <tr> \\\
      <th>Name</th> \\\
      <th>Price</th> \\\
      <th>Marketcap</th> \\\
      <th>Volume</th> \\\
      <th>Total Vol.</th> \\\
      <th>Chg.(24H)</th> \\\
      <th>Chg.(7D)</th> \\\
    </tr> \\\
  </thead> \\\
  <tbody>";

 // open price_result.json and store in price_json
var price_json = fs.readFileSync('./json_data/price_result.json', 'utf8',
		function(err, result){
					for (let i = 0; i < 20; i++) {
					  price_body = price_body + "<tr>";
					  for (let j = 0; j < 7; j++) {
					    price_body = price_body + "<td>"+price_json[i][j]+"</td>";
					  }
					  price_body = price_body + "</tr>";
					}
					price_body = price_body + "</tbody></table>";
					let jsonobj = JSON.parse(result);
					console.log(jsonobj.name);
				});

console.log(price_json[1][0]);

*/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//Korean news
//tokenpost news!
var tokenpost_url = "https://tokenpost.kr/";
//moneytoday news!
var mt_url = "http://news.mt.co.kr/gazua/gazuaList.html";

kr_news_json = {};
jp_news_json = {};

// 11 articles for each languagues
for (i=1; i < 12; i++) {
  new_array = [];
  kr_news_json[i] = new_array;
  jp_news_json[i] = new_array;
  console.log(kr_news_json);
}



request(mt_url, function (err, res, html) {
    if (!err) {
        var $ = cheerio.load(html);
        count = 1; // if count == 7, return false(break)
        $("li > div > strong > a:nth-child(2)").each(function () {
            var data = $(this);

            kr_news_json[count].push(data.text());
            kr_news_json[count].push(data.attr("href"));
            console.log(kr_news_json);
            count++;
            if (count == 8) {
              return false;
            }

        });
    }
});
/*
var steem = require('steem'); // steem api이용을 위해 필요
const INTERVAL = 3 * 1000;

$.get('url', function (response) {
	parseValue(response, function (id) {
		auth(id, function (result) {
			display(result, function (text) {
				console.log(text);
			});
		});
	});
});

function getData(callbackFunc) {
	$.get('url 주소/products/1', function (response) {
		callbackFunc(response);
	});
}

getData(function (tableData) {
	console.log(tableData);
});

function getData(callback) {
	return new Promise(function (resolve, reject) {
		$get.('url 주소/products/1', function(response) {
			resolve(response);
		});
	});
}

getData().then(function (tableData) {
	console.log(tableData);
})

function getData() {
	return new Promise(function (resolve, reject) {
		$.get('url 주소/rpducts/1', function (response) {
			if (response) {
				resolve(response);
			}
			reject(new Error("request is failed"));
		});
	});
}

getData().then(function (data) {
	console.log(data);
}).catch(function (err) {
	console.error(err);
});
*/
