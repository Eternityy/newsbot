var request = require("request");
var cheerio = require("cheerio");
var url = "https://ansuchan.com/";

// list of investment indices...




request(url, function(error, response, body) {
  if (error) throw error;

  var $ = cheerio.load(body);

  var postElements = $("section.posts article.post");


  // post element value iteration
  // be careful what attribute you put in find() and attr()
  postElements.each(function() {
    var postTitle = $(this).find("h1").text();
    var postUrl = $(this).find("h1 a").attr("href");
    console.log(postTitle);
    console.log(postUrl);

    // code which can store values using call back function.
    // to each indecies...
  });

});
