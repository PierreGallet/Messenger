/**
 * Created by Djou on Jeudi 21 Juillet 2016
 *
 * Featuring Alphabet
 *
 **/

var express = require('express');
var app = express();

/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

app.get('/', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === "this_is_the_token") {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

app.listen(8888, function () {
  console.log('Example app listening on port 8888!');
});
