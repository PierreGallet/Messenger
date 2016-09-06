/*
 * Defines all de functions used to parse incoming Jsons and ignite answers.
 */

// 'use strict';

const
    config = require('../config'),
    request = require('request'),
    buttonCtrl = require('./button-controller'),
    pythonCtrl = require('./python-controller'),
    nodeCtrl = require('./node-controller');


//In receivedMessage, we've made logic to send a message back to the user. The default behavior is to use the fonction talktopython.

function receivedMessage(event, context, num_message, reset) {
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;

    if(event.message){
      var message = event.message;
      console.log("Received message for user %d and page %d at %d with message:", senderId, recipientId, timeOfMessage,JSON.stringify(message));
      var messageId = message.mid;
      // You may get a text or attachment but not both
      var messageText = message.text;
      var messageAttachments = message.attachments;
    }
    else{
      var payload = event.postback.payload;
    }

    if((event.message && event.message.quick_reply)||(event.postback)){
      buttonCtrl.payloadAnalyser(event,sendCallback,context,num_message);
    }

    else {
        // message texte brute (ie pas un quick_reply)

        // If we receive a text message, check to see if it matches any special
        // keywords and send back the corresponding example. Otherwise, call the python script


        if(num_message==0 || context.reponses[num_message-1]=="Ce fut un plaisir de vous aider. N'hésitez pas à revenir vers moi si d'aventure vous avez une nouvelle question."){
          var output = {};
          introduction = "Bonjour " + context.first_name + " " + context.last_name + ".";
          introduction2 = "Je suis Reddie, votre assistant virtuel :)";
          introduction3 = "Je vais vous poser plusieurs questions pour résoudre votre problème plus rapidement B-) Mais rassurez-vous, mes collègues humains prendront le relai si besoin :) ";
          output.text = "Tout d'abord, vous êtes client...";
          output.proposals = [
              {"title":"Forfait Mobile",
               "image_url":"http://www.s-sfr.fr/media/gred-telmobile-maxi.png",
               "buttons": [
                 {"type":"postback",
                 "title":"Cliquez ici",
                 "payload":"0_0"}]
              },
              {"title":"Fibre, Box",
              "image_url":"http://www.s-sfr.fr/media/gred-box-maxi1.png",
               "buttons": [
                 {"type":"postback",
                 "title":"Cliquez ici",
                 "payload":"0_1"}]
              },
              {"title":"Pas encore client",
              "image_url":"http://www.s-sfr.fr/media/gred-caddie-maxi.png",
               "buttons": [
                 {"type":"postback",
                 "title":"Cliquez ici",
                 "payload":"0_2"}]
              }
          ];
          // output.proposals = [
          //    {"content_type":"text",
          //    "title":"Forfait Mobile",
          //    "payload":"0_0"},
          //    {"content_type":"text",
          //    "title":"Fibre, Box",
          //    "payload":"0_1"},
          //    {"content_type":"text",
          //    "title":"Pas encore Client",
          //    "payload":"0_2"}
          // ];
          // output.proposals = [
          //     {"title":"Depuis l'Espace client",
          //     "subtitle":"Faire évoluer votre offre mobile",
          //     "item_url":"https://www.sfr.fr/routage/evoluer-mon-offre",
          //     "image_url":"https://59387558.ngrok.io/assets/client.png",
          //     "buttons": [
          //        {"type":"postback",
          //        "title":"Lire ici",
          //        "payload":"payloadOuiGiveInfos"}]
          //     }]
          sendTextMessage(senderId, introduction);
          setTimeout(function(){
             sendTextMessage(senderId, introduction2);
             setTimeout(function(){
                 sendTextMessage(senderId, introduction3);
                 setTimeout(function(){
                     //sendQuickReply(senderId, output.text, output.proposals);
                     sendCallback("text", output.text, senderId);
                     sendCallback("generic", output, senderId);
                 }, 1500);
             }, 1500);
          }, 1500);


          if (output.text){
              context.reponses[num_message] = output.text;
          }
          else {
              context.reponses[num_message] = output;
          };
          console.log('\n Contexte après réception message %s: \n',num_message,context);
        }

        else{
          pythonCtrl.talkToPython(messageText, context, num_message, senderId, sendCallback, reset);
        }

        if (messageAttachments) {
            sendTextMessage(senderId, "Message with attachment received");
        }
    }
}

// function receivedPostback(event, context, num_message) {
//     var senderId = event.sender.id;
//     var recipientId = event.recipient.id;
//     var timeOfPostback = event.timestamp;
//
//     // The 'payload' param is a developer-defined field which is set in a postback
//     // button for Structured Messages.
//     var payload = event.postback.payload;
//     //console.log(payload);
//     var output = '';
//     if (payload == "payloadOuiGiveInfos") {
//       output = "Nous avons bien enregistré vos informations et transmettons toutes vos infos. Un conseiller va prendre le relai. Merci de patienter";
//       sendTextMessage(senderId, output);
//       // output2 = "Voici les infos transmises au conseiller \n"+JSON.stringify(context.questions);
//       // sendCallback("text",output2,senderId);
//       // output3 = "Voici les infos transmises au conseiller \n"+JSON.stringify(context.reponses);
//       // sendCallback("text",output3,senderId);
//     }
//     else if (payload == "payloadNonGiveInfos") {
//         output = "Nous avons mal compris vos informations. Pouvez-nous nous les redonner svp.";
//         sendTextMessage(senderId, output);
//     }
//     else if (payload =='stop'){
//       output = {};
//       output.text = "Avez vous trouvé ce que vous cherchiez?";
//       output.proposals = [
//           {"content_type":"text",
//           "title":"oui",
//           "payload":"finish"},
//           {"content_type":"text",
//           "title":"non",
//           "payload":"passer_conseiller"}];
//       sendCallback("quick_reply", output, senderId)
//     }
//     else if (payload == "payloadOuiIntent") {
//         output = "Pouvez-vous nous donner votre adresse mail et numéro de téléphone afin de poursuivre la résolution de votre problème s'il-vous-plaît?";
//         sendTextMessage(senderId, output);
//     }
//     else if (payload == "payloadNonIntent") {
//         output = "Excusez-nous bien, pouvez-vous reformuler votre question s'il-vous-plaît.";
//         sendTextMessage(senderId, output);
//     }
//     else if (payload == "new_forfait") {
//         output = "Parfait, afin de vérifier votre identité, pouvez vous nous transmettre votre numero de téléphone et votre email?";
//         sendTextMessage(senderId, output);
//     }
//     else if (payload == "help_payload") {
//         output = "Je suis Rouge, le chatbot de SFR Red. Vous pouvez me poser vos questions, je peux vous proposer des solutions immédiates ou vous rediriger vers un humain plus intelligent que moi!";
//         sendTextMessage(senderId, output);
//     }
//     else if (payload == "passer_conseiller") {
//         output = "Il semble que vous ayiez atteint mes limites :) Un de mes collègues humain va prendre le relai ;) Pouvez-vous lui détailler un peu plus votre problème :) ?";
//         sendCallback("text", output, senderId);
//     }
//     else if (payload == "nouvelle_question") {
//         output ={};
//         output.text = "Vous nous contacter en ce qui concerne:";
//         output.proposals = [
//            {"content_type":"text",
//            "title":"Forfait Mobile",
//            "payload":"0_0"},
//            {"content_type":"text",
//            "title":"Fibre, Box",
//            "payload":"0_1"},
//            {"content_type":"text",
//            "title":"Pas encore Client",
//            "payload":"0_2"}
//         ];
//         sendQuickReply(senderId, output.text, output.proposals);
//     }
//
//     else if (payload == "0") {
//        output = {};
//        introduction = "Bonjour " + context.first_name + " " + context.last_name + ".";
//        introduction2 = "Je suis Rouge, le bot de SFR Red.";
//        introduction3 = "Je vais vous poser plusieurs questions pour mieux cerner ce qui vous amène ici.";
//        output.text = "Tout d'abord, vous êtes client?";
//        output.proposals = [
//           {"content_type":"text",
//           "title":"Forfait Mobile",
//           "payload":"0_0"},
//           {"content_type":"text",
//           "title":"Fibre, Box",
//           "payload":"0_1"},
//           {"content_type":"text",
//           "title":"Pas encore Client",
//           "payload":"0_2"}
//        ];
//        sendTextMessage(senderId, introduction);
//        setTimeout(function(){
//            sendTextMessage(senderId, introduction2);
//            setTimeout(function(){
//                sendTextMessage(senderId, introduction3);
//                setTimeout(function(){
//                    sendQuickReply(senderId, output.text, output.proposals);
//                }, 1500);
//            }, 1500);
//        }, 1500);
//     }
//
//     else {
//       //try{
//       output = nodeCtrl.load_node('payback',payload,senderId,sendCallback);
//       //}
//       // finally{
//       //   // Message d'erreur pour payload non connu
//       //   sendTextMessage(senderId, "~~~~DEV ERROR~~~~        in main-controller\n question non encore implémentée ou payload non reconnu");
//       //
//       // }  // Message d'erreur pour payload non connu
//     }
//
//     // on enregistre les reponses
//     if (output.text){
//         context.reponses[num_message] = output.text;
//     }
//     else {
//         context.reponses[num_message] = output;
//     }
//     console.log('\n Contexte après réception message %s: \n',num_message,context);
// }



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
        sendGenericMessage(senderId, output.proposals);
    }
    else if (type == "video") {
        sendVideoMessage(senderId, output);
    }
    else if (type == "image") {
        sendImageMessage(senderId, output);
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

function sendGenericMessage(senderId, proposals) {
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

function sendVideoMessage(senderId, videoUrl) {
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "video",
        payload: {
            url: config.ngrok_url + videoUrl
        }
      }
    },
    // filedata: videoUrl  // need to be like "@/tmp/clip.mp4;type=video/mp4"
  };
  callSendAPI(messageData);
}

function sendImageMessage(senderId, imageUrl) {
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
            url: imageUrl
        }
      }
    },
    // filedata: videoUrl  // need to be like "@/tmp/clip.mp4;type=video/mp4"
  };
  callSendAPI(messageData);
}

function sendTypingOn(senderId) {
  console.log("Turning typing indicator on");

  var messageData = {
    recipient: {
      id: senderId
    },
    sender_action: "typing_on"
  };

  callSendAPI(messageData);
}

function sendTypingOff(senderId) {
  console.log("Turning typing indicator off");

  var messageData = {
    recipient: {
      id: senderId
    },
    sender_action: "typing_off"
  };

  callSendAPI(messageData);
}

// callSendAPI calls the Send API and effectively send the message through messenger.
function callSendAPI(messageData) {
    //console.log(messageData);

    request({
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: config.FB_PAGE_TOKEN },
        method: 'POST',
        json: messageData
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;

        console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
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
exports.sendButtonMessage = sendButtonMessage;
exports.sendQuickReply = sendQuickReply;

exports.receivedMessage = receivedMessage;
//exports.receivedPostback = receivedPostback;
exports.sendCallback = sendCallback;
