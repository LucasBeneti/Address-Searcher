var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");

let app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/styles'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/teoriaBlockchain", function(req,res) {
  res.render("teoriaBlockchain");
});

/////////////////////////////////////////HOME/////////////////////////////////////////////
app.get("/", function(req, res) { // only needs the get function
  
  res.render("index");
});

/////////////////////////////////////////BITCOIN//////////////////////////////////////////
app.get("/bitcoin", function(req, res) {
  let total_received = null;
  let address = null;
  let total_sent = null;
  let final_balance = null;
  let final_n_tx = null;

  res.render("bitcoin", {
    final_balance,
    address,
    total_received,
    total_sent,
    final_n_tx
  });
});

app.post("/bitcoin", function(req, res) {
  // se não estiver mostrando nada, verificar add testado

  let pubKey = req.body.publicKey;

  getDataFromBlockchainAddress(function(data) {
    final_balance = data.final_balance * 0.00000001;
    address = data.address;
    total_received = data.total_received * 0.00000001;
    total_sent = data.total_sent * 0.00000001;
    final_n_tx = data.final_n_tx;

    res.render("bitcoin", {
      final_balance,
      address,
      total_received,
      total_sent,
      final_n_tx
    });
  }, "btc", pubKey);
});
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////ETHEREUM//////////////////////////////////////////
app.get("/ethereum", function(req, res) {
  let total_received = null;
  let address = null;
  let total_sent = null;
  let final_balance = null;
  let final_n_tx = null;

  res.render("ethereum", {
    final_balance,
    address,
    total_received,
    total_sent,
    final_n_tx
  });
});

app.post("/ethereum", function(req, res) {
  let pubKey = req.body.publicKey;

  getDataFromBlockchainAddress(function(data) {
    final_balance = data.final_balance * 0.000000000000000001;
    address = data.address;
    total_received = data.total_received * 0.000000000000000001;
    total_sent = data.total_sent * 0.000000000000000001;
    final_n_tx = data.final_n_tx;

    res.render("ethereum", {
      final_balance,
      address,
      total_received,
      total_sent,
      final_n_tx
    });
  }, "eth",pubKey);
});

///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////DOGECOIN//////////////////////////////////////////

app.get("/dogecoin", function(req, res) {
  let total_received = null;
  let address = null;
  let total_sent = null;
  let final_balance = null;
  let final_n_tx = null;

  res.render("dogecoin", {
    final_balance,
    address,
    total_received,
    total_sent,
    final_n_tx
  });
});

app.post("/dogecoin", function(req, res) {
  let pubKey = req.body.publicKey;

  getDataFromBlockchainAddress(function(data) {
    final_balance = data.final_balance * 0.00000001;
    address = data.address;
    total_received = data.total_received * 0.00000001;
    total_sent = data.total_sent * 0.00000001;
    final_n_tx = data.final_n_tx;

    res.render("dogecoin", {
      final_balance,
      address,
      total_received,
      total_sent,
      final_n_tx
    });
  }, "doge", pubKey);
});

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////DASH////////////////////////////////////////////

app.get("/dash", function(req, res) {
  let total_received = null;
  let address = null;
  let total_sent = null;
  let final_balance = null;
  let final_n_tx = null;

  res.render("dash", {
    final_balance,
    address,
    total_received,
    total_sent,
    final_n_tx
  });
});

app.post("/dash", function(req, res) {
  let pubKey = req.body.publicKey;

  getDataFromBlockchainAddress(function(data) {
    final_balance = data.final_balance*0.00000001;
    address = data.address;
    total_received = data.total_received*0.00000001;
    total_sent = data.total_sent*0.00000001;
    final_n_tx = data.final_n_tx;

    res.render("dash", {
      final_balance,
      address,
      total_received,
      total_sent,
      final_n_tx
    });
  }, "dash", pubKey);
});
///////////////////////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
  console.log("Running on PORT 8080...");
});

function getDataFromBlockchainAddress(returnAddrInfo, chain, pubKey) { // function that requires the chain and the pubky for that chain from the user
  request(
    {
      url: `https://api.blockcypher.com/v1/${chain}/main/addrs/${pubKey}/balance`,
      json: true
    },
    function(err, res,body){
      returnAddrInfo(body);
    }
  );
}