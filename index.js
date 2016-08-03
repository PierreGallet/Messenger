/**
 * Created by Djou on Jeudi 21 Juillet 2016
 *
 * Featuring Alphabet
 *
 **/

const
    express = require('express'),
    app = express(),
    config = require('./config'),
    mainCtrl = require('./controller/main-controller'),
    buttonCtrl = require('./controller/button-controller');

// Use morgan to print logs
var morgan  = require('morgan');
app.use( morgan('combined') );

var request = require('request');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// this variable will store the context for each senderId
const context = {};
const num_message = {};

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
            if (!messagingEvent.message && !messagingEvent.postback && !messagingEvent.delivery){
                console.log("Webhook received unknown messagingEvent: ", messagingEvent);
            }
            else if (messagingEvent.delivery){
                console.log("User has received our message")
            }
            else{
                // console.log('context avant:', context)
                if (!context[messagingEvent.sender.id]){
                    context[messagingEvent.sender.id] = {}
                    context[messagingEvent.sender.id]['reponses'] = {}
                    num_message[messagingEvent.sender.id] = 0;
                }
                else {
                    num_message[messagingEvent.sender.id] += 1
                }
                // console.log('context apres:', context)
                console.log('message n°:', num_message[messagingEvent.sender.id])

                if (messagingEvent.message) {
                    mainCtrl.receivedMessage(messagingEvent, context[messagingEvent.sender.id], num_message[messagingEvent.sender.id]);
                }
                else if (messagingEvent.postback) {
                    mainCtrl.receivedPostback(messagingEvent,  context[messagingEvent.sender.id], num_message[messagingEvent.sender.id]);
                }

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


// Start server
// Webhooks must be available via SSL with a certificate signed by a valid
// certificate authority.
app.listen(config.port, function () {
    console.log('Example app listening on port 8888!');
});

module.exports = app;
