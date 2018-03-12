/*
var request = require("request");
var url = "https://dobest.io/";

request(url, function(error, response, body) {
  if (error) throw error;
    console.log(body);
  });
*/

/*jshint esversion: 6 */

var request = require("request");

fetch('').then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Request failed!');
}, networkError => console.log(networkError.message)
).then(jsonResponse => {
  //code to execute
});
