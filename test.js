
/*jshint esversion: 6 */ /* jshint node: true */
"use strict";


/****************************************************
*													*
*		this is just for test. IGNORE THIS.			*
*													*
****************************************************/






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

fucntion getData(callback) {
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

var test