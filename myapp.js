
/*jshint esversion: 6 */
/* jshint node: true */
"use strict";

var steem = require('steem'); // steem api이용을 위해 필요
var config = require('./config.json'); // 계정들의 비밀번호를 저장할 json file
// 계정 비밀번호를 저장한 config 파일 같은 경우, 반드시 로컬영역에만 저장되어야!
// 형식은 {"us": '****', "kr" : '****', ... }이런 식으로 저장
var fs = require('fs');
// interface for posting info. Description about indicators & news.


// investing.com 에서 가져온 가격 정보를 fs 모듈로 불러오기 (상위 20개)
// 현재 가격 정보는 크롤링은 만들어 놨음.(crawl.py -> price_result.json)
let price_body = {};

// tradingview.com 에서 가져온 Ocillators, pivot 등을 fs 모듈로 불러오기
// 에시 : Relative_Strength : {"72.3", "sell"}, Stochastic : {"3.9", "sell"}..
// 투자 지표 정보는 차후 크롤링할 예정.
// 지표 설명도 같이 넣어서, body에 합쳐서 넣을 수 있도록 만들기.
let trade_body = {};

// 게시글에 첨부할 지표 설명 + 뉴스 제목/앞부분 내용 (언어별로 정리)
// 포스팅 내용도 news.json 파일에 저장해서 불러오기
let news_body = {};

// 위의 price, tade, news body 전부 합쳐서 하나의 body를 만들자. (언어별로)
let post_body = {};

// 제목 뒤에 넣을 날짜 [04-02-2018] 이런식으로...
// 게시글 링크가 겹칠 수 있으므로, 게시글 뒤에 날짜를 붙여주려고 함.
var today = new Date();
var dd = today.getDate(); var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
dd = dd < 10 ? dd = '0'+dd : dd;  mm = mm < 10 ? mm = '0'+mm : mm;
var date = '['+mm+'-'+dd+'-'+yyyy+']';

// assign values depending on languages
// node js로 구현할 기능 : 포스팅, SBD 전송, 보상 받기(reward claim)
// 충분한 보상이 들어오지 않았을 경우, 부족분만큼 다시 SBD 전송.
// Class : 계정 정보 (비밀번호, 계정 명 등) + 포스팅/내 글검색/스달전송/보상받기-method
class Account_info {
  constructor(_wif, _name, _title, _body) {
    this.wif = _wif; // 계정의 비밀번호 (액티브 키)
    this.parentAuthor = ''; // 포스팅할 때 필요없음
    this.parentPermlink = _name; // 그냥 첫번째 태그
    this.author = _name; // 유저의 아이디 (계정명)
     // 포스팅의 고유 주소. steem.js에서 제공하는 함수사용.
    this.permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g,'').toLowerCase();
    this.title = _title; //'Daily Cryptocurrency Report' 이런 식으로 넣으면 됨.
    this.body = _body; // 포스팅에 들어갈 본문 내용
    this.jsonMetadata = {"tags" : [_name]}; // 무시해도 됨.
    this.votebot = 'smartmarket'; // 보팅 봇 계정, (instant vote)
    this.link = ''; // 보팅 봇에 송금할 떄, 메모로 글 링크 첨부해야 함.
    this.current_reward = 0; // 현재 보상의 양. 15이하면 소량으로 다시 보팅 봇이용.
    this.vote_loop = 0; // 보팅봇에 sbd 보낸 횟수! 포스팅 후 30분 이내만 보팅이 100%저자보상!
  }
// 링크 예시 : https://steemit.com/parentPermlink/@author/permlink
// 포스팅을 하는
  post() {
    steem.broadcast.comment(this.wif, this.parentAuthor,this.parentPermlink,
       this.author, this.permlink, this.title, this.body,
       this.jsonMetadata, function(err, result) {
              //console.log(err, result);
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
    steem.broadcast.transfer(this.wif, this.author, this.votebot, sbd,
       this.link, function(err,result){
         setInterval(this.reward_check(), 420*1000);
        //console.log(err,result);
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

}


// class 에서 주어진 method를 우선순위대로 처리하는 fucntion. (비동기 처리 추가?)
function post_and_vote(_Account_info) {
  _Account_info.post();
  _Account_info.set_link();
  setInterval(_Account_info.send(8), 3*1000);
  _Account_info.reward_claim();
}


// 아래는 예시. 그냥 생성해봄
var us_crypto = new Account_info(config.us, 'us_cryptonews',
'Daily Cryptocurrency Report!'+ date, post_body.us);
var kr_crypto = new Account_info(config.kr, 'kr_cryptonews',
 '데일리 암호화폐 리포트입니다!'+ date, post_body.kr);

// 실제 실행하면, 끝
post_and_vote(us_crypto);
post_and_vote(kr_crypto);


/* steem-nodejs api는 아래 문서를 참고해 주세요.
 https://github.com/steemit/steem-js/tree/master/doc#api  */
