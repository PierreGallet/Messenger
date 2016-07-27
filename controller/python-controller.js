/*
 * This controller is to be used for interraction between the node server and the python algorithms
 */


var config = require('../config');
var pshell = require('python-shell');

function parsingJSON(json, recipientID ,callback) {
    console.log(json);
    
    if(!json.ok) {
        callback("text", "Deso, pas compris, réessaye", recipientID);
    }
    else if(json.intent = "greetings") {
        callback("text", "Bonjour, que pouvons-nous faire pour vous?", recipientID);
    }
    else if(json.intent='give-info') {
        callback("text", "Nous enregistrons vos informations (ToDo)", recipientID);
    }
    else {
        callback("text", "Deso je c pa koi fér, patapé");
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

var exports = module.exports = {};

exports.talkToPython = talkToPython;