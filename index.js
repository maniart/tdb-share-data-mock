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
	var id = random(0, data.length),
		record = data[id],
		email_expires = record.estimated_expires;
	
	record.twitter_key = record.twitter_key || 0;
	record.facebook_key = record.facebook_key || 0;
	record.email_key = record.estimated_key || 0;
	record.email_expires = email_expires;
	
	delete record.estimated_key;
	delete record.estimated_expires;

	var total = record.total = record['twitter_key'] + record['facebook_key'] + record['email_key'];

	record.facebook_percentage = record.facebook_key / total * 100 || 0;
	record.twitter_percentage = record.twitter_key / total * 100 || 0;
	record.email_percentage = record.email_key / total * 100 || 0;
	//console.log('-----------------------------------------------------------------------------------------------------------------------------------------------\n', record);
	res.send(record);

});

app.listen(3000);