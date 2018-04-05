
/*jshint esversion: 6 */ /* jshint node: true */
// this is just for test. IGNORE THIS.
"use strict";

var steem = require('steem'); // steem api이용을 위해 필요
const INTERVAL = 3 * 1000;


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

// catch()로 오류를 감지하는 코드
function getData() {
  return new Promise(function (resolve, reject) {
    resolve('hi');
  });
}

getData().then(function (result) {
  console.log(result); // hi
  throw new Error("Error in then()");
}).catch(function (err) {
  console.log('then error : ', err); // then error :  Error: Error in then()
});


var test

  post() {
  	return new Promise(function (resolve, reject) {
	    steem.broadcast.comment(this.wif, this.parentAuthor,this.parentPermlink,
	       this.author, this.permlink, this.title, this.body,
	       this.jsonMetadata, function(err, result) {
	       		resolve(result);
	    });
  	});
 }

// 보팅 봇에 SBD를 보내기 위해 글의 link가 필요함
   set_link() {
       this.link = `https://steemit.com/${this.parentPermlink}
                    /@${this.author}/${this.permlink}`;
   }

// 보팅 봇에 SBD 보내기. memo로 link를 첨부해야 하므로, set_link method를 미리 실행!
// 8 이라는 숫자는 // 전송할 SBD의 양. 기본 8로 설정하기.
  send(sbd) {
  	return new Promise(function (resolve, reject) {
	    steem.broadcast.transfer(this.wif, this.author, this.votebot, sbd,
	       				this.link, function(err,result){
	       	resolve(result);
	         setInterval(this.reward_check(), 420*1000);
  	});
  });
}

// 내가 방금 올린 글의 보상 확인하기 - 1개만! (예 : 15 이하이면 좀 더 보내기)
// 보상을 확인하면서 글의 링크를 저장해야 함! (스달 전송시, 메모에 첨부해야 함)
// 공백, 날짜는 그냥 무시. 숫자 1은 최근 게시글 1개를 검색한다는 뜻임.
// 보상이 10보다 적게 들어오면, SBD를 한 번 더 보낸다. (7분 후에 실행해야 함)
// 이유 : 보팅 봇이 보상을 찍어주는데 길게는 총 5-6분이 걸림.
  reward_check() {
    steem.api.getDiscussionsByAuthorBeforeDate(this.author, '',
        '2017-01-01T00:00:00', 1, function(err, result) {
          this.current_reward = parseFloat(result[0].pending_payout_value);
          if ((20 - this.current_reward)>10 && this.vote_loop < 3) {
            this.send((10-this.current_reward)*1.5);
            this.vote_loop++;
          }
          //console.log(err, result);
    });
  }

// 보상 자동으로 받기
  reward_claim() {
    steem.api.getAccounts([this.author], function(err, result){
    	let sbdReward = result[0].reward_sbd_balance
    	let steemReward = result[0].reward_steem_balance
    	let steemPowerInVests = result[0].reward_vesting_balance
    	steem.broadcast.claimRewardBalance(this.wif, this.author, steemReward,
                sbdReward, steemPowerInVests, function(err, result) {
    		        console.log('Reward claimed');
    	});
    });
  }
