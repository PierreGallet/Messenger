// automating node creation with postback (decision trees with multiple choices)
var config = require('./config');
var fs = require('fs');

function get_faq_link(callback){
    // on cherche les liens pour lequel il faut faire un payload
    fs.readFile('./link2answer.json', function(err, data){
        var links = [];
        if(err) throw err;
        json = JSON.parse(data);
        Object.keys(json).forEach(function(key){
            var link = key;
            if (!links.includes(link) && link !== ''){
                links.push(link);
            }
        });
        callback(links);
    });
}

function addslashes(ch) {
    ch = ch.replace(/\\/g,"\\\\");
    ch = ch.replace(/\'/g,"\\'");
    ch = ch.replace(/\"/g,"\\\"");
    return ch;
}

function make_button_node(list, answers_list, payload){
    // we keep the limitation of 20 characters for the buttons titles
    var code = '';
    code += 'else if (payload == "' + payload + '") {\n';
    code += '   output = {};\n';
    code += '   output.text = "' + answers_list[0] + '";\n';
    code += '   output.proposals = [';
    for (var i = 0; i < list.length && i < 3; i++){
        code += '\n       {"type":"postback",\n';
        code += '       "title":"' + list[i] + '",\n';
        code += '       "payload":"' + list[i] + '"}';
        if(i < 2 && i < list.length-1){
            code +=',';
        }
    }
    code += '\n   ];\n';
    code += '   sendCallback("button", output, senderId);\n';
    if (list.length > 3){
        code += '\n   output = {};\n';
        code += '   output.text = "' + answers_list[1] + '";\n';
        code += '   output.proposals = [';
        for (var j = 3; i < list.length && i < 6; i++) {
            code += '\n       {"type":"postback",\n';
            code += '       "title":"' + list[j] + '",\n';
            code += '       "payload":"' + list[j] + '"}';
            if(j < 5 && j < list.length-1){
                code +=',';
            }
        }
        code += '\n   ];\n';
        code += '   sendCallback("button", output, senderId);\n';
    }
    if (list.length > 6){
        code += '\n   output = {};\n';
        code += '   output.text = "' + answers_list[2] + '";\n';
        code += '   output.proposals = [';
        for (var k = 6; i < list.length && k < 9; i++) {
            code += '\n       {"type":"postback",\n';
            code += '       "title":"' + list[k] + '",\n';
            code += '       "payload":"' + list[k] + '"}';
            if(k < 9 && k < list.length-1){
                code +=',';
            }
        }
        code += '\n   ];\n';
        code += '   sendCallback("button", output, senderId);\n';
    }
    code += '}';
    return console.log(code);
}

function make_quickreply_node(list, text, payload){
    // we keep the limitation of 20 characters for the buttons titles
    fs.readFile('motifs.json', (err, data) => {
        data = JSON.parse(data);
        for (var key in list) {
            if (list[key].length > 20){
                list[key] = data[list[key]];
            }
        }

        var code = '';
        code += 'else if (payload == "' + payload + '") {\n';
        code += '   output = {};\n';
        code += '   output.text = "' + text + '";\n';
        code += '   output.proposals = [';
        if (payload.length > 1){ // bouton précédent
            code += '\n       {"content_type":"text",\n';
            code += '       "title":"Précédent",\n';
            code += '       "payload":"' + payload.slice(0,-2) + '"},';
        }
        for (var i = 0; i < list.length; i++){
            code += '\n       {"content_type":"text",\n';
            code += '       "title":"' + list[i] + '",\n';
            code += '       "payload":"' + payload + '_' + i + '"}';
            if(i < list.length-1){
                code +=',';
            }
        }
        code += '\n   ];\n';
        code += '   sendCallback("quick_reply", output, senderId);\n';
        code += '}';
        return console.log(code);
    });
}


function make_generic_node(title_list, subtitle_list, item_url_list, image_url_list, text, payload){
    get_faq_link(function(links){
        var code = '';
        code += 'else if (payload == "' + payload + '") {\n';
        code += '   output = {};\n';
        code += '   output.text = "' + text + '";\n';
        code += '   output.proposals = [';
        for (var i = 0; i < title_list.length; i++){
            code += '\n       {"title":"'+ title_list[i] +'",\n';
            code += '       "subtitle":"' + subtitle_list[i] + '",\n';
            code += '       "item_url":"' + item_url_list[i] + '",\n';
            code += '       "image_url":"' + config.ngrok_url + image_url_list[i] + '",\n';
            if (item_url_list[i] !== ''){
                code += '       "buttons": [\n';
                code += '          {"type":"web_url",\n';
                code += '          "url":"' + item_url_list[i] + '",\n';
                code += '          "title":"Lire sur le Web"}';
                // console.log(links.indexOf(item_url_list[i]))
                if (links.indexOf(item_url_list[i]) >= 0){
                    code += ',\n          {"type":"postback",\n';
                    code += '          "title":"Lire ici",\n';
                    code += '          "payload":"'+ item_url_list[i] +'"}';
                }
                code += ']';
            }
            code += '\n       }';
            if(i < title_list.length-1){
                code +=',';
            }
        }
        code += '\n   ];\n';
        code += '   output2 = {};\n';
        code += '   output2.text = "Avez vous trouvé ce que vous cherchiez?";\n';
        code += '   output2.proposals = [';
        code += '\n       {"content_type":"text",\n';
        code += '       "title":"oui",\n';
        code += '       "payload":"finish"},';
        code += '\n       {"content_type":"text",\n';
        code += '       "title":"non",\n';
        code += '       "payload":"passer_conseiller"}];\n';
        code += '   sendCallback("text", output.text, senderId);\n';
        code += '   sendCallback("generic", output, senderId);\n';
        code += '   setTimeout(function(){ sendCallback("quick_reply", output2, senderId); }, 5000);\n';
        code += '}';
        console.log(code);
    });
}


///////////// to make the quick_reply in button-controller
function make_chatbot_tree(path='./faq.json'){
    fs.readFile(path, (err, data) => {
        json = JSON.parse(data);
        make_quickreply_node(Object.keys(json), 'Vous êtes client...', '0');
        var i = 0, j = 0, k = 0, l = 0, m = 0;
        Object.keys(json).forEach(function(step1){
            make_quickreply_node(Object.keys(json[step1]), 'Votre demande concerne...', '0_' + i);
            j = 0;
            Object.keys(json[step1]).forEach(function(step2){
                if (Object.keys(json[step1][step2]).indexOf("img_link") >= 0){
                    make_generic_node(json[step1][step2].title,
                                      json[step1][step2].subtitle,
                                      json[step1][step2].link,
                                      json[step1][step2].img_link,
                                      "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!",
                                      '0_' + i + '_' + j);
                }
                else {
                    make_quickreply_node(Object.keys(json[step1][step2]), 'Plus précisément...', '0_' + i + '_' + j);
                    k = 0;
                    Object.keys(json[step1][step2]).forEach(function(step3){
                        if (Object.keys(json[step1][step2][step3]).indexOf("img_link") >= 0){
                            make_generic_node(json[step1][step2][step3].title,
                                              json[step1][step2][step3].subtitle,
                                              json[step1][step2][step3].link,
                                              json[step1][step2][step3].img_link,
                                              "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!",
                                              '0_' + i + '_' + j + '_' + k);
                        }
                        else {
                            make_quickreply_node(Object.keys(json[step1][step2][step3]), 'Plus précisément...', '0_' + i + '_' + j + '_' + k);
                            l = 0;
                            Object.keys(json[step1][step2][step3]).forEach(function(step4){
                                if (Object.keys(json[step1][step2][step3][step4]).indexOf("img_link") >= 0){
                                    make_generic_node(json[step1][step2][step3][step4].title,
                                                      json[step1][step2][step3][step4].subtitle,
                                                      json[step1][step2][step3][step4].link,
                                                      json[step1][step2][step3][step4].img_link,
                                                      "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!",
                                                      '0_' + i + '_' + j + '_' + k + '_' + l);
                                }
                                else {
                                    make_quickreply_node(Object.keys(json[step1][step2][step3][step4]), 'Plus précisément...', '0_' + i + '_' + j + '_' + k + '_' + l);
                                    m = 0;
                                    Object.keys(json[step1][step2][step3][step4]).forEach(function(step5){
                                        if (Object.keys(json[step1][step2][step3][step4][step5]).indexOf("img_link") >= 0){
                                            make_generic_node(json[step1][step2][step3][step4][step5].title,
                                                              json[step1][step2][step3][step4][step5].subtitle,
                                                              json[step1][step2][step3][step4][step5].link,
                                                              json[step1][step2][step3][step4][step5].img_link,
                                                              "Voici nos solutions immédiates, n'hésitez pas à lire les solutions dans messenger!",
                                                              '0_' + i + '_' + j + '_' + k + '_' + l + '_' + m);
                                        }
                                        else {
                                            make_quickreply_node(Object.keys(json[step1][step2][step3][step4][step5]), 'Plus précisément...', '0_' + i + '_' + j + '_' + k + '_' + l + '_' + m);
                                        }
                                        m += 1;
                                    });
                                }
                                l += 1;
                            });
                        }
                        k += 1;
                    });
                }
                j += 1;
            });
            i += 1;
        });
    });
}

make_chatbot_tree();
