var express = require('express');
var data = require('./data/shares.json');
var app = express();

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('*', function(req, res) {
	var record = random(0, data.length);
	res.send(data[record]);
});

app.listen(3000);