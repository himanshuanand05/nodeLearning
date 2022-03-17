const express = require("express")
const app = express()
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");

const url = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";
const dbName = "getir-case-study";

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

function insertData(params) {x
    MongoClient.connect(url, (err, db)=>{
        if (err) throw err;
        let dbo = db.db(dbName);
        //insert records in collection
        dbo.collection("customers").insertMany(params, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    
    })
}
function createDB() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db(dbName);
        
        dbo.collection("records").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            });
    });
}

app.post('/', function (req, res) {
    res.send('Hello World');
    createDB()
})

app.post('/getData', function (req, res) {
    
})

const app2 = express()

app.listen(3000, () => {
    console.log("Started server on 3000");
});

app2.listen(3002, () => {
    console.log("Started server on 3002");
});

app2.get('/', function (req, res) {
    res.send('Hello World from server 2');
})