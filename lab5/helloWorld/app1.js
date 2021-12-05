// No use of any template system
var express = require('express'),
    logger = require('morgan'),
    fs = require("fs"),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://localhost:27017/";

var app = express();
var x = 1;
var y = 2;

function readJson(filepath) {
    var file = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(file);
}

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {     // The first route
    res.send(`<h1>Hello World!</h1>
    <h2>${x} + ${y} = ${x + y}</h2>`); // Send a response to the browser
});

app.get('/json/:name', function (req, res) {  
    var filepath = "./" + req.params.name;
    var json = readJson(filepath);

    var table = `<table style="width:100%">
    <tr>
        <th>x</th>
        <th>Operation</th>
        <th>y</th>
        <th>Result</th>
    </tr>`;

    for (var i = 0; i < json.length; i++) {
        switch (json[i].operation) {
            case "addition":
                json[i].result = parseFloat(json[i].x) + parseFloat(json[i].y);
                break;
            case "subtraction":
                json[i].result = parseFloat(json[i].x) - parseFloat(json[i].y);
                break;
            case "division":
                json[i].result = parseFloat(json[i].x) / parseFloat(json[i].y);
                break;
            case "multiplication":
                json[i].result = parseFloat(json[i].x) * parseFloat(json[i].y);
                break;
            default:
                throw new Error("Unknown operation!");
                break;
        }
        table += `<tr>
            <th>${json[i].x}</th>
            <th>${json[i].operation}</th>
            <th>${json[i].y}</th>
            <th>${json[i].result}</th>
        </tr>`
    }   

    res.send('<h1>Operations</h1>' + table + '</table>');
});

app.get('/calculate/:operation/:x/:y', (req, res) => {
    var result,
        x = parseFloat(req.params.x),
        y = parseFloat(req.params.y),
        operation = req.params.operation;

    switch(operation) {
        case "multiplication":
            result = x * y;
            operation = "*";
            break;
        case "addition":
            result = x + y;
            operation = "+";
            break;
        case "subtraction":
            result = x - y;
            operation = "-";
            break;
        case "division":
            result = x / y;
            operation = "/";
            break;
        default:
            throw new Error("Unknown operation!");
    }

    res.send(`<h1>Calculation:</h1>
    <h2>${x} ${operation} ${y} = ${result}</h2>`);

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        const dbo = db.db("testbase");
        dbo.collection('operations').insertOne({ x: x, operation: operation, y: y, result: result}, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        })
    });
});

app.get('/results', (req, res) => {
    var table = `<table style="width:100%">
    <tr>
        <th>x</th>
        <th>Operation</th>
        <th>y</th>
        <th>Result</th>
    </tr>`;

    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        const dbo = db.db('testbase');
        if (err) throw err;
        dbo.collection('operations').find({}).toArray(function(err, docs) {
            if (err) throw err;
            
            for (var i = 0; i < docs.length; i++) {
                table += `<tr>
                    <th>${docs[i].x}</th>
                    <th>${docs[i].operation}</th>
                    <th>${docs[i].y}</th>
                    <th>${docs[i].result}</th>
                </tr>`
            }

            res.send('<h1>Operations</h1>' + table + '</table>');
            db.close();
        });
    });
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});

module.exports.app = app;