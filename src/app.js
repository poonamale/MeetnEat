import { SLACK_OAUTH_TOKEN, BOT_NAME, BOT_SPAM_CHANNEL } from './constants'
const SlackBot = require('slackbots');
const axios = require('axios')
const packageJson = require('../package.json')

const bot = new SlackBot({
    token: SLACK_OAUTH_TOKEN,
    name: 'aaa'
  });
  
  // Start Handler
  bot.on('start', () => {
    const params = {
      icon_emoji: ':smiley:'
    };
  
    bot.postMessageToChannel(
        BOT_SPAM_CHANNEL,
      'Lets plan lunch',
      params
    );
  });
  
  // Error Handler
  bot.on('error', err => console.log(err));
  
  // Message Handler
  bot.on('message', data => {
    if (data.type !== 'message') {
      return
    }
  
    handleMessage(data.text)
  })

function hello (channelId, userId) {
    sendMessage(channelId, `Heya! <@${userId}>`)
}

async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}

async function createLobby(location) {
    try {
        app.client.admin.conversations.create(token = SLACK_OAUTH_TOKEN.toLowerCase, is_private = true, name = location)
    } catch (err) {
        console.log(err.stack)
        console.log('Unable to process the createLobby request')
    }
  }
