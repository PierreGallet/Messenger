/*
 * This controller prints multiple choices answers with buttons to the talking user.
 */

var config = require('../config');
var request = require('request');


function payloadAnalyser(event, sendCallback) {

    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    var payload = message.quick_reply.payload;

    if (payload == "payloadOuiGiveInfos") {
        // TODO : sauvegarder informations
        sendCallback("text", "Nous avons enregistré vos informations.", senderId);
    }
    else if (payload == "payloadNonGiveInfos") {
        // TODO : sendMessage(recipientID, "Vos informations n'ont pas été enregistrées.");
        sendCallback("text", "Vos informations n'ont pas été enregistrées. Pouvez vous nous les transmettre à nouveau?", senderId);

    }
    else if (payload == "payloadOuiIntent") {
        // TODO : Transmet l'information à python
        sendCallback("text", "Pouvez-vous nous donner votre adresse mail et numéro de téléphone afin de poursuivre la résolution de votre problème s'il-vous-plaît?", senderId);

    }
    else if (payload == "payloadNonIntent") {
        // TODO : Transmet l'info à python
        sendCallback("text", "Excusez-nous, pouvez-vous reformuler votre question s'il-vous-plaît.", senderId);
    }
    else if (payload == "0") {
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
    }
    else if (payload == "0_0") {
       var output = {};
       output.text = "Votre demande concerne...";
       output.proposals = [
           {"content_type":"text",
           "title":"Forfait et options",
           "payload":"0_0_0"},
           {"content_type":"text",
           "title":"Mobile, carte SIM e",
           "payload":"0_0_1"},
           {"content_type":"text",
           "title":"Contrat, compte et ",
           "payload":"0_0_2"},
           {"content_type":"text",
           "title":"Consommation et fac",
           "payload":"0_0_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1") {
       var output = {};
       output.text = "Votre demande concerne...";
       output.proposals = [
           {"content_type":"text",
           "title":"RED + BOX",
           "payload":"0_1_0"},
           {"content_type":"text",
           "title":"RED Fibre",
           "payload":"0_1_1"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_2") {
       var output = {};
       output.text = "Votre demande concerne...";
       output.proposals = [
           {"content_type":"text",
           "title":"Les forfaits mobile",
           "payload":"0_2_0"},
           {"content_type":"text",
           "title":"L'offre RED Fibre",
           "payload":"0_2_1"},
           {"content_type":"text",
           "title":"Le réseau SFR",
           "payload":"0_2_2"},
           {"content_type":"text",
           "title":"Désimlocker son mob",
           "payload":"0_2_3"},
           {"content_type":"text",
           "title":"Changer d'opérateur",
           "payload":"0_2_4"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_0") {
       var output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Souscrire à un nouv",
           "payload":"0_0_0_0"},
           {"content_type":"text",
           "title":"Changer de forfait",
           "payload":"0_0_0_1"},
           {"content_type":"text",
           "title":"Résilier votre forf",
           "payload":"0_0_0_2"},
           {"content_type":"text",
           "title":"Ajouter, résilier u",
           "payload":"0_0_0_3"},
           {"content_type":"text",
           "title":"Recharger un forfai",
           "payload":"0_0_0_4"},
           {"content_type":"text",
           "title":"Demander la protabi",
           "payload":"0_0_0_5"},
           {"content_type":"text",
           "title":"Tout savoir sur l'I",
           "payload":"0_0_0_6"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_1") {
       var output = {};
       output.text = "Plus précisément";
       output.proposals = [
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
    else if (payload == "0_0_2") {
       var output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Accéder à votre esp",
           "payload":"0_0_2_0"},
           {"content_type":"text",
           "title":"Changer votre mot d",
           "payload":"0_0_2_1"},
           {"content_type":"text",
           "title":"Récupérer votre mot",
           "payload":"0_0_2_2"},
           {"content_type":"text",
           "title":"Modifier vos donnée",
           "payload":"0_0_2_3"},
           {"content_type":"text",
           "title":"Changer de numéro d",
           "payload":"0_0_2_4"},
           {"content_type":"text",
           "title":"Céder votre forfait",
           "payload":"0_0_2_5"},
           {"content_type":"text",
           "title":"Demander ou gérer v",
           "payload":"0_0_2_6"},
           {"content_type":"text",
           "title":"Signer, consulter v",
           "payload":"0_0_2_7"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_0_3") {
       var output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Suivre votre consom",
           "payload":"0_0_3_0"},
           {"content_type":"text",
           "title":"Payer votre facture",
           "payload":"0_0_3_1"},
           {"content_type":"text",
           "title":"Consulter votre fac",
           "payload":"0_0_3_2"},
           {"content_type":"text",
           "title":"Comprendre votre fa",
           "payload":"0_0_3_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_0") {
       var output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Forfait, options et",
           "payload":"0_1_0_0"},
           {"content_type":"text",
           "title":"Equipements Box + TV",
           "payload":"0_1_0_1"},
           {"content_type":"text",
           "title":"Contrats, compte et",
           "payload":"0_1_0_2"},
           {"content_type":"text",
           "title":"Consommation et fac",
           "payload":"0_1_0_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_1_1") {
       var output = {};
       output.text = "Plus précisément...";
       output.proposals = [
           {"content_type":"text",
           "title":"Forfait, options et",
           "payload":"0_1_1_0"},
           {"content_type":"text",
           "title":"Equipements Box + TV",
           "payload":"0_1_1_1"},
           {"content_type":"text",
           "title":"Contrats, compte et",
           "payload":"0_1_1_2"},
           {"content_type":"text",
           "title":"Consommation et fac",
           "payload":"0_1_1_3"}
       ];
       sendCallback("quick_reply", output, senderId);
    }
    else if (payload == "0_2_0") {
       var output = {};
       output.text = "Voici nos solutions immédiates. Avez vous trouvé votre réponse?";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Découvrir les forfaits mobile RED by SFR",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-les-offres-Mobile-RED-by-SFR/ta-p/418#sfrintid=A_contact_RNEW-1",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-les-offres-Mobile-RED-by-SFR/ta-p/418#sfrintid=A_contact_RNEW-1",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_0_0"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Souscrire à un forfait mobile sans engagement RED by SFR",
           "item_url":"http://red-by-sfr.fr/forfaits-mobiles/#sfrintid=A_contact_RNEW-1",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/forfaits-mobiles/#sfrintid=A_contact_RNEW-1",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_0_1"}]
           }
       ];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
    }
    else if (payload == "0_2_1") {
       var output = {};
       output.text = "Voici nos solutions immédiates. Avez vous trouvé votre réponse?";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-2",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-2",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_1_0"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Souscrire à un forfait mobile sans engagement RED by SFR",
           "item_url":"http://red-by-sfr.fr/forfaits-mobiles/#sfrintid=A_contact_RNEW-1",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/forfaits-mobiles/#sfrintid=A_contact_RNEW-1",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_1_1"}]
           }
       ];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
    }
    else if (payload == "0_2_2") {
       var output = {};
       output.text = "Voici nos solutions immédiates. Avez vous trouvé votre réponse?";
       output.proposals = [
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Le réseau internet et mobile de SFR",
           "item_url":"http://red-by-sfr.fr/couverture-reseau/%20%20#sfrintid=A_contact_RNEW-3",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/couverture-reseau/%20%20#sfrintid=A_contact_RNEW-3",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_2_0"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Le réseau Fibre : voir notre couverture",
           "item_url":"http://red-by-sfr.fr/couverture-reseau/%20%20#sfrintid=A_contact_RNEW-3",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/couverture-reseau/%20%20#sfrintid=A_contact_RNEW-3",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_2_1"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"Le réseau Mobile : voir notre couverture",
           "item_url":"http://red-by-sfr.fr/couverture-reseau/%20%20#sfrintid=A_contact_RNEW-3",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://red-by-sfr.fr/couverture-reseau/%20%20#sfrintid=A_contact_RNEW-3",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_2_2"}]
           }
       ];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
    }
    else if (payload == "0_2_3") {
       var output = {};
       output.text = "Voici nos solutions immédiates. Avez vous trouvé votre réponse?";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-4",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-4",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_3_0"}]
           }
       ];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
    }
    else if (payload == "0_2_4") {
       var output = {};
       output.text = "Voici nos solutions immédiates. Avez vous trouvé votre réponse?";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment changer d'opérateur mobile en conservant votre numéro?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-Le-RIO-et-la-portabilité-de-votre/ta-p/424#sfrintid=A_contact_RNEW-5",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-Le-RIO-et-la-portabilité-de-votre/ta-p/424#sfrintid=A_contact_RNEW-5",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_4_0"}]
           },
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-5",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-5",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_4_1"}]
           }
       ];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
    }
    else if (payload == "0_2_1") {
       var output = {};
       output.text = "Voici nos solutions immédiates. Avez vous trouvé votre réponse?";
       output.proposals = [
           {"title":"Consulter nos fiches aide & conseils",
           "subtitle":"Comment changer d'opérateur mobile en conservant votre numéro?",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-Le-RIO-et-la-portabilité-de-votre/ta-p/424#sfrintid=A_contact_RNEW-5",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-Le-RIO-et-la-portabilité-de-votre/ta-p/424#sfrintid=A_contact_RNEW-5",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_1_0"}]
           },
           {"title":"Consulter la communauté Red",
           "subtitle":"Retrouver toute l'Assistance RED",
           "item_url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-5",
           "image_url":"",
           "buttons": [
              {"type":"web_url",
              "url":"http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-5",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_1_1"}]
           },
           {"title":"Accéder à la boutique en ligne",
           "subtitle":"undefined",
           "item_url":"undefined",
           "image_url":"undefined",
           "buttons": [
              {"type":"web_url",
              "url":"undefined",
              "title":"Lire sur le Web"},
              {"type":"postback",
              "title":"Lire ici",
              "payload":"0_2_1_2"}]
           }
       ];
       sendCallback("text", output.text, senderId);
       sendCallback("generic", output, senderId);
    }
    else {
        // Message d'erreur pour payload non connu
        sendCallback("text", "~~~~DEV ERROR~~~~           in button-controller\n question non encore implémentée ou payload non reconnu", senderId);
    }
}

var exports = module.exports = {};

exports.payloadAnalyser = payloadAnalyser;
