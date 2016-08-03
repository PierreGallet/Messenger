/*
 * Defines all de functions used to parse incoming Jsons and ignite answers.
 */

'use strict';

const
    config = require('../config'),
    request = require('request'),
    buttonCtrl = require('./button-controller'),
    pythonCtrl = require('./python-controller');


function gettingStarted() {
    var messageData = {
        setting_type:"call_to_actions",
        thread_state:"new_thread",
        call_to_actions:[
            {
                payload:"getting_started"
            }
        ]
    };
    callSendAPI(messageData)
}

//In receivedMessage, we've made logic to send a message back to the user. The default behavior is to use the fonction talktopython.
function receivedMessage(event, context, num_message) {
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:", senderId, recipientId, timeOfMessage);
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
        // keywords and send back the corresponding example. Otherwise, call the python script
        switch (messageText) {
            case 'aide':
            case 'help':
                sendHelpMessage(senderId);
                break;

            default:
                pythonCtrl.talkToPython(messageText, context, num_message, senderId, sendPythonResponse);
        }
    }
    else if (messageAttachments) {
            sendTextMessage(senderId, "Message with attachment received");
    }
}

function receivedPostback(event, context, num_message) {
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfPostback = event.timestamp;

    // The 'payload' param is a developer-defined field which is set in a postback
    // button for Structured Messages.
    var payload = event.postback.payload;
    console.log(payload)
    if (payload == "payloadOuiGiveInfos") {
        output = "Nous avons enregistré vos informations, et nous avons réglé le problème. Puis-je vous aider autrement?"
        sendTextMessage(senderId, output);
    }
    else if (payload == "payloadNonGiveInfos") {
        output = "Vos informations n'ont pas été enregistrées. Pouvez vous nous les transmettre à nouveau?"
        sendTextMessage(senderId, output);
    }
    else if (payload == "payloadOuiIntent") {
        output = "Pouvez-vous nous donner votre adresse mail et numéro de téléphone afin de poursuivre la résolution de votre problème s'il-vous-plaît?"
        sendTextMessage(senderId, output);
    }
    else if (payload == "payloadNonIntent") {
        output = "Excusez-nous bien, pouvez-vous reformuler votre question s'il-vous-plaît."
        sendTextMessage(senderId, output);
    }
    else if (payload == "getting_started") {
        output = "Bonjour, bienvenue dans le monde de donkey kong"
        sendTextMessage(senderId, ouput);
    }
    else if (payload == "resiliation_sfrpresse") {
        var output = {}
        output.text = "Savez vous que le service SFR presse est gratuit?";
        output.proposals = [{
                "type":"postback",
                "title":"Oui, mais je veux quand même le résilier",
                "payload":"resiliation_sfrpresse2"},
                {"type":"postback",
                 "title":"Alors pourquoi ai-je une augmentation sur ma facture?",
                 "payload":"augmentation_facture"}
            ];
        sendPythonResponse("button", output, senderId)
    }
    else if (payload == "info_sfrpresse") {
        var output = {}
        output.text = "SFR presse est un service de merde qui me fait chier à longueur de journée. Cette explication vous convient-elle?";
        output.proposals = [{
                "type":"postback",
                "title":"Oui, mais je veux quand même résilier ce service",
                "payload":"resiliation_sfrpresse2"},
                {"type":"postback",
                 "title":"Non, j'ai besoin de plus d'informations",
                 "payload":"info_sfrpresse2"}
            ];
        sendPythonResponse("button", output, senderId)
    }
    else if (payload == "resiliation_sfrpresse2") {
        output = "Très bien. J'aurais besoin de votre numéro de téléphone et de votre email s'il vous plait."
        sendTextMessage(senderId, output);
    }
    else if (payload == "info_sfrpresse2") {
        output = "Je vous renvoie vers la documentation : aller/vous/faire/foutre.html"
        sendTextMessage(senderId, output);
    }
    else if (payload == "augmentation_facture") {
        var output = {}
        output.text = "Ce n'est pas du à SFR presse, mais à l'augmentation tarifaire de votre forfait mobile.";
        output.proposals = [{
                "type":"postback",
                "title":"Je trouve ça inacceptable",
                "payload":"proposition_forfait"},
                {"type":"postback",
                 "title":"Je comprends. Je veux quand même résilier SFR presse.",
                 "payload":"resiliation_sfrpresse2"}
            ];
        sendPythonResponse("button", output, senderId)
    }
    else if (payload == "proposition_forfait") {
        var output = {}
        output.text = "Je vois. Vous êtes enervé. Il ne faut pas s'en faire, car chez SFR, nous avons toujours une solution qui vous convient. Je vous propose de changer de forfait, laquelle des deux propositions suivantes vous ferait plaisir?";
        output.proposals = [{
                "type":"postback",
                "title":"Red 3h d'appel, 500 Mo, SMS/MMS illimités à 4,99€/mois",
                "payload":"new_forfait"},
                {"type":"postback",
                 "title":"Red illimité, 500 Mo, SMS/MMS illimités à 12,99€/mois",
                 "payload":"new_forfait"}
            ];
        sendPythonResponse("button", output, senderId)
    }
    else if (payload == "new_forfait") {
        output = "C'est entendu, j'aurais besoin de votre numéro de téléphone et de votre email s'il vous plait."
        sendTextMessage(senderId, output);
    }
    else {
        // Message d'erreur pour payload non connu
        sendTextMessage(senderId, "DEV ERROR : question non encore implémentée ou payload non reconnu.");
    }

    if (output.text){
        context['reponses'][num_message] = output.text
    }
    else {
        context['reponses'][num_message] = output
    }
}


// on définit la callback de la fonction talkToPython, qui est configurée dans python-controller
var sendPythonResponse = function(type, output, recipientID) {

    if (type == "text") {
        sendTextMessage(recipientID, output);
    }
    else if (type == "button") {
        sendButtonMessage(recipientID, output.text, output.proposals);
    }
    else if (type == "quick_reply") {
        sendQuickReply(recipientID, output.text, output.proposals)
    }
}

// the functions below are parsing the messageText / proposals / recipientId in the right format for the send API.
function sendHelpMessage(recipientId) {
    var messageData = {
        recipient: {
        id: recipientId
        },
        message: {
        text: "vous pouvez me posez des questions pièges, n'hésitez pas."
        }
    };
    callSendAPI(messageData);
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

function sendButtonMessage(recipientId, messageText, proposals) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: messageText,
                    buttons: proposals
                }
            }
        }
    };
    callSendAPI(messageData)
}

function sendQuickReply(recipientId, messageText, proposals) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText,
            quick_replies: proposals
        }
    };
    callSendAPI(messageData)
}

// callSendAPI calls the Send API and effectively send the message through messenger.
function callSendAPI(messageData) {
    console.log(messageData);

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
            console.error(response);
            console.error(error);
        }
    });
}


var exports = module.exports = {};

exports.callSendAPI = callSendAPI;

exports.sendTextMessage = sendTextMessage;
exports.sendButtonMessage = sendTextMessage;
exports.sendQuickReply = sendTextMessage;

exports.receivedMessage = receivedMessage;
exports.receivedPostback = receivedPostback;

exports.gettingStarted = gettingStarted;
