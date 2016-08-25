// automating node creation with postback (decision trees with multiple choices)
var config = require('./config');
var fs = require('fs');

function addslashes(ch) {
    // ch = ch.replace(/\\/g,"\\\\");
    ch = ch.replace(/\'/g,"\\'");
    ch = ch.replace(/\"/g,"\\\"");
    // ch = ch.replace(/\\n/g, "\n");
    return ch;
}

function button_read_here_begin(title, output, payload){
    var code = '';
    code += 'else if (payload == "' + payload + '") {\n';
    code += '   sendCallback("text", "' + title.text + '", senderId);\n';
    code += '   output = {};\n';
    code += '   output.text = "' + addslashes(output.text) + '";\n';
    code += '   output.proposals = [';
    code += '\n       {"type":"postback",\n';
    code += '       "title":"Page suivante",\n';
    code += '       "payload":"' + payload + '#' + '"}';
    if(output.link){
        for (var i in output.link){
            code += ',';
            code += '\n       {"type":"web_url",\n';
            code += '       "title":"'+ addslashes(output.button[i]) + '",\n';
            code += '       "url":"' + output.link[i] + '"}';
        }
    }
    code += '\n   ];\n';
    code += '   sendCallback("button", output, senderId);\n';
    if(output.img){
        output.img.forEach(function(img){
            code += '   sendCallback("image", "' + img + '", senderId);\n';
        });
    }
    code += '}';
    return console.log(code);
}

function button_read_here(output, payload){
    var code = '';
    code += 'else if (payload == "' + payload + '") {\n';
    code += '   output = {};\n';
    code += '   output.text = "' + addslashes(output.text) + '";\n';
    code += '   output.proposals = [';
    code += '\n       {"type":"postback",\n';
    code += '       "title":"Page suivante",\n';
    code += '       "payload":"' + payload + '#' + '"}';
    if(output.link){
        for (var i in output.link){
            code += ',';
            code += '\n       {"type":"web_url",\n';
            code += '       "title":"'+ addslashes(output.button[i]) + '",\n';
            code += '       "url":"' + output.link[i] + '"}';
        }
    }
    code += '\n   ];\n';
    code += '   sendCallback("button", output, senderId);\n';
    if(output.img){
        output.img.forEach(function(img){
            code += '   sendCallback("image", "' + img + '", senderId);\n';
        });
    }
    code += '}';
    return console.log(code);
}

function button_read_here_end(output, payload){
    var code = '';
    code += 'else if (payload == "' + payload + '") {\n';
    if(output.link){
        code += '   output = {};\n';
        code += '   output.text = "' + addslashes(output.text) + '";\n';
        code += '   output.proposals = [';
        for (var i in output.link){
            if(i !== 0){
                code += ',';
            }
            code += '\n       {"type":"web_url",\n';
            code += '       "title":"'+ addslashes(output.button[i]) + '",\n';
            code += '       "url":"' + output.link[i] + '"}';
        }
        code += '\n   ];\n';
        code += '   sendCallback("button", output, senderId);\n';
    }
    else {
        code += '   output = "' + addslashes(output.text) + '";\n';
        code += '   sendCallback("text", output, senderId);\n';
    }
    if(output.img){
        output.img.forEach(function(img){
            code += '   sendCallback("image", "' + img + '", senderId);\n';
        });
    }
    code += '}';
    return console.log(code);
}

//////////////// to make next page button in main controller where there is a postback
function make_read_here(path='./link2answer.json'){
    fs.readFile(path, (err, data) => {

        json = JSON.parse(data);

        Object.keys(json).forEach(function(link){
            for (var j in json[link]){
                if(j == 0){
                    // do nothing, title will be send at j == 1
                    continue;
                }
                else if (j == 1){
                    payload = link + '#'.repeat(j-1);
                    button_read_here_begin(json[link][j-1], json[link][j], payload)
                }
                else if(json[link][String(parseInt(j)+1)]){
                    payload = link + '#'.repeat(j-1);
                    button_read_here(json[link][j], payload);
                }
                else{
                    payload = link + '#'.repeat(j-1);
                    button_read_here_end(json[link][j], payload);
                }
            }
        });
    });
}


make_read_here();
