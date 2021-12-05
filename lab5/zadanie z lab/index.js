var express = require('express'),
    logger = require('morgan'),
    request = require("request"),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://localhost:27017/";
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    request.get("http://komunikaty.tvp.pl/wojewodztwa?_format=json", (error, response, body) => {
        if (error) throw error;
        let voivodeships = JSON.parse(body);

        res.render('index', {
            'voivodeships': voivodeships.provinces
        });
    }); 
});

app.post('/', function (req, res) {
    const voivodeship = req.body.voivodeship;

    request.get(`https://komunikaty.tvp.pl/komunikatyxml/${req.body.voivodeship}/wszystkie/0?_format=json`, (error, response, body) => {
        if (error) throw error;
        let communications = JSON.parse(body).newses;

        res.render('communicationsList', {
            'communicationslist': communications,
            'msg': 'Communications list for ' + voivodeship + ' voivodeship'
        });
    });
});

app.get('/addToDb/:wojewodztwo/:kategoria', function (req, res) {
    const voivodeship = req.params.wojewodztwo;
    const category = req.params.kategoria;
    request.get(`https://komunikaty.tvp.pl/komunikatyxml/${voivodeship}/${category}/0?_format=json`, (error, response, body) => {
        if (error) throw error;
        let communications = JSON.parse(body).newses;
        MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            const dbo = db.db("testbase2");
            for (var i = 0; i < communications.length; i++) {
                if (communications[i].title != null && communications[i].content != null) {
                    dbo.collection('newses').insertOne(communications[i], function(err, res) {
                        if (err) throw err;
                    })
                }
            }

            dbo.collection('newses').find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.render('communicationsList', {
                    'communicationslist': docs,
                    'msg': 'All info saved to database'
                });
                db.close();
            });
        });
    });
});

app.listen(3000, function () {
    console.log('The application is available on port 3000');
});

module.exports.app = app;