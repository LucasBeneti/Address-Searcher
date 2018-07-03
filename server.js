var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");

let app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true})); 

app.get("/", function(req,res){
    
    let dataHeight = '';
    let balance = 0;
    res.render("index", {
        dataHeight: dataHeight,
        balance: balance,
    });
});

app.get("/bitcoin", function(req,res) {
    
    let balance= null;
    let dataHeight = null;
    res.render("bitcoin", {
        dataHeight: dataHeight,
        balance: balance,
    });
});

app.get("/ethereum", function(req,res) {
    res.render("ethereum");
});

app.get("/dogecoin", function(req,res) {
    res.render("dogecoin");
})

// app.post("/", function(req,res){ // se não estiver mostrando nada, verificar add testado

//     let teste = req.body.publicKey;
//     let dataHeight = null;
//     let balance = null;

//     console.log("entrou dentro desse if");
    
//     getDatafromBC(function(data) {
//         dataHeight = data.height;
//         res.render("index", {
//             dataHeight: dataHeight,
//             balance:balance,
//         });
//         console.log(balance);
//         console.log(dataHeight);
//         });

//     getDataFromAddress(function(data){
//         balance = (data.total_received*0.00000001);
//         let pqKey = data.address;
//         res.render("index", {
//             balance:balance,
//             dataHeight:dataHeight,
//         });
//         console.log(balance);
//         console.log(dataHeight);
//     }, teste);

//     console.log(teste);  
// });

app.post("/bitcoin", function(req,res){ // se não estiver mostrando nada, verificar add testado

    let teste = req.body.publicKey;

    // let dataHeight = null;
    // let balance = null;

    // getDatafromBC(function(data) {
    //     dataHeight = data.height;
    //     res.render("bitcoin", {
    //         dataHeight: dataHeight,
    //         balance: balance,
    //     });
    //     console.log(dataHeight);
    //     console.log(balance);
    //   });

    getDataFromAddress(function(data) {
        balance = (data.total_received*0.00000001);
        console.log("entrou na segunda função...");
        
        // let pqKey = data.address;
        res.render("bitcoin", {
            dataHeight: null,
            balance:balance,
        });
        //console.log(dataHeight);
        console.log(balance);
        
    }, teste);
    console.log(teste); // retorna a pubKey utilizada
});

app.listen(8080, function() {
    console.log("Running on PORT 8080...");
});

function getDatafromBC(returnData) { // function to get the data from the api
    //let bla = {};
    request({
      url: "https://api.blockcypher.com/v1/btc/main",
      json: true
    }, function(err, res, body) {
        returnData(body);
    });
    //console.log(bla);
}

function getDataFromAddress(returnAddInfo, pubKey) { //function to get the data from a pubkey
    request({
        url: `https://api.blockcypher.com/v1/btc/main/addrs/${pubKey}/balance`,
        json: true
    }, function(err, res, body) {
        returnAddInfo(body);
    });
}