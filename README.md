# for this to work:

* Download ngrok there : https://ngrok.com, launch the bash script and then use `ngrok 8888` to set up an url such as https://55feb1ab.ngrok.io that will be your tunnel for your localhost. (facebook accept only verified urls so you cannot use *localhost/*)
* Download nodemon with the command : `npm install nodemon -g`
* Launch the server using the command : `nodemon index.js`. You can update it anytime with the command `rs` (restart server)
* Type `npm install` from the working directory in your terminal to get the node_modules.
* Get an facebook messenger app there : https://developers.facebook.com
* Set up a webhook at the ngrok url and use any verify_token. Subscribe to message_deliveries, messages, messaging_optins, messaging_postbacks fields
* Get your page access token by selecting the facebook page you want to use on the Messenger tab
* Subscribe the app to the page in the Messenger tab, on the webhooks section.
* To finish with, check your *config.js* file and upload it with the right parameters. Carefully choose your python path (use `which python` in the terminal) and your python repository path where your *predict.py* script is. You should use port 8888.
