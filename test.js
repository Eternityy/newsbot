/*jshint esversion: 6 */ /* jshint node: true */
// this is just for test. IGNORE THIS.
"use strict";

var steem = require('steem'); // steem api이용을 위해 필요
const INTERVAL = 3 * 1000

class test {
	constructor() {
	}

	payout() {
	steem.api.getDiscussionsByAuthorBeforeDate('pawngrabberpat', '',
	        '2017-01-01T00:00:00', 1, function(err, result) {
	        	console.log(parseFloat(result[0].pending_payout_value));
	    });
	}
}

var us = new test();

us.payout();
//setInterval(test.test_method, INTERVAL);

steem.api.getAccounts([ACCOUNT_NAME], function(err, result){
	console.log(err, result)
	let sbdReward = result[0].reward_sbd_balance
	let steemReward = result[0].reward_steem_balance
	let steemPowerInVests = result[0].reward_vesting_balance
	steem.broadcast.claimRewardBalance(ACCOUNT_KEY, ACCOUNT_NAME, steemReward, sbdReward, steemPowerInVests, function(err, result) {
		console.log('Reward claimed');
	});
});
