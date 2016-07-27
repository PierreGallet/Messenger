/**
 * Created by Djou on Jeudi 21 Juillet 2016
 *
 * Featuring Alphabet
 *
 **/

var express = require('express');
var app = express();
var config = require('./config');
var mainCtrl = require('./controller/main-controller');
var buttonCtrl = require('./controller/button-controller');

// Use morgan to print logs
var morgan  = require('morgan');
app.use( morgan('combined') );

var request = require('request');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

app.get('/', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === config.verify_token) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);          
    }  
});

app.post('/', function (req, res) {
    var data = req.body;
    // Make sure this is a page subscription
    if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
        var pageID = pageEntry.id;
        var timeOfEvent = pageEntry.time;
        
        // Iterate over each messaging event
        pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.optin) {
            mainCtrl.receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
            mainCtrl.receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
            mainCtrl.receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
            mainCtrl.receivedPostback(messagingEvent);
        } else {
            console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
        });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});

app.listen(config.port, function () {
    console.log('Example app listening on port 8888!');
});
