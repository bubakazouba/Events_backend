var fs = require('fs');
var express = require('express')
var app = express();
var bodyParser = require('body-parser');

var EventHittups = require('./routes/EventHittups');

var mongodb = require('./modules/db');

mongodb.connect('mongodb://Hittup:katyCherry1738@ds055535.mongolab.com:55535/davisevents', function () {
    console.log('Connected to MongoDB.');
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/EventHittups', EventHittups);

PORT = 8080;
var server = app.listen(PORT, function () {
  var port = server.address().port;

  console.log('Magic happens at ' + port);
});
