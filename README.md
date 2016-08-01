# for this to work:

* Download ngrok and set up an url such as https://55feb1ab.ngrok.io that will be your tunnel for your localhost. (facebook accept only verified url)
* Download nodemonwith the command : sudo npm install nodemon -g
* Launch the server using the command : nodemon index.js. You can update it anytime with the command rs (restart server)
* Type npm install from the working directory in your terminal to get the node_modules.
* Get an facebook messenger app there : https://developers.facebook.com
* Set up a webhook at the ngrok url and use any verify_token. Subscribe to message_deliveries, messages, messaging_optins, messaging_postbacks fields
* Get your page access token by selecting the page you want to use on the Messenger tab
* Subscribe the app to the page in the Messenger tab, on the webhooks section.
