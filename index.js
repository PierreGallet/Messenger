/**
 * Created by Djou on Jeudi 21 Juillet 2016
 *
 * Featuring Alphabet
 *
 **/

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8888, function () {
  console.log('Example app listening on port 3000!');
});
