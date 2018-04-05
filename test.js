
/*jshint esversion: 6 */ /* jshint node: true */
// this is just for test. IGNORE THIS.
"use strict";

var steem = require('steem'); // steem api이용을 위해 필요
const INTERVAL = 3 * 1000;

class test {
	constructor() {
		this.one = 1;
	}

	print() {
		console.log(this.one);
	}

	}

var us = new test();

function test_func(test) {
	test.print();
}

test_func(us);
