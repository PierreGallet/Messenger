function make_quickreply_node(list, text, payload){
    // list is a list of string at one node.
    var code = '';
    code += 'else if (payload == "' + payload + '") {\n';
    code += '   var output = {};\n';
    code += '   output.text = "' + text + '";\n';
    code += '   output.proposals = [';
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
}
make_quickreply_node(['Forfait Mobile', 'Fibre, Box', 'Pas encore Client'], ['Vous êtes client...'], '0');
