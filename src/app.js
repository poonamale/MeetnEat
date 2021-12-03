import { RTMClient }  from '@slack/rtm-api'
import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL } from './constants'
import  { WebClient } from '@slack/web-api'
const axios = require('axios')
const packageJson = require('../package.json')

const rtm = new RTMClient(SLACK_OAUTH_TOKEN)
const web = new WebClient(SLACK_OAUTH_TOKEN)

rtm.start()
  .catch(console.error)

rtm.on('ready', async () => {
    console.log('bot started')
    console.log(BOT_SPAM_CHANNEL, `Bot version ${packageJson.version} is online.`)
    createLobby('24 High Street')
})

rtm.on('slack_event', async (eventType, event) => {
    if (event && event.type === 'message'){
        if (event.text === '!hello') {
            hello(event.channel, event.user)
        }
    }
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
        app.client.admin.conversations.create(token = SLACK_OAUTH_TOKEN.toLowerCase, is_private = true, name = location);
    } catch (err) {
        console.log(err.stack);
        console.log('Unable to process the createLobby request');
    }
  }
