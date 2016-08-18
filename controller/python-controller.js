/*
 * This controller is to be used for interraction between the node server and the python algorithms
 */


var config = require('../config');
var pshell = require('python-shell');
var errorMessage = false;
var errorMessageCount = 0;

function isin(list, message){
    for (var i = 0; i < list.length; i++){
        if(message.includes(list[i])){
            return true;
        }
    }
    return false;
}

function past_context(context, intent){
    i = 0;
    while (typeof context[i] !== 'undefined'){
        if(context[i].intent[0] == intent){
            return true;
        }
        else{
            i++;
        }
    }
    return false;
}


function parsingJSON(json, context, num_message, senderID, callback, reset) {

    context[num_message] = json;

    // for the condition below to work with num_message even if we did not understood one stuff [num_message will return as it was at the end]
    num_message_copy = num_message;
    if (context.reponses[num_message-1] == "Nous n'avons pas compris votre message, pouvez-vous le reformuler s'il vous plaît?"){
        if (context.reponses[num_message-2] == "Nous n'avons pas compris votre message, pouvez-vous le reformuler s'il vous plaît?"){
            num_message -= 2;
        }
        else {
            num_message -= 1;
        }
    }

    if (json.intent[0] == "greetings") {
        var output = "";
        if (json.entities.person) {
            var person = json.entities.person;
            output = "Bonjour " + person + ", que pouvons-nous faire pour vous?";
        }
        else {
            output = "Bonjour, que pouvons-nous faire pour vous?";
        }
        callback("text", output, senderID);
    }
    else if (json.intent[0] == "thanks") {
        var output = "Mais de rien, ce fut un plaisir de vous conseiller. Puis-je faire autre chose?";
        callback("text", output, senderID);
    }
    else if (json.entities.bank || json.entities.phone || json.entities.bank || json.entities.zipcode) {
        var mail = json.entities.email;
        var phone = json.entities.phone;
        var bank = json.entities.bank;
        var zipcode = json.entities.zipcode;

        var str = "";

        if (mail && !isSetMail()) { str = str + "Adresse email : " + mail + ". \n\n";}
        if (phone && !isSetPhone()) { str = str + "Telephone : " + phone + ". \n\n";}
        if (bank && !isSetMail()) { str = str + "Banque : " + bank + ". \n\n";}
        if (zipcode && !isSetPhone()) { str = str + "Code Postal : " + zipcode + ". \n\n";}

        if (mail || phone || bank || zipcode) {
            var output = {};
            output.text = "Vous nous avez transmis les informations suivantes : \n\n" + str + "Confirmez-vous ces informations?";
            output.proposals = [{
                    "type":"postback",
                    "title":"Oui",
                    "payload":"payloadOuiGiveInfos"},
                    {"type":"postback",
                     "title":"Non",
                     "payload":"payloadNonGiveInfos"}
                ];
            callback("button", output, senderID);
        }
        else {
            errorMessage = true;
            errorMessageCount += 1;
        }
    }

    else if (context[num_message-1] && context[num_message-1].intent[0] == 'SFR Presse'){
        if (context[num_message_copy].intent[0] == 'plainte_augmentation_facture') {
            var output = "L'augmentation de votre facture n'est pas du à l'option SFR Presse, c'est votre forfait qui a augmenté.";
            callback("text", output, senderID);
        }
        else if (context[num_message_copy].intent[0] == 'resiliation') {
            var output = "J'ai bien compris que vous souhaitiez résilier l'option SFR Presse, cependant je vous informe que celle-ci est gratuite. Souhaitez vous toujours la résilier?";
            callback("text", output, senderID);
        }
        else if (context[num_message_copy].intent[0] == 'demande_info') {
            var output = "L'option Sfr presse est une option gratuite qui vous permet d’accéder chaque mois depuis votre mobile, votre tablette ou votre ordinateur à une sélection de 10 titres de presse parmi des dizaines de journaux et magazines à consulter en WiFi/4G ou hors connexion. Souhaitez vous plus d'information?";
            callback("text", output, senderID);
        }
        else {
            errorMessage = true;
            errorMessageCount += 1;
        }
    }

    else if (context[num_message-1] && context[num_message-1].intent[0] == 'resiliation' && past_context(context, 'SFR Presse')){
        // on sait que sa reponse vient de la reponse qu'on a donné à tel intent
        // on va maintenant trouver la reponse à lui donner selon l'intent actuel et l'intent passé qui donne acces à notre question. (par exemple il pourrait dire oui/non, ou alors quelque chose de plus complexe)
        if (context[num_message_copy].intent[0] == 'plainte_augmentation_facture') {
            var output = "Si votre facture a augmenté, ce n'est pas du à SFR presse, mais à l'augmentation tarifaire de votre forfait mobile.";
            callback("text", output, senderID);
        }
        else if (context[num_message_copy].intent[0] == 'resiliation' || context[num_message_copy].tonalite == 'positive') {
            var output = "Très bien. Pour m'assurer de votre identité, j'aurais besoin du nom de votre banque et de votre code postal, s'il vous plait.";
            callback("text", output, senderID);
        }
        else {
            errorMessage = true;
            errorMessageCount += 1;
        }
    }

    else if (context[num_message-1] && context[num_message-1].intent[0] == 'demande_info' && past_context(context, 'SFR Presse')){
        if (context[num_message_copy].intent[0] == 'resiliation') {
            var output = "J'ai bien compris que vous souhaitiez résilier l'option SFR Presse, cependant je vous informe que celle-ci est gratuite. Souhaitez vous toujours la résilier?";
            callback("text", "Vous avez compris que SFR presse est un service gratuit?", senderID);
        }
        else if (context[num_message_copy].intent[0] == 'demande_info') {
            var output = "Je vous renvoie vers la documentation pour plus d'informations: http://communaute.red-by-sfr.fr/t5/FAQ/SFR-Presse-qu-est-ce-que-c-est/ta-p/26385";
            callback("text", output, senderID);
        }
        else if (context[num_message_copy].intent[0] == 'plainte_augmentation_facture') {
            var output = "Si votre facture a augmenté, ce n'est pas du à SFR presse, mais à l'augmentation tarifaire de votre forfait mobile.";
            callback("text", output, senderID);
        }
        else {
            errorMessage = true;
            errorMessageCount += 1;
        }
    }

    else if (context[num_message-1] && context[num_message-1].intent[0] == 'plainte_augmentation_facture' && past_context(context, 'SFR Presse')){
        if (context[num_message_copy].intent[0] == 'pas_content_aug_for') {
            var output = {};
            output.text = "Je comprends que le prix de votre forfait ne vous satisfait pas. Nous pouvons vous proposer de changer de forfait, quelle option préféreriez vous?";
            output.proposals = [{
              title: "RED PERSO",
              subtitle: "Appels illimités, SMS/MMS illimités. 0-15 GO.",
              item_url: "https://www.red-by-sfr.fr/forfaits-mobiles/forfait-4G-personnalisable",
              image_url: 'https://www.red-by-sfr.fr/forfaits-mobiles//static/img/forfait-custom.png',
              buttons: [{
                type: "web_url",
                url: "https://www.red-by-sfr.fr/forfaits-mobiles/forfait-4G-personnalisable",
                title: "Ouvrir le lien"
              }, {
                type: "postback",
                title: "Changer maintenant",
                payload: "new_forfait",
              }]
            }, {
                title: "RED MINI",
                subtitle: "3h d'appels. SMS/MMS illimités. 50 MO.",
                item_url: "https://www.red-by-sfr.fr/forfaits-mobiles/forfait-4G-3h",
                image_url: 'http://lareclame.fr/wp-content/uploads/2016/02/redbysfr1-top.jpg',
                buttons: [{
                  type: "web_url",
                  url: "https://www.red-by-sfr.fr/forfaits-mobiles/forfait-4G-3h",
                  title: "Ouvrir le lien"
                }, {
                  type: "postback",
                  title: "Changer maintenant",
                  payload: "new_forfait",
                }],
            }];
            callback("text", output.text, senderID);
            callback("generic", output, senderID);
        }
        else if (context[num_message_copy].intent[0] == 'resiliation') {
            var output = "Très bien. Pour m'assurer de votre identité, j'aurais besoin du nom de votre banque et de votre code postal, s'il vous plait.";
            callback("text", output, senderID);
        }
        else {
            errorMessage = true;
            errorMessageCount += 1;
        }
    }

    else if (json.intent[0] == 'SFR Presse') {
        var output = "J'ai bien compris que vous nous contactiez à propos du service SFR Presse, pouvez vous préciser votre demande?";
        callback("text", output, senderID);
    }

    else if (!json.ok) {
        errorMessage = true;
        errorMessageCount += 1;
    }

    else if (json.accuracy != 1) {
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
        errorMessage = true;
        errorMessageCount += 1;
    }


    // on gère les messages d'erreurs
    if (errorMessage && errorMessageCount < 3) {
        errorMessage = false;
        var output = "Nous n'avons pas compris votre message, pouvez-vous le reformuler s'il vous plaît?";
        callback("text", output, senderID);
    }
    else if(errorMessage && errorMessageCount == 3){
        errorMessage = false;
        errorMessageCount = 0;
        var output = "Recommencons depuis le début : Bonjour, quel est votre problème?";
        reset(senderID); // reset the context and num_message variables.
        callback("text", output, senderID);
        return;
    }


    // on stock les messages envoyés
    num_message = num_message_copy  // on redonne à num_message sa vraie valeur

    if (typeof output === 'object'){
        context.reponses[num_message] = output.text;
    }
    else {
        context.reponses[num_message] = output;
    }

    console.log('\nprinting context in parsingJSON :\n\n', context);


}

function talkToPython(inputStr, context, num_message, senderID, callback, reset) {

    console.log('LAUNCHED');

    var options = {
        mode: 'text',
        pythonPath:  config.pythonPath,
        pythonOptions: ['-u'],
        scriptPath: config.pythonScriptsPath,
        args: [inputStr]
    };

    pshell.run('predict.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);

        var str = "";
        results.forEach(function(element){str = str + element;});

        parsingJSON(JSON.parse(str), context, num_message, senderID, callback, reset);

    });

}

function isSetPhone() {
    /*
     * Tells if phone number had been set by user
     */

    return false;
}

function isSetMail() {
    /*
     * Tells if mails had been set by user
     */

    return false;
}

var exports = module.exports = {};

exports.talkToPython = talkToPython;
