/*
 * Defines all de functions used to parse incoming Jsons and ignite answers.
 */

// 'use strict';

const
    config = require('../config'),
    request = require('request'),
    buttonCtrl = require('./button-controller'),
    pythonCtrl = require('./python-controller');


function gettingStarted() {
    var messageData = {
        "setting_type":"call_to_actions",
        "thread_state":"new_thread",
        "call_to_actions":[
            {
                "payload":"0"
            }
        ]
    };
    callSendAPI(messageData);
}

function greetingText(){
    var messageData = {
          "setting_type":"greeting",
          "greeting":{
            "text":"Welcome to My Company!"
          }
    };
    callSendAPI(messageData);
}


//In receivedMessage, we've made logic to send a message back to the user. The default behavior is to use the fonction talktopython.
function receivedMessage(event, context, num_message, reset) {
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
        buttonCtrl.payloadAnalyser(event, sendCallback);
    }

    else if (messageText) {

        // If we receive a text message, check to see if it matches any special
        // keywords and send back the corresponding example. Otherwise, call the python script
        switch (messageText) {
            case 'aide':
            case 'help':
                sendHelpMessage(senderId);
                break;
            case 'bonjour':
            var output = {};
                output.text = "Vous êtes client...";
                output.proposals = [
                    {"content_type":"text",
                    "title":"Forfait Mobile",
                    "payload":"0_0"},
                    {"content_type":"text",
                    "title":"Fibre, Box",
                    "payload":"0_1"},
                    {"content_type":"text",
                    "title":"Pas encore Client",
                    "payload":"0_2"}
                ];
                sendCallback("quick_reply", output, senderId);
                break;

            default:
                pythonCtrl.talkToPython(messageText, context, num_message, senderId, sendCallback, reset);
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
    console.log(payload);
    var output = '';
    if (payload == "payloadOuiGiveInfos") {
        output = "Nous avons enregistré vos informations, et nous avons réglé le problème. Puis-je vous aider autrement?";
        sendTextMessage(senderId, output);
    }
    else if (payload == "payloadNonGiveInfos") {
        output = "Vos informations n'ont pas été enregistrées. Pouvez vous nous les transmettre à nouveau?";
        sendTextMessage(senderId, output);
    }
    else if (payload == "payloadOuiIntent") {
        output = "Pouvez-vous nous donner votre adresse mail et numéro de téléphone afin de poursuivre la résolution de votre problème s'il-vous-plaît?";
        sendTextMessage(senderId, output);
    }
    else if (payload == "payloadNonIntent") {
        output = "Excusez-nous bien, pouvez-vous reformuler votre question s'il-vous-plaît.";
        sendTextMessage(senderId, output);
    }
    else if (payload == "new_forfait") {
        output = "Parfait, afin de vérifier votre identité, pouvez vous nous transmettre votre numero de téléphone et votre email?";
        sendTextMessage(senderId, output);
    }
    else if (payload == "0") {
       var output = {};
       output.text = "Vous êtes client...";
       output.proposals = [
           {"content_type":"text",
           "title":"Forfait Mobile",
           "payload":"Forfait Mobile"},
           {"content_type":"text",
           "title":"Fibre, Box",
           "payload":"Fibre, Box"},
           {"content_type":"text",
           "title":"Pas encore Client",
           "payload":"Pas encore Client"}
       ];
       sendQuickReply(senderId, output.text, output.proposals);
    }
    else {
        // Message d'erreur pour payload non connu
        sendTextMessage(senderId, "~~~~DEV ERROR~~~~        in main-controller\n question non encore implémentée ou payload non reconnu");
    }

    // on enregistre les reponses
    if (output.text){
        context.reponses[num_message] = output.text;
    }
    else {
        context.reponses[num_message] = output;
    }
}




// on définit la callback de la fonction talkToPython, qui est configurée dans python-controller
var sendCallback = function(type, output, senderId) {

    if (type == "text") {
        sendTextMessage(senderId, output);
    }
    else if (type == "button") {
        sendButtonMessage(senderId, output.text, output.proposals);
    }
    else if (type == "quick_reply") {
        sendQuickReply(senderId, output.text, output.proposals);
    }
    else if (type == "generic") {
        sendGenericMessage(senderId, output.text, output.proposals);
    }
};


// the functions below are parsing the messageText / proposals / recipientId in the right format for the send API.
function sendHelpMessage(senderId) {
    var messageData = {
        recipient: {
        id: senderId
        },
        message: {
        text: "vous pouvez me posez des questions pièges, n'hésitez pas."
        }
    };
    callSendAPI(messageData);
}

function sendTextMessage(senderId, messageText) {
    var messageData = {
        recipient: {
        id: senderId
        },
        message: {
        text: messageText
        }
    };
    callSendAPI(messageData);
}

function sendButtonMessage(senderId, messageText, proposals) {
    var messageData = {
        recipient: {
            id: senderId
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
    callSendAPI(messageData);
}

function sendQuickReply(senderId, messageText, proposals) {
    var messageData = {
        recipient: {
            id: senderId
        },
        message: {
            text: messageText,
            quick_replies: proposals
        }
    };
    callSendAPI(messageData);
}

function sendGenericMessage(senderId, messageText, proposals) {
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: proposals
        }
      }
    }
  };
  callSendAPI(messageData);
}




// callSendAPI calls the Send API and effectively send the message through messenger.
function callSendAPI(messageData) {
    console.log(messageData);

    request({
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: config.FB_PAGE_TOKEN },
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
exports.sendButtonMessage = sendButtonMessage;
exports.sendQuickReply = sendQuickReply;

exports.receivedMessage = receivedMessage;
exports.receivedPostback = receivedPostback;

exports.gettingStarted = gettingStarted;
