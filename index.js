var express = require('express');
var data = require('./data/shares.json');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
	var id = random(0, data.length),
		record = data[id],
		email_expires = record.estimated_expires;
	
	record.twitter_key = record.twitter_key || 0;
	record.facebook_key = record.facebook_key || 0;
	record.email_key = record.estimated_key || 0;
	record.email_expires = email_expires;
	
	delete record.estimated_key;
	delete record.estimated_expires;

	record.total = record['twitter_key'] + record['facebook_key'] + record['email_key'];

	res.send(record);	

});

app.post('/sharestats/', function(req, res) {
	var records = [],
		paths = req.body.paths;
	
	_(paths).each(function(path) {
		records.push(_(data).findWhere({path: path}));
	});
	console.log(records);
	res.json(records);
});

app.listen(3000);
