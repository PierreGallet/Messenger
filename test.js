// automating node creation with postback (decision trees with multiple choices)

function make_button_node(list, answers_list, payload){
    // we keep the limitation of 20 characters for the buttons titles
    var code = '';
    code += 'else if (payload == "' + payload + '") {\n';
    code += '   var output = {};\n';
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
        code += '\n   var output = {};\n';
        code += '   output.text = "' + answers_list[1] + '";\n';
        code += '   output.proposals = [';
        for (var i = 3; i < list.length && i < 6; i++){
            code += '\n       {"type":"postback",\n';
            code += '       "title":"' + list[i] + '",\n';
            code += '       "payload":"' + list[i] + '"}';
            if(i < 5 && i < list.length-1){
                code +=',';
            }
        }
        code += '\n   ];\n';
        code += '   sendCallback("button", output, senderId);\n';
    }
    if (list.length > 6){
        code += '\n   var output = {};\n';
        code += '   output.text = "' + answers_list[2] + '";\n';
        code += '   output.proposals = [';
        for (var i = 6; i < list.length && i < 9; i++){
            code += '\n       {"type":"postback",\n';
            code += '       "title":"' + list[i] + '",\n';
            code += '       "payload":"' + list[i] + '"}';
            if(i < 9 && i < list.length-1){
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
    for (var key in list) {
        if (list[key].length > 20){
            list[key] = list[key].substring(0,19);
        }
    }
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


function make_generic_node(title_list, subtitle_list, item_url_list, image_url_list, text, payload){
    var code = '';
    code += 'else if (payload == "' + payload + '") {\n';
    code += '   var output = {};\n';
    code += '   output.text = "' + text + '";\n';
    code += '   output.proposals = [';
    for (var i = 0; i < title_list.length; i++){
        code += '\n       {"title":"'+ title_list[i] +'",\n';
        code += '       "subtitle":"' + subtitle_list[i] + '",\n';
        code += '       "item_url":"' + item_url_list[i] + '",\n';
        code += '       "image_url":"' + image_url_list[i] + '",\n';
        code += '       "buttons": [\n';
        code += '          {"type":"web_url",\n';
        code += '          "url":"' + item_url_list[i] + '",\n';
        code += '          "title":"Lire sur le Web"},\n';
        code += '          {"type":"postback",\n';
        code += '          "title":"Lire ici",\n';
        code += '          "payload":"'+ payload + '_' + i +'"}]\n';
        code += '       }';
        if(i < title_list.length-1){
            code +=',';
        }
    }
    code += '\n   ];\n';
    code += '   sendCallback("text", output.text, senderId);\n';
    code += '   sendCallback("generic", output, senderId);\n';
    code += '}';
    return console.log(code);
}


// first step
make_quickreply_node(['Forfait Mobile', 'Fibre, Box', 'Pas encore Client'], ['Vous êtes client...'], '0');


// // second step
make_quickreply_node(['Forfait et options', 'Mobile, carte SIM et réseau', 'Contrat, compte et identifants', 'Consommation et facture'], 'Votre demande concerne...', '0_0');
make_quickreply_node(['RED + BOX', 'RED Fibre'], 'Votre demande concerne...', '0_1');
make_quickreply_node(['Les forfaits mobile RED', "L'offre RED Fibre", 'Le réseau SFR', 'Désimlocker son mobile', "Changer d'opérateur"], 'Votre demande concerne...', '0_2');

// // third step
make_quickreply_node(['Souscrire à un nouveau forfait RED', 'Changer de forfait', 'Résilier votre forfait', 'Ajouter, résilier une option', 'Recharger un forfait bloqué', 'Demander la protabilité de son numéro (RIO)', "Tout savoir sur l'International"], 'Plus précisément...', '0_0_0');
make_quickreply_node(['Mobile', 'Carte SIM', 'Réseau'], ['Plus précisément'], '0_0_1');
make_quickreply_node(['Accéder à votre espace client', 'Changer votre mot de passe', 'Récupérer votre mot de passe perdu', 'Modifier vos données personnelles et bancaires', 'Changer de numéro de téléphone', 'Céder votre forfait à un proche', "Demander ou gérer vos procurations de ligne", 'Signer, consulter votre mandat de prélèvement (SEPA)'], 'Plus précisément...', '0_0_2');
make_quickreply_node(['Suivre votre consommation', 'Payer votre facture', 'Consulter votre facture', 'Comprendre votre facture'], 'Plus précisément...', '0_0_3');

make_quickreply_node(['Forfait, options et services', 'Equipements Box + TV', 'Contrats, compte et identifiants', 'Consommation et facture'], 'Plus précisément...', '0_1_0');
make_quickreply_node(['Forfait, options et services', 'Equipements Box + TV', 'Contrats, compte et identifiants', 'Consommation et facture'], 'Plus précisément...', '0_1_1');

make_generic_node(['Consulter nos fiches aide & conseils', 'Accéder à la boutique en ligne'], ['Découvrir les forfaits mobile RED by SFR', 'Souscrire à un forfait mobile sans engagement RED by SFR'], ['http://communaute.red-by-sfr.fr/t5/FAQ/Qu-est-ce-que-les-offres-Mobile-RED-by-SFR/ta-p/418#sfrintid=A_contact_RNEW-1', "http://red-by-sfr.fr/forfaits-mobiles/#sfrintid=A_contact_RNEW-1"], ['', ''], 'Voici nos solutions immédiates. Avez vous trouvé votre réponse?', '0_2_0');
make_generic_node(['Consulter nos fiches aide & conseils', 'Accéder à la boutique en ligne'],
                  ["Retrouver toute l'Assistance RED", 'Souscrire à un forfait mobile sans engagement RED by SFR'],
                  ['http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-2', "http://red-by-sfr.fr/forfaits-mobiles/#sfrintid=A_contact_RNEW-1"],
                  ['', ''],
                  'Voici nos solutions immédiates. Avez vous trouvé votre réponse?',
                  '0_2_1');
make_generic_node(['Accéder à la boutique en ligne', 'Accéder à la boutique en ligne', 'Accéder à la boutique en ligne'],
                  ["Le réseau internet et mobile de SFR", 'Le réseau Fibre : voir notre couverture', 'Le réseau Mobile : voir notre couverture'],
                  ['http://red-by-sfr.fr/couverture-reseau/%20%20#sfrintid=A_contact_RNEW-3', "http://red-by-sfr.fr/couverture-reseau/%20%20#sfrintid=A_contact_RNEW-3", "http://red-by-sfr.fr/couverture-reseau/%20%20#sfrintid=A_contact_RNEW-3"],
                  ['', '', ''],
                  'Voici nos solutions immédiates. Avez vous trouvé votre réponse?',
                  '0_2_2');
make_generic_node(['Consulter nos fiches aide & conseils'],
                  ["Retrouver toute l'Assistance RED"],
                  ['http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-4'],
                  [''],
                  'Voici nos solutions immédiates. Avez vous trouvé votre réponse?',
                  '0_2_3');
make_generic_node(['Consulter nos fiches aide & conseils', 'Consulter nos fiches aide & conseils'],
                  ["Comment changer d'opérateur mobile en conservant votre numéro?", "Retrouver toute l'Assistance RED"],
                  ['http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-Le-RIO-et-la-portabilité-de-votre/ta-p/424#sfrintid=A_contact_RNEW-5', "http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-5"],
                  ['', ''],
                  'Voici nos solutions immédiates. Avez vous trouvé votre réponse?',
                  '0_2_4');

// fourth step
make_generic_node(['Consulter nos fiches aide & conseils', 'Consulter la communauté Red', 'Accéder à la boutique en ligne'],
                  ["Comment changer d'opérateur mobile en conservant votre numéro?", "Retrouver toute l'Assistance RED"],
                  ['http://communaute.red-by-sfr.fr/t5/FAQ/Comment-changer-d-opérateur-Le-RIO-et-la-portabilité-de-votre/ta-p/424#sfrintid=A_contact_RNEW-5', "http://communaute.red-by-sfr.fr/t5/FAQ/tkb-p/FAQ#sfrintid=A_contact_RNEW-5"],
                  ['', ''],
                  'Voici nos solutions immédiates. Avez vous trouvé votre réponse?',
                  '0_2_1');
