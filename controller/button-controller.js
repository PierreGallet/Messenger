/*
 * This controller prints multiple choices answers with buttons to the talking user.
 */

var config = require('../config');
var request = require('request');


function payloadAnalyser(event, sendCallback, context, num_message) {

    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    var payload = message.quick_reply.payload;
    var output;
    var output2;

    if (payload == "payloadOuiGiveInfos") {
        output = "Nous avons enregistré vos informations.";
        sendCallback("text", output, senderId);
    }
    else if (payload == "payloadNonGiveInfos") {
        output = "Vos informations n'ont pas été enregistrées. Pouvez vous nous les transmettre à nouveau?";
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
    }
    else if (payload == "passer_conseiller") {
        output = "J'ai compris votre problème et je le transmet à un conseiller. Il va s'occuper de vous dans quelques instants.";
        sendCallback("text", output, senderId);
        setTimeout(function(){
             sendCallback("text", "En attendant, je vous propose de voir notre vidéo Get Ready!", senderId);
        }, 1000);
        // var videoUrl = '@/assets/clip.mp4;type=video/mp4';
        var videoUrl = '/assets/clip.mp4';
        setTimeout(function(){
            sendCallback("video", videoUrl, senderId);
        }, 2000);
    }
    else if (payload == "0_0_0") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0"},
           {"content_type":"text",
           "title":"Nouveau forfait RED",
           "payload":"0_0_0_0"},
           {"content_type":"text",
           "title":"Changer de forfait",
           "payload":"0_0_0_1"},
           {"content_type":"text",
           "title":"Résilier votre ligne",
           "payload":"0_0_0_2"},
           {"content_type":"text",
           "title":"Gérer vos options",
           "payload":"0_0_0_3"},
           {"content_type":"text",
           "title":"Recharger un forfait",
           "payload":"0_0_0_4"},
           {"content_type":"text",
           "title":"Portabilité de n°",
           "payload":"0_0_0_5"},
           {"content_type":"text",
           "title":"RED International?",
           "payload":"0_0_0_6"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0") {
       output = {};
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
    }
    else if (payload == "0_0") {
       output = {};
       output.text = "Votre demande concerne...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0"},
           {"content_type":"text",
           "title":"Forfait et options",
           "payload":"0_0_0"},
           {"content_type":"text",
           "title":"Mobile/SIM/Réseau",
           "payload":"0_0_1"},
           {"content_type":"text",
           "title":"Contrats / Compte",
           "payload":"0_0_2"},
           {"content_type":"text",
           "title":"Conso / Facture",
           "payload":"0_0_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_0_2") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0_0"},
           {"content_type":"text",
           "title":"Moins cher ailleurs?",
           "payload":"0_0_0_2_0"},
           {"content_type":"text",
           "title":"Problème avec réseau",
           "payload":"0_0_0_2_1"},
           {"content_type":"text",
           "title":"Changer de téléphone",
           "payload":"0_0_0_2_2"},
           {"content_type":"text",
           "title":"Autre raison",
           "payload":"0_0_0_2_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_0_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Faire évoluer votre offre mobile",
           "item_url":"https://www.sfr.fr/routage/evoluer-mon-offre",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/evoluer-mon-offre",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment faire évoluer votre offre mobile ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-de-forfait-RED-by-SFR/ta-p/419",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-de-forfait-RED-by-SFR/ta-p/419",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-de-forfait-RED-by-SFR/ta-p/419"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment suivre ou annuler votre modification d'offre mobile ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-comment-suivre-ou-annuler-vos-modifications/ta-p/420",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-comment-suivre-ou-annuler-vos-modifications/ta-p/420",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-comment-suivre-ou-annuler-vos-modifications/ta-p/420"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_0_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Tout savoir sur les forfaits Mobile RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-les-offres-Mobile-RED-by-SFR/ta-p/418",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-les-offres-Mobile-RED-by-SFR/ta-p/418",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Souscrire à un forfait mobile sans engagement RED by SFR",
           "item_url":"http://red-by-sfr.fr/forfaits-mobiles/",
           "image_url":"https://59387558.ngrok.io/assets/logo.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/forfaits-mobiles/",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_0_2_3") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0_0_2"},
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_0_2_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Faire évoluer votre offre mobile",
           "item_url":"https://www.sfr.fr/routage/evoluer-mon-offre",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/evoluer-mon-offre",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Consulter les démarches utiles pour résilier votre forfait",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-résilier-une-offre-RED-by-SFR/ta-p/2529",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-résilier-une-offre-RED-by-SFR/ta-p/2529",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-résilier-une-offre-RED-by-SFR/ta-p/2529"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_0_2_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Faire évoluer votre offre mobile",
           "item_url":"https://www.sfr.fr/routage/evoluer-mon-offre",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/evoluer-mon-offre",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Consulter les démarches utiles pour résilier votre forfait",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-résilier-une-offre-RED-by-SFR/ta-p/2529",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-résilier-une-offre-RED-by-SFR/ta-p/2529",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-résilier-une-offre-RED-by-SFR/ta-p/2529"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_0_2_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Consulter les démarches utiles pour résilier votre forfait",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-résilier-une-offre-RED-by-SFR/ta-p/2529",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-résilier-une-offre-RED-by-SFR/ta-p/2529",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-résilier-une-offre-RED-by-SFR/ta-p/2529"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_0_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Consulter, modifier vos options",
           "item_url":"https://www.sfr.fr/routage/choisir-options",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/choisir-options",
              "title":"Lire sur le Web"}]
           },
           {"title":"Depuis l'Espace client",
           "subtitle":"Consulter, souscrire un Pack séjour Europe, USA, Afrique…",
           "item_url":"https://www.sfr.fr/espace-client/offres-options-mobile/disponibles.html?selectMenu=mdf8",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/espace-client/offres-options-mobile/disponibles.html?selectMenu=mdf8",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Pour gérer vos options, composez le 963 depuis votre mobile (gratuit) ou le 06 1000 1963 depuis un fixe (prix d'un appel vers un mobile).",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment gérer, souscrire ou annuler vos options ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-by-SFR-comment-gérer-vos-options/ta-p/130",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-by-SFR-comment-gérer-vos-options/ta-p/130",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-by-SFR-comment-gérer-vos-options/ta-p/130"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment suivre ou annuler vos modifications d'options ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-comment-suivre-ou-annuler-vos-modifications/ta-p/420",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-comment-suivre-ou-annuler-vos-modifications/ta-p/420",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-comment-suivre-ou-annuler-vos-modifications/ta-p/420"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0"},
           {"content_type":"text",
           "title":"Mobile",
           "payload":"0_0_1_0"},
           {"content_type":"text",
           "title":"Carte SIM",
           "payload":"0_0_1_1"},
           {"content_type":"text",
           "title":"Réseau",
           "payload":"0_0_1_2"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_1_0") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0_1"},
           {"content_type":"text",
           "title":"Suivi de commande",
           "payload":"0_0_1_0_0"},
           {"content_type":"text",
           "title":"Désimlocker mobile",
           "payload":"0_0_1_0_1"},
           {"content_type":"text",
           "title":"Changer de mobile",
           "payload":"0_0_1_0_2"},
           {"content_type":"text",
           "title":"Recycler mobile",
           "payload":"0_0_1_0_3"},
           {"content_type":"text",
           "title":"Vol et perte mobile",
           "payload":"0_0_1_0_4"},
           {"content_type":"text",
           "title":"Paramétrer mobile",
           "payload":"0_0_1_0_5"},
           {"content_type":"text",
           "title":"Dépanner mobile",
           "payload":"0_0_1_0_6"},
           {"content_type":"text",
           "title":"Mon répondeur SFR",
           "payload":"0_0_1_0_7"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_0_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Recharger votre Forfait bloqué RED ou celui d'un proche",
           "item_url":"https://www.sfr.fr/espace-client/rechargement/saisie-ligne.html",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/espace-client/rechargement/saisie-ligne.html",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Pour recharger votre crédit, composez le 950 depuis votre mobile (gratuit).",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment recharger votre Forfait bloqué ou celui d'un proche",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-offre-RED-by-SFR-bloquée-Comment-recharger-votre-crédit/ta-p/74",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-offre-RED-by-SFR-bloquée-Comment-recharger-votre-crédit/ta-p/74",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-offre-RED-by-SFR-bloquée-Comment-recharger-votre-crédit/ta-p/74"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_0_5") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment changer d'opérateur mobile",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-en-conservant-son-numéro-mobile/ta-p/424",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-en-conservant-son-numéro-mobile/ta-p/424",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-en-conservant-son-numéro-mobile/ta-p/424"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_0_6") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Consulter, souscrire un Pack séjour Europe, USA, Afrique…",
           "item_url":"https://www.sfr.fr/espace-client/offres-options-mobile/disponibles.html?selectMenu=mdf8",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/espace-client/offres-options-mobile/disponibles.html?selectMenu=mdf8",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment communiquer depuis l'étranger avec les offres RED by SFR: appels, SMS/MMS et Internet mobile ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-communiquer-depuis-l-étranger-avec-les-offres-RED-by-SFR/ta-p/82",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-communiquer-depuis-l-étranger-avec-les-offres-RED-by-SFR/ta-p/82",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-communiquer-depuis-l-étranger-avec-les-offres-RED-by-SFR/ta-p/82"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment communiquer vers l'étranger avec les offres RED by SFR ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-communiquer-vers-l-étranger-avec-les-offres-RED-by-SFR/ta-p/83",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-communiquer-vers-l-étranger-avec-les-offres-RED-by-SFR/ta-p/83",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-communiquer-vers-l-étranger-avec-les-offres-RED-by-SFR/ta-p/83"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Qu'est ce que la version Travel des forfaits RED ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-la-Version-Travel-des-forfaits-RED/ta-p/583",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-la-Version-Travel-des-forfaits-RED/ta-p/583",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-la-Version-Travel-des-forfaits-RED/ta-p/583"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment fonctionne l'option SMS illimités Europe / Dom ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-fonctionne-l-option-SMS-illimités-Europe-Dom/ta-p/586",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-fonctionne-l-option-SMS-illimités-Europe-Dom/ta-p/586",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment suivre ou annuler votre commande ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Suivre-ma-commande-mobile-et-SIM/ta-p/59",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Suivre-ma-commande-mobile-et-SIM/ta-p/59",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Suivre-ma-commande-mobile-et-SIM/ta-p/59"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Votre suivi de commande RED by SFR",
           "item_url":"http://red-by-sfr.fr/suivi-de-commande.html",
           "image_url":"https://59387558.ngrok.io/assets/logo.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/suivi-de-commande.html",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Désimlocker votre mobile depuis votre Espace client",
           "item_url":"https://www.sfr.fr/routage/desimlocker",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/desimlocker",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_5") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0_1_0"},
           {"content_type":"text",
           "title":"Accès Mode d'emploi",
           "payload":"0_0_1_0_5_0"},
           {"content_type":"text",
           "title":"Syncro répertoire",
           "payload":"0_0_1_0_5_1"},
           {"content_type":"text",
           "title":"Congifuer Internet",
           "payload":"0_0_1_0_5_2"},
           {"content_type":"text",
           "title":"Paramétrer mobile",
           "payload":"0_0_1_0_5_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_1_0_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment changer de mobile ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-de-mobile/ta-p/64",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-de-mobile/ta-p/64",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-de-mobile/ta-p/64"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Donner une deuxième vie à vos appareils et faites des économies",
           "item_url":"http://recyclage-mobile.sfr.fr/",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://recyclage-mobile.sfr.fr/",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Les premiers réflexes à avoir : Suspendre votre ligne, localiser votre mobile…",
           "item_url":"https://www.sfr.fr/mon-espace-client/hub-mobile/mobileperdu-vole.html",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/mon-espace-client/hub-mobile/mobileperdu-vole.html",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Pour suspendre votre ligne, composez le 06 1000 1963 depuis un poste fixe (prix vers un mobile)",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Les bons reflexes en cas de perte ou de vol de mobile",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-faire-en-cas-de-perte-ou-de-vol-de-votre-mobile/ta-p/403",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-faire-en-cas-de-perte-ou-de-vol-de-votre-mobile/ta-p/403",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-faire-en-cas-de-perte-ou-de-vol-de-votre-mobile/ta-p/403"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_5_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_5_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_5_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Paramétrer et mettre à jour automatiquement votre mobile",
           "item_url":"https://www.sfr.fr/mon-espace-client/hub-mobile/parametrermobile.html",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/mon-espace-client/hub-mobile/parametrermobile.html",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_1") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0_1"},
           {"content_type":"text",
           "title":"Activer carte SIM",
           "payload":"0_0_1_1_0"},
           {"content_type":"text",
           "title":"Nouvelle carte SIM",
           "payload":"0_0_1_1_1"},
           {"content_type":"text",
           "title":"Débloquer carte SIM",
           "payload":"0_0_1_1_2"},
           {"content_type":"text",
           "title":"Changer code PIN",
           "payload":"0_0_1_1_3"},
           {"content_type":"text",
           "title":"Pb. appels, SMS, MMS",
           "payload":"0_0_1_1_4"},
           {"content_type":"text",
           "title":"Pb. internet mobile",
           "payload":"0_0_1_1_5"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_1_0_5_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_6") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Que faire en cas de panne de votre mobile ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-faire-en-cas-de-perte-ou-de-vol-de-votre-mobile/ta-p/403",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-faire-en-cas-de-perte-ou-de-vol-de-votre-mobile/ta-p/403",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-faire-en-cas-de-perte-ou-de-vol-de-votre-mobile/ta-p/403"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_0_7") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_1_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Activer votre carte SIM",
           "item_url":"https://www.sfr.fr/mon-espace-client/hub-mobile/gerersim.html",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/mon-espace-client/hub-mobile/gerersim.html",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Pour commander, activer une carte SIM, composez le 963 depuis votre mobile (gratuit) ou le 06 1000 1963 depuis un fixe (prix d'un appel vers un mobile).",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment activer votre nouvelle carte SIM RED ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-activer-votre-nouvelle-carte-SIM-RED/ta-p/60",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-activer-votre-nouvelle-carte-SIM-RED/ta-p/60",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-activer-votre-nouvelle-carte-SIM-RED/ta-p/60"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_1_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Commander une nouvelle carte SIM",
           "item_url":"https://www.sfr.fr/mon-espace-client/hub-mobile/gerersim.html",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/mon-espace-client/hub-mobile/gerersim.html",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Pour commander, activer une carte SIM, composez le 963 depuis votre mobile (gratuit) ou le 06 1000 1963 depuis un fixe (prix d'un appel vers un mobile).",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Apprenez tout sur le changement ou la commande d'une nouvelle carte SIM !",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-ou-commander-une-carte-SIM/ta-p/61",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-ou-commander-une-carte-SIM/ta-p/61",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-ou-commander-une-carte-SIM/ta-p/61"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_1_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Rétrouver votre code PUK afin de débloquer votre carte SIM",
           "item_url":"https://www.sfr.fr/mon-espace-client/hub-mobile/gerersim.html",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/mon-espace-client/hub-mobile/gerersim.html",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Pour commander, activer une carte SIM, composez le 963 depuis votre mobile (gratuit) ou le 06 1000 1963 depuis un fixe (prix d'un appel vers un mobile).",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment débloquer votre carte SIM SFR à l'aide du code PUK ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-débloquer-votre-carte-SIM-à-l-aide-du-code-PUK/ta-p/62",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-débloquer-votre-carte-SIM-à-l-aide-du-code-PUK/ta-p/62",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-débloquer-votre-carte-SIM-à-l-aide-du-code-PUK/ta-p/62"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_2") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0_1"},
           {"content_type":"text",
           "title":"Gérer boitier Femto",
           "payload":"0_0_1_2_0"},
           {"content_type":"text",
           "title":"Vérifier réseau",
           "payload":"0_0_1_2_1"},
           {"content_type":"text",
           "title":"Hotspots SFR WiFi",
           "payload":"0_0_1_2_2"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_1_1_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Vous avez des problèmes d'envoi et/ou de réception de SMS/MMS ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Que-faire-si-vous-avez-des-problèmes-d-envoi-et-ou-de-réception/ta-p/128",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Que-faire-si-vous-avez-des-problèmes-d-envoi-et-ou-de-réception/ta-p/128",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Que-faire-si-vous-avez-des-problèmes-d-envoi-et-ou-de-réception/ta-p/128"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Vous avez des problèmes de réception ou d'émission d'appel?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Que-faire-en-cas-de-problèmes-de-réception-ou-d-émission-d/ta-p/127",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Que-faire-en-cas-de-problèmes-de-réception-ou-d-émission-d/ta-p/127",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Que-faire-en-cas-de-problèmes-de-réception-ou-d-émission-d/ta-p/127"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_1_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_1_5") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment régler votre problème d'accès à l'Internet mobile ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-régler-votre-problème-d-accès-à-l-Internet-mobile/ta-p/129",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-régler-votre-problème-d-accès-à-l-Internet-mobile/ta-p/129",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-régler-votre-problème-d-accès-à-l-Internet-mobile/ta-p/129"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_2") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0"},
           {"content_type":"text",
           "title":"Accès Espace Client",
           "payload":"0_0_2_0"},
           {"content_type":"text",
           "title":"Changer mot de passe",
           "payload":"0_0_2_1"},
           {"content_type":"text",
           "title":"Récup. mot de passe",
           "payload":"0_0_2_2"},
           {"content_type":"text",
           "title":"Modifier mes données",
           "payload":"0_0_2_3"},
           {"content_type":"text",
           "title":"Changer n° téléphone",
           "payload":"0_0_2_4"},
           {"content_type":"text",
           "title":"Transférer forfait",
           "payload":"0_0_2_5"},
           {"content_type":"text",
           "title":"Procuration en lign",
           "payload":"0_0_2_6"},
           {"content_type":"text",
           "title":"Mandat prélèvement",
           "payload":"0_0_2_7"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_1_2_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_2_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_1_2_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_2_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Modifier le mot de passe de votre Espace client",
           "item_url":"https://www.sfr.fr/mon-espace-client/identifiants/",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/mon-espace-client/identifiants/",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment changer le mot de passe de votre Espace client ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_2_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Accéder votre Espace client et gérer votre offre mobile",
           "item_url":"http://espace-client.sfr.fr/",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://espace-client.sfr.fr/",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment se connecter à votre Espace Client ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_2_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Récupérer un nouveau mot de passe pour vous connecter à votre Espace Client",
           "item_url":"https://www.sfr.fr/parcours-securite/password/oubliMotDePasse/identifiant.action",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/parcours-securite/password/oubliMotDePasse/identifiant.action",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"La récupération de votre mot de passe est impossible ?",
           "item_url":"http://assistance.sfr.fr/runtime/form/contact/mobile/red/unauthent/get.html",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://assistance.sfr.fr/runtime/form/contact/mobile/red/unauthent/get.html",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment obtenir un nouveau mot de passe et le personnaliser par la suite ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_2_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment modifier ou conserver votre numéro de téléphone ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-by-SFR-comment-modifier-ou-conserver-votre-numéro-de/ta-p/422",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-by-SFR-comment-modifier-ou-conserver-votre-numéro-de/ta-p/422",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Clients-RED-by-SFR-comment-modifier-ou-conserver-votre-numéro-de/ta-p/422"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_2_5") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Céder votre forfait mobile à un proche",
           "item_url":"https://www.sfr.fr/routage/changer-titulaire",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/changer-titulaire",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Tout ce qu'il faut savoir avant de céder son forfait",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_3") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0"},
           {"content_type":"text",
           "title":"Suivre consommation",
           "payload":"0_0_3_0"},
           {"content_type":"text",
           "title":"Payer votre facture",
           "payload":"0_0_3_1"},
           {"content_type":"text",
           "title":"Consulter facture",
           "payload":"0_0_3_2"},
           {"content_type":"text",
           "title":"Comprendre facture",
           "payload":"0_0_3_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_3_0") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0_3"},
           {"content_type":"text",
           "title":"Encours de conso",
           "payload":"0_0_3_0_0"},
           {"content_type":"text",
           "title":"Conso. derniers mois",
           "payload":"0_0_3_0_1"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_2_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Modifier vos données personnelles et bancaires",
           "item_url":"https://www.sfr.fr/routage/votre-contrat",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/votre-contrat",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment modifier vos coordonnées en ligne ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment mettre à jour vos coordonnées bancaires ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-mettre-à-jour-vos-coordonnées-bancaires/ta-p/98",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-mettre-à-jour-vos-coordonnées-bancaires/ta-p/98",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-mettre-à-jour-vos-coordonnées-bancaires/ta-p/98"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment modifier votre adresse email de contact ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-votre-adresse-email-de-contact/ta-p/400",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-votre-adresse-email-de-contact/ta-p/400",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-votre-adresse-email-de-contact/ta-p/400"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_2_6") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Accéder à votre espace de procuration",
           "item_url":"https://www.sfr.fr/mon-espace-client/procurations/",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/mon-espace-client/procurations/",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"La procuration d'une ligne mobile : comment ça marche ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-les-procurations/ta-p/382",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-les-procurations/ta-p/382",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-les-procurations/ta-p/382"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_2_7") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Consulter votre mandat SEPA",
           "item_url":"https://www.sfr.fr/routage/modifier-coordonnes-bancaires",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/modifier-coordonnes-bancaires",
              "title":"Lire sur le Web"}]
           },
           {"title":"Depuis l'Espace client",
           "subtitle":"Signer votre mandat SEPA",
           "item_url":"http://espace-client.sfr.fr/infopersonnelles/mandat/previsualisation",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://espace-client.sfr.fr/infopersonnelles/mandat/previsualisation",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre le virement et le prélèvement SEPA",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-le-mandat-de-prélèvement-et-le-TIP-SEPA/ta-p/135",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-le-mandat-de-prélèvement-et-le-TIP-SEPA/ta-p/135",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-le-mandat-de-prélèvement-et-le-TIP-SEPA/ta-p/135"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_3_0_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Suivre votre encours de consommation",
           "item_url":"https://www.sfr.fr/routage/info-conso",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/info-conso",
              "title":"Lire sur le Web"}]
           },
           {"title":"Depuis l'Espace client",
           "subtitle":"Détail de votre encours de consommation hors et au-delà de votre forfait",
           "item_url":"https://www.sfr.fr/routage/conso-detaillee",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/conso-detaillee",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Pour commander, activer une carte SIM, composez le 963 depuis votre mobile (gratuit) ou le 06 1000 1963 depuis un fixe (prix d'un appel vers un mobile).",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment suivre votre consommation",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-suivre-votre-consommation/ta-p/99",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-suivre-votre-consommation/ta-p/99",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-suivre-votre-consommation/ta-p/99"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_3_3") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_0_3"},
           {"content_type":"text",
           "title":"Analyse 1re facture",
           "payload":"0_0_3_3_0"},
           {"content_type":"text",
           "title":"Factures mensuelles",
           "payload":"0_0_3_3_1"},
           {"content_type":"text",
           "title":"Facture groupée",
           "payload":"0_0_3_3_2"},
           {"content_type":"text",
           "title":"Votre hors forfait",
           "payload":"0_0_3_3_3"},
           {"content_type":"text",
           "title":"Facture résiliation",
           "payload":"0_0_3_3_4"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_3_0_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Consulter le bilan conso de vos 3 dernières factures",
           "item_url":"https://espace-client.sfr.fr/facture-mobile/bilan-conso",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://espace-client.sfr.fr/facture-mobile/bilan-conso",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre son bilan conso",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-suivre-votre-consommation/ta-p/99",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-suivre-votre-consommation/ta-p/99",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-suivre-votre-consommation/ta-p/99"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_3_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Accéder au paiement en ligne de votre facture",
           "item_url":"https://www.sfr.fr/routage/payer-facture",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/payer-facture",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Pour régler vos factures, composez le 963 depuis votre mobile (gratuit) ou le 06 1000 1963 depuis un fixe (prix d'un appel vers un mobile).",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment payer votre facture mobile RED ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quels-sont-les-différents-modes-de-règlement-d-une-facture-RED/ta-p/142",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quels-sont-les-différents-modes-de-règlement-d-une-facture-RED/ta-p/142",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Quels-sont-les-différents-modes-de-règlement-d-une-facture-RED/ta-p/142"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_3_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Accéder à vos factures",
           "item_url":"https://www.sfr.fr/routage/conso-et-facture",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/conso-et-facture",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment consulter votre facture ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-consulter-votre-facture-mobile-RED-by-SFR/ta-p/119",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-consulter-votre-facture-mobile-RED-by-SFR/ta-p/119",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-consulter-votre-facture-mobile-RED-by-SFR/ta-p/119"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Comment payer votre facture mobile RED ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_3_3_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre votre première facture",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-première-facture-Mobile-RED-by-SFR/ta-p/20857",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-première-facture-Mobile-RED-by-SFR/ta-p/20857",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-première-facture-Mobile-RED-by-SFR/ta-p/20857"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_0_3_3_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre votre facture mensuelle",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-mensuelle-Mobile-RED-by-SFR/ta-p/20866",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-mensuelle-Mobile-RED-by-SFR/ta-p/20866",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-mensuelle-Mobile-RED-by-SFR/ta-p/20866"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre votre facture mensuelle détaillée",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-mensuelle-détaillée-Mobile-RED/ta-p/20867",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-mensuelle-détaillée-Mobile-RED/ta-p/20867",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-mensuelle-détaillée-Mobile-RED/ta-p/20867"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Savoir ce qui est inclus dans votre forfait",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-différentes-communications-présentes-sur-votre/ta-p/132",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-différentes-communications-présentes-sur-votre/ta-p/132",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-différentes-communications-présentes-sur-votre/ta-p/132"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1") {
       output = {};
       output.text = "Votre demande concerne...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0"},
           {"content_type":"text",
           "title":"RED + BOX",
           "payload":"0_1_0"},
           {"content_type":"text",
           "title":"RED Fibre",
           "payload":"0_1_1"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_0") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1"},
           {"content_type":"text",
           "title":"Forfaits / Options",
           "payload":"0_1_0_0"},
           {"content_type":"text",
           "title":"Equipements Box + TV",
           "payload":"0_1_0_1"},
           {"content_type":"text",
           "title":"Contrats / Compte",
           "payload":"0_1_0_2"},
           {"content_type":"text",
           "title":"Conso / Facture",
           "payload":"0_1_0_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_3_3_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre votre facture groupée",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-groupée-Mobile-RED-by-SFR/ta-p/20868",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-groupée-Mobile-RED-by-SFR/ta-p/20868",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-groupée-Mobile-RED-by-SFR/ta-p/20868"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_0") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_0"},
           {"content_type":"text",
           "title":"Gérer votre commande",
           "payload":"0_1_0_0_0"},
           {"content_type":"text",
           "title":"Résilier vtore offre",
           "payload":"0_1_0_0_1"},
           {"content_type":"text",
           "title":"RED Internet + Mob.",
           "payload":"0_1_0_0_2"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_3_3_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre votre hors-forfait",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-hors-forfait/ta-p/21315",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-hors-forfait/ta-p/21315",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-hors-forfait/ta-p/21315"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Tout savoir sur les achats multimédias",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Internet-vos-achats-et-abonnements-de-services-multimédia-avec/ta-p/81",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Internet-vos-achats-et-abonnements-de-services-multimédia-avec/ta-p/81",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Internet-vos-achats-et-abonnements-de-services-multimédia-avec/ta-p/81"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_0"},
           {"content_type":"text",
           "title":"Renvoie équipements",
           "payload":"0_1_0_1_0"},
           {"content_type":"text",
           "title":"Modem",
           "payload":"0_1_0_1_1"},
           {"content_type":"text",
           "title":"Décodeur TV",
           "payload":"0_1_0_1_2"},
           {"content_type":"text",
           "title":"Téléphone",
           "payload":"0_1_0_1_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_3_3_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre votre facture de résiliation",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-de-résiliation-Mobile-RED-by/ta-p/20871",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-de-résiliation-Mobile-RED-by/ta-p/20871",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-comprendre-votre-facture-de-résiliation-Mobile-RED-by/ta-p/20871"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_0_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Suivre ou annuler votre commande RED + BOX",
           "item_url":"https://espace-client.sfr.fr/suivi-commande/rechercheCommandeADSL",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://espace-client.sfr.fr/suivi-commande/rechercheCommandeADSL",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Comprendre votre facture mensuelle",
           "item_url":"http://red-by-sfr.fr/suivi-de-commande.html",
           "image_url":"https://59387558.ngrok.io/assets/logo.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/suivi-de-commande.html",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_1") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_0_1"},
           {"content_type":"text",
           "title":"Installer modem",
           "payload":"0_1_0_1_1_0"},
           {"content_type":"text",
           "title":"Gestion du modem",
           "payload":"0_1_0_1_1_1"},
           {"content_type":"text",
           "title":"Utiliser Ethernet",
           "payload":"0_1_0_1_1_2"},
           {"content_type":"text",
           "title":"Se connecter en Wifi",
           "payload":"0_1_0_1_1_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_0_0_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre votre facture groupée",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_0_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comprendre votre facture de résiliation",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-bénéficier-de-la-remise-RED-Mobile-Internet/ta-p/421",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-bénéficier-de-la-remise-RED-Mobile-Internet/ta-p/421",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Demander une étiquette de retour d’équipement",
           "item_url":"https://www.sfr.fr/routage/etiquette-retour",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/etiquette-retour",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Renvoyer vos équipements",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-renvoyer-votre-équipement-fixe/ta-p/568",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-renvoyer-votre-équipement-fixe/ta-p/568",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-renvoyer-votre-équipement-fixe/ta-p/568"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_1_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_2") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_0_1"},
           {"content_type":"text",
           "title":"Décodeur TV",
           "payload":"0_1_0_1_2_0"},
           {"content_type":"text",
           "title":"Disque dur externe",
           "payload":"0_1_0_1_2_1"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_0_1_1_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_1_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_3") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_0_1"},
           {"content_type":"text",
           "title":"Gérer options appel",
           "payload":"0_1_0_1_3_0"},
           {"content_type":"text",
           "title":"Répondeur fixe",
           "payload":"0_1_0_1_3_1"},
           {"content_type":"text",
           "title":"Problème d'appels",
           "payload":"0_1_0_1_3_2"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_0_1_1_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_2_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_2_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_2") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_0"},
           {"content_type":"text",
           "title":"Accès Espace Client",
           "payload":"0_1_0_2_0"},
           {"content_type":"text",
           "title":"Changer mot de passe",
           "payload":"0_1_0_2_1"},
           {"content_type":"text",
           "title":"Récup. mot de passe",
           "payload":"0_1_0_2_2"},
           {"content_type":"text",
           "title":"Modifier mes données",
           "payload":"0_1_0_2_3"},
           {"content_type":"text",
           "title":"Procuration de ligne",
           "payload":"0_1_0_2_4"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_0_1_3_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_3_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_1_3_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_2_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Accéder à votre espace client : première connexion",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-se-connecter-pour-la-première-fois-à-votre-Espace-Client/ta-p/413",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-se-connecter-pour-la-première-fois-à-votre-Espace-Client/ta-p/413",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-se-connecter-pour-la-première-fois-à-votre-Espace-Client/ta-p/413"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_2_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Modifier le mot de passe de votre Espace client",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-le-mot-de-passe-de-votre-Espace-Client-RED/ta-p/415",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-le-mot-de-passe-de-votre-Espace-Client-RED/ta-p/415",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-le-mot-de-passe-de-votre-Espace-Client-RED/ta-p/415"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_2_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Récupérer un nouveau mot de passe pour vous connecter à votre Espace Client",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Que-faire-en-cas-de-mot-de-passe-perdu/ta-p/416",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Que-faire-en-cas-de-mot-de-passe-perdu/ta-p/416",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Que-faire-en-cas-de-mot-de-passe-perdu/ta-p/416"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_3") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_0"},
           {"content_type":"text",
           "title":"Suivre consommation",
           "payload":"0_1_0_3_0"},
           {"content_type":"text",
           "title":"Gérer votre facture",
           "payload":"0_1_0_3_1"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_0_3_1") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_0_3"},
           {"content_type":"text",
           "title":"Consulter facture",
           "payload":"0_1_0_3_1_0"},
           {"content_type":"text",
           "title":"Signer mandat SEPA",
           "payload":"0_1_0_3_1_1"},
           {"content_type":"text",
           "title":"Payer votre facture",
           "payload":"0_1_0_3_1_2"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_0_2_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Modifier en toute autonomie vos coordonnées bancaires",
           "item_url":"https://www.sfr.fr/routage/modifier-coordonnes-bancaires",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/modifier-coordonnes-bancaires",
              "title":"Lire sur le Web"}]
           },
           {"title":"Depuis l'Espace client",
           "subtitle":"Modifier en toute autonomie votre adresse postale",
           "item_url":"https://www.sfr.fr/routage/mettre-a-jour-mes-adresses-de-contact",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/mettre-a-jour-mes-adresses-de-contact",
              "title":"Lire sur le Web"}]
           },
           {"title":"Depuis l'Espace client",
           "subtitle":"Mettre à jour votre e-mail de contact",
           "item_url":"https://www.sfr.fr/routage/e-mail-contact",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/e-mail-contact",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Modifier vos données personnelles et bancaires",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_2_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Accéder à votre espace de procuration",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-les-procurations/ta-p/382",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-les-procurations/ta-p/382",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-les-procurations/ta-p/382"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_3_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1"},
           {"content_type":"text",
           "title":"Forfaits / Options",
           "payload":"0_1_1_0"},
           {"content_type":"text",
           "title":"Equipements Box + TV",
           "payload":"0_1_1_1"},
           {"content_type":"text",
           "title":"Contrats / Compte",
           "payload":"0_1_1_2"},
           {"content_type":"text",
           "title":"Conso / Facture",
           "payload":"0_1_1_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_1_0") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_1"},
           {"content_type":"text",
           "title":"Gérer votre commande",
           "payload":"0_1_1_0_0"},
           {"content_type":"text",
           "title":"Les offres RED Fibre",
           "payload":"0_1_1_0_1"},
           {"content_type":"text",
           "title":"RED Internet + Mob.",
           "payload":"0_1_1_0_2"},
           {"content_type":"text",
           "title":"Résilier vtore offre",
           "payload":"0_1_1_0_3"},
           {"content_type":"text",
           "title":"Déménagement",
           "payload":"0_1_1_0_4"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_0_3_1_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Consulter votre facture",
           "item_url":"https://www.sfr.fr/routage/consulter-facture",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/consulter-facture",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_3_1_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Payer en ligne votre facture",
           "item_url":"https://www.sfr.fr/routage/payer-facture",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/payer-facture",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Payer votre facture par carte bancaire en appelant le serveur vocal",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_0_3_1_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Signer votre mandat de prélèvement (SEPA)",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-le-mandat-de-prélèvement-et-le-TIP-SEPA/ta-p/135",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-le-mandat-de-prélèvement-et-le-TIP-SEPA/ta-p/135",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-le-mandat-de-prélèvement-et-le-TIP-SEPA/ta-p/135"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_0_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Votre suivi de commande RED by SFR",
           "item_url":"http://red-by-sfr.fr/suivi-de-commande.html",
           "image_url":"https://59387558.ngrok.io/assets/logo.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/suivi-de-commande.html",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_0_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_1"},
           {"content_type":"text",
           "title":"Modem",
           "payload":"0_1_1_1_0"},
           {"content_type":"text",
           "title":"Mini Décodeur TV",
           "payload":"0_1_1_1_1"},
           {"content_type":"text",
           "title":"Service TV",
           "payload":"0_1_1_1_2"},
           {"content_type":"text",
           "title":"Téléphone",
           "payload":"0_1_1_1_3"},
           {"content_type":"text",
           "title":"Renvoie équipements",
           "payload":"0_1_1_1_4"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_1_1_0") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_1_1"},
           {"content_type":"text",
           "title":"Installer modem",
           "payload":"0_1_1_1_0_0"},
           {"content_type":"text",
           "title":"Gestion du modem",
           "payload":"0_1_1_1_0_1"},
           {"content_type":"text",
           "title":"Utiliser Ethernet",
           "payload":"0_1_1_1_0_2"},
           {"content_type":"text",
           "title":"Se connecter en Wifi",
           "payload":"0_1_1_1_0_3"},
           {"content_type":"text",
           "title":"Contrôle parental",
           "payload":"0_1_1_1_0_4"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_1_0_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_0_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Bénéficier de la remise RED Internet + Mobile",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-bénéficier-de-la-remise-RED-Mobile-Internet/ta-p/421",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-bénéficier-de-la-remise-RED-Mobile-Internet/ta-p/421",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_0_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_0_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Accéder à l'interface de gestion du modem",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-son-modem-RED-BOX-Très-Haut-Débit/ta-p/118",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-son-modem-RED-BOX-Très-Haut-Débit/ta-p/118",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-son-modem-RED-BOX-Très-Haut-Débit/ta-p/118"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_0_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Installer votre modem RED Fibre",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Installation-de-votre-modem-RED-BOX-Très-Haut-Débit-By-SFR/ta-p/110",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Installation-de-votre-modem-RED-BOX-Très-Haut-Débit-By-SFR/ta-p/110",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Installation-de-votre-modem-RED-BOX-Très-Haut-Débit-By-SFR/ta-p/110"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_1") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_1_1"},
           {"content_type":"text",
           "title":"Décodeur TV",
           "payload":"0_1_1_1_1_0"},
           {"content_type":"text",
           "title":"Utiliser Ethernet",
           "payload":"0_1_1_1_1_1"},
           {"content_type":"text",
           "title":"Utiliser services TV",
           "payload":"0_1_1_1_1_2"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_1_1_0_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Se connecter en Ethernet",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-son-modem-RED-BOX-Très-Haut-Débit/ta-p/118",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-son-modem-RED-BOX-Très-Haut-Débit/ta-p/118",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-son-modem-RED-BOX-Très-Haut-Débit/ta-p/118"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_0_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Se connecter en Wifi",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-se-connecter-en-wi-fi-avec-le-modem-RED-BOX-Très-Haut/ta-p/288",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-se-connecter-en-wi-fi-avec-le-modem-RED-BOX-Très-Haut/ta-p/288",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-se-connecter-en-wi-fi-avec-le-modem-RED-BOX-Très-Haut/ta-p/288"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment modifier le nom du réseau wifi (SSID) de votre modem ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-se-connecter-en-wi-fi-avec-le-modem-RED-BOX-Très-Haut/ta-p/288",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-se-connecter-en-wi-fi-avec-le-modem-RED-BOX-Très-Haut/ta-p/288",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-se-connecter-en-wi-fi-avec-le-modem-RED-BOX-Très-Haut/ta-p/288"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_0_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_1_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_3") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_1_1"},
           {"content_type":"text",
           "title":"Gérer options appel",
           "payload":"0_1_1_1_3_0"},
           {"content_type":"text",
           "title":"Répondeur fixe",
           "payload":"0_1_1_1_3_1"},
           {"content_type":"text",
           "title":"Problème d'appels",
           "payload":"0_1_1_1_3_2"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_1_1_1_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Se connecter en Ethernet",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-votre-Mini-décodeur-TV/ta-p/301",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-votre-Mini-décodeur-TV/ta-p/301",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-votre-Mini-décodeur-TV/ta-p/301"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_1_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment utiliser le contrôle du direct ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment enregistrer un programme TV?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment utiliser la TV à la demande (Replay) ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment louer un programme avec le Vidéo Club à Domicile (VOD) ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Quelles-sont-les-fonctionnalités-proposées-par-votre-Mini/ta-p/356"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_3_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Gérer vos options d'appels",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-vos-options-d-appels-téléphoniques-avec-le-modem/ta-p/573",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-vos-options-d-appels-téléphoniques-avec-le-modem/ta-p/573",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-vos-options-d-appels-téléphoniques-avec-le-modem/ta-p/573"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_2") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_1"},
           {"content_type":"text",
           "title":"Accès Espace Client",
           "payload":"0_1_1_2_0"},
           {"content_type":"text",
           "title":"Changer mot de passe",
           "payload":"0_1_1_2_1"},
           {"content_type":"text",
           "title":"Récup. mot de passe",
           "payload":"0_1_1_2_2"},
           {"content_type":"text",
           "title":"Modifier mes données",
           "payload":"0_1_1_2_3"},
           {"content_type":"text",
           "title":"Procuration de ligne",
           "payload":"0_1_1_2_4"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_1_1_3_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment utiliser votre répondeur fixe ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-votre-répondeur-fixe-avec-le-modem-RED-BOX-Très/ta-p/572",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-votre-répondeur-fixe-avec-le-modem-RED-BOX-Très/ta-p/572",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-utiliser-votre-répondeur-fixe-avec-le-modem-RED-BOX-Très/ta-p/572"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_3_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Problème de reception, d'émission d'appels",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Dépanner-votre-téléphonie-RED-BOX-Très-Haut-Débit-les-premier/ta-p/328",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Dépanner-votre-téléphonie-RED-BOX-Très-Haut-Débit-les-premier/ta-p/328",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Dépanner-votre-téléphonie-RED-BOX-Très-Haut-Débit-les-premier/ta-p/328"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_1_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace Client",
           "subtitle":"Demander une étiquette de retour d’équipement",
           "item_url":"https://www.sfr.fr/routage/etiquette-retour",
           "image_url":"https://59387558.ngrok.io",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/etiquette-retour",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Panne, changement de matériel ou résiliation de ligne… Comment renvoyer votre équipement ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-renvoyer-votre-équipement-fixe/ta-p/568",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-renvoyer-votre-équipement-fixe/ta-p/568",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-renvoyer-votre-équipement-fixe/ta-p/568"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_2_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Accéder à votre Espace client et gérer votre offre en ligne",
           "item_url":"http://espace-client.sfr.fr/",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://espace-client.sfr.fr/",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment se connecter à votre Espace Client ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_2_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Modifier le mot de passe de votre Espace client",
           "item_url":"https://www.sfr.fr/mon-espace-client/identifiants/",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/mon-espace-client/identifiants/",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment changer le mot de passe de votre Espace client SFR ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_3") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_1"},
           {"content_type":"text",
           "title":"Suivre consommation",
           "payload":"0_1_1_3_0"},
           {"content_type":"text",
           "title":"Gérer votre facture",
           "payload":"0_1_1_3_1"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_1_2_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Récupérer un nouveau mot de passe pour vous connecter à votre Espace Client",
           "item_url":"https://www.sfr.fr/parcours-securite/password/oubliMotDePasse/identifiant.action",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/parcours-securite/password/oubliMotDePasse/identifiant.action",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment obtenir un nouveau mot de passe et le personnaliser par la suite ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/A-quoi-sert-votre-Espace-Client-RED-by-SFR-et-comment-l-utiliser/ta-p/170"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_3_1") {
       output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0_1_1_3"},
           {"content_type":"text",
           "title":"Consulter facture",
           "payload":"0_1_1_3_1_0"},
           {"content_type":"text",
           "title":"Signer mandat SEPA",
           "payload":"0_1_1_3_1_1"},
           {"content_type":"text",
           "title":"Payer votre facture",
           "payload":"0_1_1_3_1_2"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_1_2_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Modifier vos données personnelles et bancaires",
           "item_url":"https://www.sfr.fr/routage/votre-contrat",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/votre-contrat",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment modifier vos coordonnées en ligne ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-vos-coordonnées-en-ligne/ta-p/239"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment mettre à jour vos coordonnées bancaires ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-mettre-à-jour-vos-coordonnées-bancaires/ta-p/98",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-mettre-à-jour-vos-coordonnées-bancaires/ta-p/98",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-mettre-à-jour-vos-coordonnées-bancaires/ta-p/98"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment modifier votre adresse email de contact ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-votre-adresse-email-de-contact/ta-p/400",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-votre-adresse-email-de-contact/ta-p/400",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-modifier-votre-adresse-email-de-contact/ta-p/400"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_2_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Accéder à votre espace de procuration",
           "item_url":"https://www.sfr.fr/mon-espace-client/procurations/",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/mon-espace-client/procurations/",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"La procuration d'une ligne fixe : comment ça marche ?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-les-procurations/ta-p/382",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-les-procurations/ta-p/382",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-gérer-les-procurations/ta-p/382"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_3_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Suivre votre consommation",
           "item_url":"https://espace-client.sfr.fr/facture-fixe/consultation",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://espace-client.sfr.fr/facture-fixe/consultation",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_3_1_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Accéder à vos dernières factures",
           "item_url":"https://www.sfr.fr/routage/consulter-facture",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/consulter-facture",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_3_1_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Signer votre mandat de prélèvement (SEPA)",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-le-mandat-de-prélèvement-et-le-TIP-SEPA/ta-p/135",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-le-mandat-de-prélèvement-et-le-TIP-SEPA/ta-p/135",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-le-mandat-de-prélèvement-et-le-TIP-SEPA/ta-p/135"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_1_1_3_1_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Depuis l'Espace client",
           "subtitle":"Payer en ligne votre facture",
           "item_url":"https://www.sfr.fr/routage/payer-facture",
           "image_url":"https://59387558.ngrok.io/assets/client.png",
           "buttons": [
              {"type":"web_url",
              "url":"https://www.sfr.fr/routage/payer-facture",
              "title":"Lire sur le Web"}]
           },
           {"title":"Serveur vocal (24h/24, 7j/7)",
           "subtitle":"Payer votre facture par carte bancaire en appelant le serveur vocal",
           "item_url":"",
           "image_url":"https://59387558.ngrok.io/assets/phone.jpg",

           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver la Communauté dédiée RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
           "image_url":"https://59387558.ngrok.io/assets/communaute.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/Aide-et-Conseils/ct-p/aide-et-conseils",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_2") {
       output = {};
       output.text = "Votre demande concerne...";
       output.proposals = [
           {"content_type":"text",
           "title":"Précédent",
           "payload":"0"},
           {"content_type":"text",
           "title":"Forfait Mobile RED",
           "payload":"0_2_0"},
           {"content_type":"text",
           "title":"L'offre RED Fibre",
           "payload":"0_2_1"},
           {"content_type":"text",
           "title":"Le réseau SFR",
           "payload":"0_2_2"},
           {"content_type":"text",
           "title":"Désimlocker mobile",
           "payload":"0_2_3"},
           {"content_type":"text",
           "title":"Changer d'opérateur",
           "payload":"0_2_4"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_2_0") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Découvrir les forfaits mobile RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-les-offres-Mobile-RED-by-SFR/ta-p/418",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-les-offres-Mobile-RED-by-SFR/ta-p/418",
              "title":"Lire sur le Web"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Souscrire à un forfait mobile sans engagement RED by SFR",
           "item_url":"http://red-by-sfr.fr/forfaits-mobiles/",
           "image_url":"https://59387558.ngrok.io/assets/logo.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/forfaits-mobiles/",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_2_1") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Souscrire à un forfait mobile sans engagement RED by SFR",
           "item_url":"http://red-by-sfr.fr/forfaits-mobiles/",
           "image_url":"https://59387558.ngrok.io/assets/logo.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/forfaits-mobiles/",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_2_2") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Le réseau internet et mobile de SFR",
           "item_url":"http://red-by-sfr.fr/couverture-reseau/%20%20",
           "image_url":"https://59387558.ngrok.io/assets/logo.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/couverture-reseau/%20%20",
              "title":"Lire sur le Web"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Le réseau Fibre : voir notre couverture",
           "item_url":"http://red-by-sfr.fr/couverture-reseau/%20%20",
           "image_url":"https://59387558.ngrok.io/assets/logo.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/couverture-reseau/%20%20",
              "title":"Lire sur le Web"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Le réseau Mobile : voir notre couverture",
           "item_url":"http://red-by-sfr.fr/couverture-reseau/%20%20",
           "image_url":"https://59387558.ngrok.io/assets/logo.jpg",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/couverture-reseau/%20%20",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_2_3") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else if (payload == "0_2_4") {
       output = {};
       output.text = "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment changer d'opérateur mobile en conservant votre numéro?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-en-conservant-son-numéro-mobile/ta-p/424",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-en-conservant-son-numéro-mobile/ta-p/424",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-en-conservant-son-numéro-mobile/ta-p/424"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
           "image_url":"https://59387558.ngrok.io/assets/faq.png",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ",
              "title":"Lire sur le Web"}]
           }
       ];
       output2 = {};
       output2.text = "Avez vous trouvé ce que vous cherchiez?";
       output2.proposals = [
           {"content_type":"text",
           "title":"oui",
           "payload":"finish"},
           {"content_type":"text",
           "title":"non",
           "payload":"passer_conseiller"}];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
       setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);
    }
    else {
        // Message d'erreur pour payload non connu
        sendCallback("text", "~~~~DEV ERROR~~~~           in button-controller\n question non encore implémentée ou payload non reconnu", senderId);
    }

    // on enregistre les reponses
    if (output.text){
        context.reponses[num_message] = output.text;
    }
    else {
        context.reponses[num_message] = output;
    }
}

var exports = module.exports = {};

exports.payloadAnalyser = payloadAnalyser;
