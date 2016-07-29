/*
 * This controller is to be used for interraction between the node server and the python algorithms
 */


var config = require('../config');
var pshell = require('python-shell');

function parsingJSON(json, recipientID , callback) {
    console.log(json);

    if(!json.ok) {
        callback("text", "Nous n'avons pas compris votre message, pouvez-vous le reformuler s'il vous plaît.", recipientID);
    }
    else if(json.intent == "greetings") {
        callback("text", "Bonjour, que pouvons-nous faire pour vous?", recipientID);
    }
    else if(json.intent == 'give_info') {
        var mail = json.entities.email
        var phone = json.entities.phone_number
        var str = ""

        if(mail && !isSetMail()) { str = str + "Adresse email : " + mail + ". \n\n";}
        if(phone && !isSetPhone()) { str = str + "Telephone : " + phone + ". \n\n";}

        if(mail || phone) {
            var output = {}
            output.text = "Vous nous avez transmis les informations suivantes : \n\n" + str + "Confirmez-vous ces informations?";
            output.proposals = [{
                    "content_type":"text",
                    "title":"Oui",
                    "payload":"payloadOuiGiveInfos"},
                    {"content_type":"text",
                     "title":"Non",
                     "payload":"payloadNonGiveInfos"}
                ];
            callback("button", output, recipientID);
        }
    }
    // else if(json.similarity[0] > 0.70) {
    //
    //     var reponse1 = '1) ' + json.associated_answer[0]
    //     var reponse2 = '2) ' + json.associated_answer[1]
    //     var reponse3 = '3) ' + json.associated_answer[2]
    //     var reponse4 = '4) ' + json.associated_answer[3]
    //     var reponse5 = '5) ' + json.associated_answer[4]
    //     callback("text", reponse1, recipientID);
    //     callback("text", reponse2, recipientID);
    //     callback("text", reponse3, recipientID);
    //     callback("text", reponse4, recipientID);
    //     callback("text", reponse5, recipientID);
    //
    //
    // }
    else {
        var output = {}
            output.text = "Est-ce bien votre intent : " + json.intent + "?";
            output.proposals = [{
                    "content_type":"text",
                    "title":"Oui",
                    "payload":"payloadOuiIntent"},
                    {"content_type":"text",
                     "title":"Non",
                     "payload":"payloadNonIntent"}
                ];
        callback("button", output, recipientID);
    }
}

function talkToPython(inputStr, senderID, callback) {

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

        parsingJSON(JSON.parse(str), senderID, callback);

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
