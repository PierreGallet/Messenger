/*
 * This controller prints multiple choices answers with buttons to the talking user.
 */

var config = require('../config');
var request = require('request');
var MainCrtl = require('./main-controller');

function payloadAnalyser(event, sendMessage) {

    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    var payload = message.quick_reply.payload;

    if (payload == "payloadOuiGiveInfos") {
        // TODO : sauvegarder informations
        sendMessage(senderId, "Nous avons enregistré vos informations.");
    }
    else if (payload == "payloadNonGiveInfos") {
        // TODO : sendMessage(recipientID, "Vos informations n'ont pas été enregistrées.");
        sendMessage(senderId, "Vos informations n'ont pas été enregistrées. Pouvez vous nous les transmettre à nouveau?");
    }
    else if (payload == "payloadOuiIntent") {
        // TODO : Transmet l'information à python
        sendMessage(senderId, "Pouvez-vous nous donner votre adresse mail et numéro de téléphone afin de poursuivre la résolution de votre problème s'il-vous-plaît?");
    }
    else if (payload == "payloadNonIntent") {
        // TODO : Transmet l'info à python
        sendMessage(senderId, "Excusez-nous, pouvez-vous reformuler votre question s'il-vous-plaît.");
    }
    else if (payload == "payloadNonIntent") {
        var output = {};
            output.text = "Vous avez un problème concernant: " + json.intent[0] + "?";
            output.proposals = [{
                    "content_type":"text",
                    "title":"Oui",
                    "payload":"payloadOuiIntent"},
                    {"content_type":"text",
                     "title":"Non",
                     "payload":"payloadNonIntent"}
                ];
        callback("quick_reply", output, senderID);
    }
    else {
        // Message d'erreur pour payload non connu
        sendMessage(senderId, "DEV ERROR : question non encore implémentée ou payload non reconnu.");
    }
}

var exports = module.exports = {};

exports.payloadAnalyser = payloadAnalyser;
