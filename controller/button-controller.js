/*
 * This controller prints multiple choices answers with buttons to the talking user.
 */

var config = require('../config');
var request = require('request');
var nodeCtrl = require('./node-controller.js');


function payloadAnalyser(event,sendCallback, context, num_message) {

    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;

    try{
      var payload = event.message.quick_reply.payload;
    }
    catch(e){
      var payload = event.postback.payload;
    }

    var output;
    var output2;

    if (payload == "payloadOuiGiveInfos") {
      output = "Nous avons bien enregistré vos informations. Un conseiller va prendre le relai. Pour vous faire patienter, je vous propose le nouveau clip Red";
      sendCallback("text", output, senderId);
      sendCallback('video', config.ngrok_url +'/assets/clip.mp4', senderId)
      // output2 = "Voici les infos transmises au conseiller \n"+JSON.stringify(context.questions);
      // sendCallback("text",output2,senderId);
      // output3 = "Voici les infos transmises au conseiller \n"+JSON.stringify(context.reponses);
      // sendCallback("text",output3,senderId);
    }
    else if (payload == "payloadNonGiveInfos") {
        output = "Nous avons mal compris vos informations. Pouvez vous nous les transmettre à nouveau?";
        sendCallback("text", output, senderId);
    }
    else if (payload == "payloadOuiIntent") {
        output = "Pouvez-vous nous donner votre adresse mail et numéro de téléphone afin de poursuivre la résolution de votre problème s'il-vous-plaît?";
        sendCallback("text", output, senderId);
    }
    else if (payload == "payloadNonIntent") {
        output = "Excusez-nous, pouvez-vous reformuler votre question s'il-vous-plaît.";
        sendCallback("text", output, senderId);
    }
    else if (payload == "finish") {
        output = "Ce fut un plaisir de vous aider. N'hésitez pas à revenir vers moi si d'aventure vous avez une nouvelle question.";
        sendCallback("text", output, senderId);
        sendCallback("unlinking",{},senderId);
    }

    else if (payload == "passer_conseiller") {
        output = "Il semble que vous ayiez atteint mes limites :) Un de mes collègues humain va prendre le relai ;) Pouvez-vous lui détailler un peu plus votre problème :) ?";
        sendCallback("text", output, senderId);
    }

    else if (payload =='stop'){
      output = {};
      output.text = "Avez vous trouvé ce que vous cherchiez?";
      output.proposals = [
          {"content_type":"text",
          "title":"oui",
          "payload":"finish"},
          {"content_type":"text",
          "title":"non",
          "payload":"passer_conseiller"}];
      sendCallback("quick_reply", output, senderId)
    }

    else if (payload == "new_forfait") {
        output = "Parfait, afin de vérifier votre identité, pouvez vous nous transmettre votre numero de téléphone et votre email?";
        sendCallback('text',output,senderId);
    }
    else if (payload == "help_payload") {
        output = "Je suis Rouge, le chatbot de SFR Red. Vous pouvez me poser vos questions, je peux vous proposer des solutions immédiates ou vous rediriger vers un humain plus intelligent que moi!";
        sendCallback('text',output,senderId);
    }

    else if (payload == "nouvelle_question") {
        output ={};
        output.text = "Vous nous contacter en ce qui concerne?";
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
        sendCallback('quick_reply',output,senderId);
    }

    else if(payload == "0" && num_message == 0 ){
      introduction = "Bonjour " + context.first_name + " " + context.last_name + ".";
      introduction2 = "Je suis Reddie, votre assistant virtuel :)";
      //introduction3 = "Tout d'abord veuillez vous connecter à votre compte Red SFR :)";

      sendCallback('text',introduction,senderId);
      sendCallback('text',introduction2,senderId);
      sendCallback('linking',{},senderId);

      var output =introduction;

    }

    else if (payload == "0") {
       output = {};
       //introduction = "Bonjour " + context.first_name + " " + context.last_name + ".";
       //introduction2 = "Je suis Rouge, le bot de SFR Red.";
       //introduction3 = "Je vais vous poser plusieurs questions pour mieux cerner ce qui vous amène ici.";
       output.text = "Tout d'abord, vous êtes client?";
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
       sendCallback('quick_reply',output,senderId);

      //  sendCallback('text',introduction,senderId);
      //  setTimeout(function(){
      //      sendCallback('text',introduction2,senderId);
      //      setTimeout(function(){
      //          sendCallback('text',introduction3,senderId);
      //          setTimeout(function(){
      //               sendCallback('quick_reply',output,senderId);
      //          }, 1500);
      //      }, 1500);
      //  }, 1500);
    }

    else {
        output = nodeCtrl.load_node(payload,senderId,sendCallback);
    }

    // on enregistre les reponses
    if (output.text){
        context.reponses[num_message] = output.text;
    }
    else {
        context.reponses[num_message] = output;
    }

    console.log('\n Contexte après réception message %s: \n',num_message,context);
}


var exports = module.exports = {};

exports.payloadAnalyser = payloadAnalyser;
