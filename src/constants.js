require('dotenv').config()

export const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN
export const BOT_SPAM_CHANNEL = '#general' // this is the channel you want your bot online & spam to go