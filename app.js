var request = require("request");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static('public'));

function getData(returnData){
  let bla = {};
  request({
    url: "https://api.blockcypher.com/v1/btc/main",
    json: true
  }, function(err, res, body) {
      returnData(body);
  });
  console.log(bla);
}
getData(function(data) {
  let dataHeight = data.height;
  console.log(dataHeight);
  
});
// console.log(getData());