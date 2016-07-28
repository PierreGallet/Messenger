/*
 * This controller prints multiple choices answers with buttons to the talking user.
 */

var config = require('../config');
var request = require('request');
var mainCtrl = require('./main-controller');

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
    
    console.log("EVENT" + event);
    
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
    
    var payload = message.quick_reply.payload;
    
    if (payload == "payloadOuiGiveInfos") {
        
        // sauvegarder informations 
        console.log('WORKING' + " ... " + payload + "..." + recipientId + "..." + config.access_token);
        console.log("COntroller" + mainCtrl);
        console.log("FUNCTION" + mainCtrl.sendTextMessage);
        /*var messageData = {
            recipient: {
                id: 535023013364135
            },
            message: {
                text: "Nous avons enregistré les modifications."
            }
        };
        console.log(messageData);
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
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
                console.error(response.body);
                console.error(error);
            }
    });  */
        
        //sendMessage(535023013364135, "Vos informations ont été enregistrées.");
        console.log("It came to an end");
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