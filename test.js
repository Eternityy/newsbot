
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

news = { '1':
   [ '仮想通貨ニュース週間まとめ｜4月15日〜21日',
     'https://bittimes.net/news/11289.html' ],
  '2':
   [ 'マルタブロックチェーンサミット2018とは？',
     'https://bittimes.net/news/11280.html' ],
  '3':
   [ '仮想通貨取引アプリRobinhoodがコロラド州に進出',
     'https://bittimes.net/news/11270.html' ],
  '4':
   [ 'バハマがブロックチェーン大国に名乗りをあげる｜海洋考古学を民主化へ',
     'https://bittimes.net/news/11260.html' ],
  '5':
   [ 'アマゾン（AWS）がブロックチェーンフレームワークをリリース',
     'https://bittimes.net/news/11232.html' ],
  '6':
   [ 'イーサリアムは証券となり得るか｜米証券取引委員会（SEC）',
     'https://bittimes.net/news/11225.html' ],
  '7':
   [ 'IOTAを活用した電気自動車充電ステーションをリリース｜オランダ',
     'https://bittimes.net/news/11211.html' ],
  '8':
   [ 'SBIがアプリ「My仮想通貨」をリリース！使い方・設定の解説',
     'https://bittimes.net/news/11188.html' ],
  '9':
   [ '仮想通貨取引所Huobi（フオビ）はイギリスのロンドンへ進出',
     'https://bittimes.net/news/11183.html' ],
  '10':
   [ 'ネム（NEM/XEM）の高騰に期待が集まる理由',
     'https://bittimes.net/news/11169.html' ] };

   for (var article in news) {
     console.log("- " + article[0] + "<br>" +
     "- **&#128279;** " + article[1]);
   }

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
