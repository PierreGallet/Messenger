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
    request = require('request');

// Use morgan to print logs
var morgan  = require('morgan');
app.use( morgan('combined') );

var request = require('request');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// this variable will store the context for each senderId
var context = {};
var num_message = {};

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var reset = function(senderID) {
    context[senderID] = {};
    context[senderID].reponses = {};
    num_message[senderID] = -1;
};

app.use(express.static(__dirname + '/public'));

// app.get('/assets', function(req, res){
//     res.send('Hello World!');
//     console.log(req);
//     console.log(res);
// });

app.get('/webhook', function(req, res) {
    console.log('request:', req);
    console.log('resultat:', res);
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

app.post('/webhook', function (req, res) {
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
                console.log("User has received our message");
            }
            else{
                // console.log('context avant:', context)
                if (!context[messagingEvent.sender.id]){
                    context[messagingEvent.sender.id] = {};
                    context[messagingEvent.sender.id].reponses = {};
                    num_message[messagingEvent.sender.id] = 0;
                }
                else {
                    num_message[messagingEvent.sender.id] += 1;
                }
                // console.log('context apres:', context)
                console.log('__________________________________________ message n°:', num_message[messagingEvent.sender.id], ' _____________________________________________');

                get_user_profile(context, num_message, messagingEvent, receivedCallback);


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

function get_user_profile(context, num_message, messagingEvent, receivedCallback){
    if (!context[messagingEvent.sender.id].first_name || typeof context[messagingEvent.sender.id].first_name === 'undefined'){
        var url_user_info = 'https://graph.facebook.com/v2.6/'+messagingEvent.sender.id+'?access_token='+config.FB_PAGE_TOKEN;
        request.get(url_user_info, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            context[messagingEvent.sender.id].first_name = JSON.parse(body).first_name;
            context[messagingEvent.sender.id].last_name = JSON.parse(body).last_name;
            receivedCallback(messagingEvent);
            }
            else {
                console.error(response);
                console.error(error);
            }
        });
    }
    else {
        receivedCallback(messagingEvent);
    }
}
function receivedCallback(messagingEvent){
    if (messagingEvent.message) {
        mainCtrl.receivedMessage(messagingEvent, context[messagingEvent.sender.id], num_message[messagingEvent.sender.id], reset);
    }
    else if (messagingEvent.postback) {
        mainCtrl.receivedPostback(messagingEvent,  context[messagingEvent.sender.id], num_message[messagingEvent.sender.id]);
    }
}

// Start server
// Webhooks must be available via SSL with a certificate signed by a valid
// certificate authority.
app.listen(config.port || process.env.PORT, function () {
    console.log('Example app listening on port 8888!');
});

// module.exports = app;

var exports = module.exports = {};
exports.reset = reset;
