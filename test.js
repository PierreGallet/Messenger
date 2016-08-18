// to make node

function make_button_node(list, answers_list, payload){
    // list is a list of string at one node.
    var code = '';
    code += 'else if (payload == "' + payload + '") {\n'
    code += '   var output = {};\n'
    code += '   output.text = "' + answers_list[0] + '";\n'
    code += '   output.proposals = ['
    for (var i = 0; i < list.length && i < 3; i++){
        code += '\n       {"type":"postback",\n'
        code += '       "title":"' + list[i] + '",\n'
        code += '       "payload":"' + list[i] + '"}'
        if(i < 2 && i < list.length-1){
            code +=','
        }
    }
    code += '\n   ];\n'
    code += '   sendButtonMessage(senderId, output.text, output.proposals);\n'
    if (list.length > 3){
        code += '\n   var output = {};\n'
        code += '   output.text = "' + answers_list[1] + '";\n'
        code += '   output.proposals = ['
        for (var i = 3; i < list.length && i < 6; i++){
            code += '\n       {"type":"postback",\n'
            code += '       "title":"' + list[i] + '",\n'
            code += '       "payload":"' + list[i] + '"}'
            if(i < 5 && i < list.length-1){
                code +=','
            }
        }
        code += '\n   ];\n'
        code += '   sendButtonMessage(senderId, output.text, output.proposals);\n'
    }
    if (list.length > 6){
        code += '\n   var output = {};\n'
        code += '   output.text = "' + answers_list[2] + '";\n'
        code += '   output.proposals = ['
        for (var i = 6; i < list.length && i < 9; i++){
            code += '\n       {"type":"postback",\n'
            code += '       "title":"' + list[i] + '",\n'
            code += '       "payload":"' + list[i] + '"}'
            if(i < 9 && i < list.length-1){
                code +=','
            }
        }
        code += '\n   ];\n'
        code += '   sendButtonMessage(senderId, output.text, output.proposals);\n'
    }
    code += '}'
    return console.log(code);
}

function make_quickreply_node(list, answers_list, payload){
    // list is a list of string at one node.
    var code = '';
    code += 'else if (payload == "' + payload + '") {\n'
    code += '   var output = {};\n'
    code += '   output.text = "' + answers_list[0] + '";\n'
    code += '   output.proposals = ['
    for (var i = 0; i < list.length && i < 3; i++){
        code += '\n       {"type":"postback",\n'
        code += '       "title":"' + list[i] + '",\n'
        code += '       "payload":"' + list[i] + '"}'
        if(i < 2 && i < list.length-1){
            code +=','
        }
    }
    code += '\n   ];\n'
    code += '   sendButtonMessage(senderId, output.text, output.proposals);\n'
    if (list.length > 3){
        code += '\n   var output = {};\n'
        code += '   output.text = "' + answers_list[1] + '";\n'
        code += '   output.proposals = ['
        for (var i = 3; i < list.length && i < 6; i++){
            code += '\n       {"type":"postback",\n'
            code += '       "title":"' + list[i] + '",\n'
            code += '       "payload":"' + list[i] + '"}'
            if(i < 5 && i < list.length-1){
                code +=','
            }
        }
        code += '\n   ];\n'
        code += '   sendButtonMessage(senderId, output.text, output.proposals);\n'
    }
    if (list.length > 6){
        code += '\n   var output = {};\n'
        code += '   output.text = "' + answers_list[2] + '";\n'
        code += '   output.proposals = ['
        for (var i = 6; i < list.length && i < 9; i++){
            code += '\n       {"type":"postback",\n'
            code += '       "title":"' + list[i] + '",\n'
            code += '       "payload":"' + list[i] + '"}'
            if(i < 9 && i < list.length-1){
                code +=','
            }
        }
        code += '\n   ];\n'
        code += '   sendButtonMessage(senderId, output.text, output.proposals);\n'
    }
    code += '}'
    return console.log(code);
}


make_node(['Forfait Mobile', 'Fibre, Box', 'Pas encore Client'], ['Vous êtes client...'], 'getting_started');

make_node(['RED + BOX', 'RED Fibre'], ['Votre demande concerne...'], 'Fibre, Box');
make_node(['Les forfaits mobile RED', "L'offre RED Fibre", 'Le réseau SFR', 'Désimlocker son mobile', "Changer d'opérateur"], ['Votre demande concerne-t-elle:', 'ou est-ce plutôt:'], 'Pas encore client');
make_node(['Forfait et options', 'Mobile, carte SIM et réseau', 'Contrat, compte et identifants', 'Consommation et facture'], ['Votre demande concerne-t-elle:', 'ou est-ce plutôt:'], 'Forfait Mobile');

make_node(['Souscrire à un nouveau forfait RED', 'Changer de forfait', 'Résilier votre forfait', 'Ajouter, résilier une option', 'Recharger un forfait bloqué', 'Demander la protabilité de son numéro (RIO)', "Tout savoir sur l'International"], ['Plus précisément:', 'ou encore:', 'mais aussi:'], 'Forfait et options');
make_node(['Mobile', 'Carte SIM', 'Réseau'], ['Plus précisément'], 'Mobile, carte SIM et réseau');
make_node(['Accéder à votre espace client', 'Changer votre mot de passe', 'Récupérer votre mot de passe perdu', 'Modifier vos données personnelles et bancaires', 'Changer de numéro de téléphone', 'Céder votre forfait à un proche', "Demander ou gérer vos procurations de ligne", 'Signer, consulter votre mandat de prélèvement (SEPA)'], ['Plus précisément:', 'ou encore:', 'mais aussi:'], 'Contrat, compte et identifiants');
