## 9 steps to victory

* Download ngrok there : https://ngrok.com. Launch the bash script and then use `ngrok 8888` to set up an url such as https://55feb1ab.ngrok.io that will be your reverse proxy for your localhost. (facebook only accept verified urls so you cannot use directly your *localhost/* as a webhook url)
* Download nodemon with the command : `npm install nodemon -g`, so that you won't have to relauch the node server every time.
* Launch the server using the command : `nodemon index.js`. You can update it anytime with the command `rs` (restart server)
* Type `npm install` from the working directory in your terminal to get the node_modules.
* Get an facebook messenger app there : https://developers.facebook.com
* Go to the Products/webhooks tab and set up a webhook at the ngrok url with any verify_token. Subscribe to message_deliveries, messages, messaging_optins, messaging_postbacks fields
* Go to the Products/Messenger tab and get your page access token by selecting the facebook page you want to use (in Token Generation section).
* Still on the Products/Messenger tab, subscribe the app to the page in the Messenger tab, in the Webhooks section.
* To finish with, check your *config.js* file and upload it with the right parameters. Carefully choose your python path (use `which python` in the terminal to know) and your python repository path where your *predict.py* script is. You should use port 8888.
