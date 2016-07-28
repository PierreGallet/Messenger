/*
 * Defines all de functions used to parse incoming Jsons and ignite answers.
 */

'use strict';

var config = require('../config');
var request = require('request');
var buttonCtrl = require('./button-controller');
var pythonCtrl = require('./python-controller');


function gettingStarted() {
    var messageData = {
        "setting_type":"call_to_actions",
        "thread_state":"new_thread",
        "call_to_actions":[ { "payload":"getting_started" } ]
    };
    
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: config.access_token },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;

        console.log("Successfully sent Getting Started with id %s to recipient %s", messageId, recipientId);
        } else {
            console.error("Unable to send Getting Started.");
            console.error(response);
            console.error(error);
        }
    });
    
    
}

function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;

    // You may get a text or attachment but not both
    var messageText = message.text;
    var messageAttachments = message.attachments;
    
    if (message.quick_reply) {
        buttonCtrl.payloadAnalyser(event, sendTextMessage);
    } 
    else if (messageText) {

        // If we receive a text message, check to see if it matches any special
        // keywords and send back the corresponding example. Otherwise, just echo
        // the text we received.
        switch (messageText) {
            case 'image':
                sendImageMessage(senderID);
            break;

            case 'button':
                sendButtonMessage(senderID);
            break;

            case 'generic':
                sendGenericMessage(senderID);
            break;

            case 'receipt':
                sendReceiptMessage(senderID);
            break;

            default:
                pythonCtrl.talkToPython(messageText, senderID, sendPythonResponse);
                
        }
    } else if (messageAttachments) {
            sendTextMessage(senderID, "Message with attachment received");
    }
}

function receivedDeliveryConfirmation(messagingEvent) {
    // To be defined
}

function receivedPostback(messagingEvent) {
    // To be defined
}

function receivedAuthentication(messagingEvent) {
    // To be defined
}


var sendPythonResponse = function(type, output, recipientID) {

    if ( type == "text" ) {
        sendTextMessage(recipientID, output);
    }

    else if ( type == "button" ) {
        buttonCtrl.sendProposals(recipientID, output.text, output.proposals);
    }

    else {

    }
}

function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
        id: recipientId
        },
        message: {
        text: messageText
        }
    };
    callSendAPI(messageData);
}

function callSendAPI(messageData) {
    console.log("MESSAGEDATA" + messageData);
    console.log('ACCES TOKEN' + config.access_token);
    request({
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: config.access_token },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;

        console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            //console.error(response);
            console.error(error);
        }
    });  
}

var exports = module.exports = {};

exports.callSendAPI = callSendAPI;
exports.sendTextMessage = sendTextMessage;
exports.receivedDeliveryConfirmation = receivedDeliveryConfirmation;
exports.receivedMessage = receivedMessage;
exports.receivedAuthentication = receivedAuthentication;
exports.receivedPostback = receivedPostback;
exports.gettingStarted = gettingStarted;