/*
 * This controller prints multiple choices answers with buttons to the talking user.
 */

var config = require('../config');
var request = require('request');


function sendProposals(recipientId, messageText, proposals) {
    
    var messageData = {
        recipient: {
        id: recipientId
        },
        message: {
            text: messageText, 
            quick_replies: proposals
        }
    };
    
    /*
     * proposals de la forme 
     * 
     * proposals = [ {"content_type":"text", "title":"Choice", "payload":"PAYLOAD_FOR_PICKING_RED"}, {...}, {...} ]
     * 
     */
    
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: config.access_token },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent multiple choices message message with id %s to recipient %s", messageId, recipientId);
            console.log(response.body);
        } else { console.error(error) }
    });
}

function payloadAnalyser(event, sendMessage) {
    
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
    
    var payload = message.quick_reply.payload;
    
    if (payload == "payloadOuiGiveInfos") {
        
        // sauvegarder informations 
        //console.log('WORKING' + " ... " + payload + "..." + recipientId + "..." + config.access_token);
        sendMessage(senderId, "Nous avons enregistré les modifications.");

    }
    else if (payload == "payloadNonGiveInfos") {
        //sendMessage(recipientID, "Vos informations n'ont pas été enregistrées.");
        console.log('WORKING');
    } 
    else if (payload == "payloadOuiIntent") {
        // Transmet l'information à python
        // Transmet la solution python à l'utilisateur
    }
    else if (payload = "payloadNonIntent") {
        // Transmet l'info à python
        // Demande à l'utilisateur de reformuler son message
    }
    else {
        // Message d'erreur pour payload non connu
    }
}

var exports = module.exports = {};

exports.sendProposals = sendProposals;
exports.payloadAnalyser = payloadAnalyser;