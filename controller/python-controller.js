/*
 * This controller is to be used for interraction between the node server and the python algorithms
 */


var config = require('../config');
var pshell = require('python-shell');

function parsingJSON(json, recipientID ,callback) {
    console.log(json);
    callback("text", json.ok.toString(), recipientID);
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