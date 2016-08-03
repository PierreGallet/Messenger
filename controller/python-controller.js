/*
 * This controller is to be used for interraction between the node server and the python algorithms
 */


var config = require('../config');
var pshell = require('python-shell');
var errorMessage = false;
var errorMessageCount = 0;

function parsingJSON(json, context, num_message, recipientID, callback) {

    context[num_message] = json

    // for the condition below to work with num_message even if we did not understood one stuff [num_message will return as it was at the end]
    if (context['reponses'][num_message-1] == "Nous n'avons pas compris votre message, pouvez-vous le reformuler s'il vous plaît?"){
        if (context['reponses'][num_message-2] == "Nous n'avons pas compris votre message, pouvez-vous le reformuler s'il vous plaît?"){
            num_message_copy = num_message
            num_message -= 2

        }
        else {
            num_message_copy = num_message
            num_message -= 1
        }
    }

    if (json.intent == "greetings") {
        output = "Bonjour, que pouvons-nous faire pour vous?"
        callback("text", output, recipientID);
    }
    else if (json.entities.person && json.message.length < 40 && json.message.includes('bonjour')) {
        var person = json.entities.person
        output = "Bonjour " + person + ", que pouvons-nous faire pour vous?"
        callback("text", output, recipientID);
    }
    else if (json.intent == "thanks") {
        output = "Mais de rien, je suis là pour vous servir, Maître"
        callback("text", output, recipientID);
    }
    else if (json.intent == 'give_info') {
        var mail = json.entities.email
        var phone = json.entities.phone
        var str = ""

        if (mail && !isSetMail()) { str = str + "Adresse email : " + mail + ". \n\n";}
        if (phone && !isSetPhone()) { str = str + "Telephone : " + phone + ". \n\n";}

        if (mail || phone) {
            var output = {}
            output.text = "Vous nous avez transmis les informations suivantes : \n\n" + str + "Confirmez-vous ces informations?";
            output.proposals = [{
                    "type":"postback",
                    "title":"Oui",
                    "payload":"payloadOuiGiveInfos"},
                    {"type":"postback",
                     "title":"Non",
                     "payload":"payloadNonGiveInfos"}
                ];
            callback("button", output, recipientID);
        }
        else {
            errorMessage = true
            errorMessageCount += 1
        }
    }
    else if (context[num_message-1] && context[num_message-1].intent == 'SFR Presse'){
        if (json.message.includes('resiliation') || json.message.includes('resilier') || json.message.includes('desactiver')) {
            context[num_message].intent = 'resiliation_sfrpresse'
            output = "Savez vous que SFR presse est un service gratuit?"
            callback("text", output, recipientID);
        }
        else if (json.message.includes('info')) {
            context[num_message].intent = 'info_sfrpresse'
            output = "SFR presse est un service de merde qui me fait chier à longueur de journée. Cette explication vous convient-elle?"
            callback("text", output, recipientID);
        }
        else {
            errorMessage = true
            errorMessageCount += 1
        }
    }
    else if (context[num_message-1] && context[num_message-1].intent == 'resiliation_sfrpresse'){
        if (json.message.includes('forfait') || json.message.includes('facture') || json.message.includes('augmentation') || json.message.includes('plus')) {
            context[num_message].intent = 'augmentation_facture'
            output = "Si votre facture a augmenté, ce n'est pas du à SFR presse, mais à l'augmentation tarifaire de votre forfait mobile."
            callback("text", output, recipientID);
        }
        else if (json.message.includes('oui') || json.message.includes('resiliation') || json.message.includes('resilier') || json.message.includes('desactiver')) {
            context[num_message].intent = 'resiliation_sfrpresse2'
            output = "Très bien. J'aurais besoin de votre numéro de téléphone et de votre email s'il vous plait."
            callback("text", output, recipientID);
        }
        else {
            errorMessage = true
            errorMessageCount += 1
        }
    }
    else if (context[num_message-1] && context[num_message-1].intent == 'info_sfrpresse'){
        if (json.message.includes('resiliation') || json.message.includes('resilier')) {
            context[num_message].intent = 'resiliation_sfrpresse'
            output = "Vous avez compris que SFR presse est un service gratuit?"
            callback("text", "Vous avez compris que SFR presse est un service gratuit?", recipientID);
        }
        else if (json.message.includes('oui')) {
            context[num_message].intent = 'info_sfrpresse_fini'
            output = "Je peux faire quelque chose d'autre?"
            callback("text", output, recipientID);
        }
        else if (json.message.includes('non') || json.message.includes('plus') || json.message.includes('info')) {
            context[num_message].intent = 'info_sfrpresse2'
            output = "Je vous renvoie vers la documentation : aller/vous/faire/foutre.html"
            callback("text", output, recipientID);
        }
        else if (json.message.includes('forfait') || json.message.includes('facture') || json.message.includes('augmentation')) {
            context[num_message].intent = 'augmentation_facture'
            output = "Ce n'est pas du à SFR presse, mais à l'augmentation tarifaire de votre forfait mobile."
            callback("text", output, recipientID);
        }
        else {
            errorMessage = true
            errorMessageCount += 1
        }
    }
    else if (context[num_message-1] && context[num_message-1].intent == 'augmentation_facture'){
        if (json.message.includes('inacceptable') || json.message.includes('vol')) {
            context[num_message].intent = 'pas_content_aug_forfait'
            var output = {}
            output.text = "Je vois. Vous êtes enervé. Il ne faut pas s'en faire, car chez SFR, nous avons toujours une solution qui vous convient. Je vous propose de changer de forfait, laquelle des deux propositions suivantes vous ferait plaisir?";
            output.proposals = [{
                    "type":"postback",
                    "title":"Red 3h d'appel, 500 Mo, SMS/MMS illimités à 4,99€/mois",
                    "payload":"new_forfait"},
                    {"type":"postback",
                     "title":"Red illimité, 500 Mo, SMS/MMS illimités à 12,99€/mois",
                     "payload":"new_forfait"}
                ];
            callback("button", output, recipientID)
        }
        else if (json.message.includes('resiliation') || json.message.includes('resilier')) {
            context[num_message].intent = 'resiliation_sfrpresse2'
            output = "Très bien. J'aurais besoin de votre numéro de téléphone et de votre email s'il vous plait."
            callback("text", output, recipientID);
        }
        else if (json.message.includes('bien') || json.message.includes('merci')) {
            context[num_message].intent = 'info_sfrpresse_fini'
            output = "Je peux faire quelque chose d'autre?"
            callback("text", output, recipientID);
        }
        else {
            errorMessage = true
            errorMessageCount += 1
        }

    }
    else if (json.intent == 'SFR Presse' || json.message.includes('sfr presse')) {
        output = "Que souhaitez vous savoir sur le service SFR Presse?"
        callback("text", output, recipientID);
        // var output = {}
        // output.text = "Que souhaitez vous savoir sur le service SFR Presse?";
        // output.proposals = [{
        //         "type":"postback",
        //         "title":"résiliation",
        //         "payload":"resiliation_sfrpresse"},
        //         {"type":"postback",
        //          "title":"plus d'info",
        //          "payload":"info_sfrpresse"}
        //     ];
        // callback(J"button", output, recipientID);
    }
    else if (!json.ok) {
        errorMessage = true
        errorMessageCount += 1
    }
    else {
        var output = {}
            output.text = "Vous avez un problème concernant: " + json.intent + "?";
            output.proposals = [{
                    "content_type":"text",
                    "title":"Oui",
                    "payload":"payloadOuiIntent"},
                    {"content_type":"text",
                     "title":"Non",
                     "payload":"payloadNonIntent"}
                ];
        callback("quick_reply", output, recipientID);
    }

    if (errorMessage && errorMessageCount < 3) {
        errorMessage = false
        output = "Nous n'avons pas compris votre message, pouvez-vous le reformuler s'il vous plaît?"
        callback("text", output, recipientID);
    }
    else if(errorMessage && errorMessageCount == 3){
        errorMessage = false
        errorMessageCount = 0
        output = "Recommencons depuis le début : Bonjour, quel est votre problème?"
        callback("text", output, recipientID);
    }

    if (typeof num_message_copy !== 'undefined'){
        num_message = num_message_copy  // on redonne à num_message sa vraie valeur
    }

    if (typeof output === 'object'){
        context['reponses'][num_message] = output.text
    }
    else {
        context['reponses'][num_message] = output
    }

    console.log('printing context in parsingJSON :', context)

}

function talkToPython(inputStr, context, num_message, senderID, callback) {

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

        parsingJSON(JSON.parse(str), context, num_message, senderID, callback);

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
