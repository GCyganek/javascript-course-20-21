// Application using the 'Pug' template system
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

// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {      // The first route
    res.render('index', { x: x, y: y, result: x + y, pretty:true}); // Render the 'index' view in 'pretty' mode — the resulting HTML code will be indented — the 'pretty' option has the 'deprecated' status — in the future it will not be supported
    //res.render('index '); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
});

app.get('/json/:name', (req, res) => {
    var filepath = "./" + req.params.name;
    var json = readJson(filepath);
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
        }
    }

    res.render('operationsList', {
        'operationslist': json
    });
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

    res.render('calculate', { x: x, operation: operation, y: y, result: result, pretty:true});

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
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        const dbo = db.db('testbase');
        if (err) throw err;
        dbo.collection('operations').find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.render('operationsList', {
                'operationslist': docs
            });
            db.close();
        });
    });
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});

module.exports.app = app;