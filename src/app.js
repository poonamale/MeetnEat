import { SLACK_OAUTH_TOKEN, SLACK_APP_TOKEN, SLACK_SIGNING_SECRET, BOT_SPAM_CHANNEL } from './constants'
const axios = require('axios')
const packageJson = require('../package.json')
const { App } = require('@slack/bolt')

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_OAUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, 
  appToken: process.env.SLACK_APP_TOKEN 
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()


function hello (channelId, userId) {
    sendMessage(channelId, `Heya! <@${userId}>`)
}

async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}
