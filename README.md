# Messenger Bot

This is a implementation of a bot for messenger. It uses a webhook that listen to POST event on a facebook page (ie : when a user send a message to that page), and alert a node.js server. The server then use facebook send API to send back the appropriate answer, that will of course be powered by some mystic pythonic algorithms.

## Getting Started
Frist things first, you should have a look at this page, carefully craft by facebook devs : https://developers.facebook.com/docs/messenger-platform/quickstart

## 9 steps to victory

### Node stuff:
* We need a *"real url"* for our webhook (meaning not a localhost), because facebook will only accept verified urls. Ngrok is the tool for this purpose. Download ngrok there : https://ngrok.com. Launch the bash script provided and then use `ngrok 8888` to set up an url such as https://55feb1ab.ngrok.io. This will be your reverse proxy for your localhost.
* Download nodemon with the command : `npm install nodemon -g`, so that you won't have to relauch the node server every time (better than re-starting with node index.js everytime)
* Launch the server using the command : `nodemon index.js`. You can update it anytime with the command `rs` (restart server)
* Type `npm install` from the working directory in your terminal to get the node_modules needed for our node.js server.

### Facebook stuff:
* Create a facebook app there : https://developers.facebook.com. Then go to your app settings and under **Products** add a product and select *Messenger* and *Webhooks*
* Go to the **Products/webhooks** tab and set up a webhook at the ngrok url with any verify_token. Subscribe to *message_deliveries*, *messages*, *messaging_optins*, *messaging_postbacks* fields
* Go to the **Products/Messenger** tab and get your page access token by selecting the facebook page you want to use (in Token Generation section).
* Still on the **Products/Messenger** tab, subscribe the app to the page in the Messenger tab, in the Webhooks section.
* To finish with, create a *config.js* file such as below and update it with the corresponding parameters. Carefully choose your python path (use `which python` in the terminal to know) and your python repository path where your *predict.py* script is. You should use port 8888.
```
var config = {};

config.verify_token = "VERIFY_TOKEN";
config.access_token="ACCESS_TOKEN";
config.ngrok_url = "WEBHOOK_URL";
config.port = 8888;

config.pythonScriptsPath = "PATH_TO_PYTHON_SCRIPT";
config.pythonPath = "PATH_TO_PYTHON_REPO"

module.exports = config;
```
