/*
 * This controller is to be used for interraction between the node server and the python algorithms
 */


var config = require('../config');
var pshell = require('python-shell');

function parsingJSON(json) {
    
}

function talkToPython(inputStr) {
    
    console.log('LAUNCHED');
    
    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: config.pythonScriptsPath,
        args: [inputStr]
    };
 
    pshell.run('predict.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution 
        console.log('results: %j', results);
        
        var str = "";
        results.forEach(function(element){str = str + element;})
        
        json = JSON.parse(str);
        parsingJSON(json);
        
    });
    
}

var exports = module.exports = {};

exports.talkToPython = talkToPython;