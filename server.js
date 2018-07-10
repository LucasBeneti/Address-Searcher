var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");

let app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/teoriaBlockchain", function(req,res) {
  res.render("teoriaBlockchain");
});

/////////////////////////////////////////HOME/////////////////////////////////////////////
app.get("/", function(req, res) {
  let dataHeight = "";
  let balance = 0;
  let address = null;
  res.render("index", {
    dataHeight: dataHeight,
    balance: balance,
    address: address
  });
});

app.post("/", function(req, res) {
  // se não estiver mostrando nada, verificar add testado

  let pubKey = req.body.publicKey;
  // let dataHeight = null;
  let total_received = null;
  let address = null;
  let total_sent = null;
  let final_balance = null;
  let final_n_tx = null;

  getDataFromBTCAddress(function(data) {
    address = data.address;
    total_received = data.total_received * 0.00000001;
    final_balance = data.final_balance * 0.00000001;
    total_sent = data.total_sent * 0.00000001;
    final_n_tx = data.final_n_tx;

    res.render("index", {
      final_balance: final_balance,
      address: address
    });
  }, pubKey); //variavel teste usada pra pegar a pubkey inserida
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

  getDataFromBTCAddress(function(data) {
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
  }, pubKey);
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

  getDataFromETHAddress(function(data) {
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
  }, pubKey);
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

  getDataFromDOGEAddress(function(data) {
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
  }, pubKey);
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

  getDataFromDashAddress(function(data) {
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
  }, pubKey);
});
///////////////////////////////////////////////////////////////////////////////////////////

app.listen(8080, function() {
  console.log("Running on PORT 8080...");
});

function getDataFromBTCAddress(returnAddrInfo, pubKey) {
  request(
    {
      url: `https://api.blockcypher.com/v1/btc/main/addrs/${pubKey}/balance`,
      json: true
    },
    function(err, res, body) {
      returnAddrInfo(body);
    }
  );
}

function getDataFromETHAddress(returnAddrInfo, pubkey) {
  request(
    {
      url: `https://api.blockcypher.com/v1/eth/main/addrs/${pubkey}/balance`,
      json: true
    },
    function(err, res, body) {
      returnAddrInfo(body);
    }
  );
}

function getDataFromDOGEAddress(returnAddrInfo, pubkey) {
  request(
    {
      url: `https://api.blockcypher.com/v1/doge/main/addrs/${pubkey}/balance`,
      json: true
    },
    function(err, res, body) {
      returnAddrInfo(body);
    }
  );
}

function getDataFromDashAddress(returnAddrInfo, pubkey) {
  request(
    {
      url: `https://api.blockcypher.com/v1/dash/main/addrs/${pubkey}/balance`,
      json: true
    },
    function(err, res, body) {
      returnAddrInfo(body);
    }
  );
}