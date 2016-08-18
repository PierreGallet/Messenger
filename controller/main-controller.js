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
        setting_type:"call_to_actions",
        thread_state:"new_thread",
        call_to_actions:[
            {
                payload:"getting_started"
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
                pythonCtrl.talkToPython(messageText, context, num_message, senderId, sendPythonResponse, reset);
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
    var output = '';
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
    else if (payload == "new_forfait") {
        output = "Parfait, afin de vérifier votre identité, pouvez vous nous transmettre votre numero de téléphone et votre email?"
        sendTextMessage(senderId, output);
    }
    // else if (payload == "getting_started") {
    //     output = "Bonjour, bienvenue sur notre page facebook. Je suis le bot de SFR Red, et je suis là pour résoudre votre problème. J'aimerais d'abord en savoir plus sur vous."
    //     sendTextMessage(senderId, output);
    //     var output = {};
    //         output.text = "Vous êtes client...";
    //         output.proposals = [{
    //                 "content_type":"text",
    //                 "title":"Forfait Mobile et stroumpherie",
    //                 "payload":"1_forfait_mobile"},
    //                 {"content_type":"text",
    //                  "title":"Fibre, Box",
    //                  "payload":"1_fibre_box"},
    //                  {"content_type":"text",
    //                   "title":"Pas encore client",
    //                   "payload":"1_pas_client"},
    //                   {"content_type":"text",
    //                    "title":"Pas encore client",
    //                    "payload":"1_pas_client"},
    //                    {"content_type":"text",
    //                     "title":"Pas encore client",
    //                     "payload":"1_pas_client"},
    //                     {"content_type":"text",
    //                      "title":"Pas encore client",
    //                      "payload":"1_pas_client"}
    //             ];
    //     sendQuickReply(senderId, output.text, output.proposals);
    // }
    else if (payload == "getting_started") {
       output = "Bonjour, bienvenue sur notre page facebook. Je suis le bot de SFR Red, et je suis là pour résoudre votre problème. J'aimerais d'abord en savoir plus sur vous."
       sendTextMessage(senderId, output);
       var output = {};
       output.text = "Vous êtes client...";
       output.proposals = [
           {"type":"postback",
           "title":"Forfait Mobile",
           "payload":"Forfait Mobile"},
           {"type":"postback",
           "title":"Fibre, Box",
           "payload":"Fibre, Box"},
           {"type":"postback",
           "title":"Pas encore Client",
           "payload":"Pas encore Client"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);
    }
    else if (payload == "Fibre, Box") {
       var output = {};
       output.text = "Votre demande concerne...";
       output.proposals = [
           {"type":"postback",
           "title":"RED + BOX",
           "payload":"RED + BOX"},
           {"type":"postback",
           "title":"RED Fibre",
           "payload":"RED Fibre"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);
    }
    else if (payload == "Pas encore client") {
       var output = {};
       output.text = "Votre demande concerne-t-elle:";
       output.proposals = [
           {"type":"postback",
           "title":"Les forfaits mobile RED",
           "payload":"Les forfaits mobile RED"},
           {"type":"postback",
           "title":"L'offre RED Fibre",
           "payload":"L'offre RED Fibre"},
           {"type":"postback",
           "title":"Le réseau SFR",
           "payload":"Le réseau SFR"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);

       var output = {};
       output.text = "ou est-ce plutôt:";
       output.proposals = [
           {"type":"postback",
           "title":"Désimlocker son mobile",
           "payload":"Désimlocker son mobile"},
           {"type":"postback",
           "title":"Changer d'opérateur",
           "payload":"Changer d'opérateur"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);
    }
    else if (payload == "Forfait Mobile") {
       var output = {};
       output.text = "Votre demande concerne-t-elle:";
       output.proposals = [
           {"type":"postback",
           "title":"Forfait et options",
           "payload":"Forfait et options"},
           {"type":"postback",
           "title":"Mobile, carte SIM et réseau",
           "payload":"Mobile, carte SIM et réseau"},
           {"type":"postback",
           "title":"Contrat, compte et identifants",
           "payload":"Contrat, compte et identifants"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);

       var output = {};
       output.text = "ou est-ce plutôt:";
       output.proposals = [
           {"type":"postback",
           "title":"Consommation et facture",
           "payload":"Consommation et facture"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);
    }
    else if (payload == "Forfait et options") {
       var output = {};
       output.text = "Plus précisément:";
       output.proposals = [
           {"type":"postback",
           "title":"Souscrire à un nouveau forfait RED",
           "payload":"Souscrire à un nouveau forfait RED"},
           {"type":"postback",
           "title":"Changer de forfait",
           "payload":"Changer de forfait"},
           {"type":"postback",
           "title":"Résilier votre forfait",
           "payload":"Résilier votre forfait"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);

       var output = {};
       output.text = "ou encore:";
       output.proposals = [
           {"type":"postback",
           "title":"Ajouter, résilier une option",
           "payload":"Ajouter, résilier une option"},
           {"type":"postback",
           "title":"Recharger un forfait bloqué",
           "payload":"Recharger un forfait bloqué"},
           {"type":"postback",
           "title":"Demander la protabilité de son numéro (RIO)",
           "payload":"Demander la protabilité de son numéro (RIO)"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);

       var output = {};
       output.text = "ou encore:";
       output.proposals = [
           {"type":"postback",
           "title":"Tout savoir sur l'International",
           "payload":"Tout savoir sur l'International"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);
    }
    else if (payload == "Mobile, carte SIM et réseau") {
       var output = {};
       output.text = "Plus précisément";
       output.proposals = [
           {"type":"postback",
           "title":"Mobile",
           "payload":"Mobile"},
           {"type":"postback",
           "title":"Carte SIM",
           "payload":"Carte SIM"},
           {"type":"postback",
           "title":"Réseau",
           "payload":"Réseau"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);
    }
    else if (payload == "Contrat, compte et identifiants") {
       var output = {};
       output.text = "Plus précisément:";
       output.proposals = [
           {"type":"postback",
           "title":"Accéder à votre espace client",
           "payload":"Accéder à votre espace client"},
           {"type":"postback",
           "title":"Changer votre mot de passe",
           "payload":"Changer votre mot de passe"},
           {"type":"postback",
           "title":"Récupérer votre mot de passe perdu",
           "payload":"Récupérer votre mot de passe perdu"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);

       var output = {};
       output.text = "ou encore:";
       output.proposals = [
           {"type":"postback",
           "title":"Modifier vos données personnelles et bancaires",
           "payload":"Modifier vos données personnelles et bancaires"},
           {"type":"postback",
           "title":"Changer de numéro de téléphone",
           "payload":"Changer de numéro de téléphone"},
           {"type":"postback",
           "title":"Céder votre forfait à un proche",
           "payload":"Céder votre forfait à un proche"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);

       var output = {};
       output.text = "ou encore:";
       output.proposals = [
           {"type":"postback",
           "title":"Demander ou gérer vos procurations de ligne",
           "payload":"Demander ou gérer vos procurations de ligne"},
           {"type":"postback",
           "title":"Signer, consulter votre mandat de prélèvement (SEPA)",
           "payload":"Signer, consulter votre mandat de prélèvement (SEPA)"}
       ];
       sendButtonMessage(senderId, output.text, output.proposals);
    }
    else {
        // Message d'erreur pour payload non connu
        sendTextMessage(senderId, "DEV ERROR : question non encore implémentée ou payload non reconnu.");
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
var sendPythonResponse = function(type, output, senderID) {

    if (type == "text") {
        sendTextMessage(senderID, output);
    }
    else if (type == "button") {
        sendButtonMessage(senderID, output.text, output.proposals);
    }
    else if (type == "quick_reply") {
        sendQuickReply(senderID, output.text, output.proposals);
    }
    else if (type == "generic") {
        sendGenericMessage(senderID, output.text, output.proposals);
    }
};

// the functions below are parsing the messageText / proposals / recipientId in the right format for the send API.
function sendHelpMessage(senderID) {
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

function sendTextMessage(senderID, messageText) {
    var messageData = {
        recipient: {
        id: senderID
        },
        message: {
        text: messageText
        }
    };
    callSendAPI(messageData);
}

function sendButtonMessage(senderID, messageText, proposals) {
    var messageData = {
        recipient: {
            id: senderID
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

function sendQuickReply(senderID, messageText, proposals) {
    var messageData = {
        recipient: {
            id: senderID
        },
        message: {
            text: messageText,
            quick_replies: proposals
        }
    };
    callSendAPI(messageData);
}

function sendGenericMessage(senderID, messageText, proposals) {
  var messageData = {
    recipient: {
      id: senderID
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
exports.sendButtonMessage = sendTextMessage;
exports.sendQuickReply = sendTextMessage;

exports.receivedMessage = receivedMessage;
exports.receivedPostback = receivedPostback;

exports.gettingStarted = gettingStarted;
