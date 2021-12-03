require('dotenv').config()

export const BOT_SPAM_CHANNEL = '#general' // this is the channel you want your bot online & spam to go
export const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET
export const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN