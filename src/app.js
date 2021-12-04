import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL, BOT_NAME } from "./constants";
import { createConnection } from "./connectDB";
const { WebClient, LogLevel } = require("@slack/web-api");
const { App } = require("@slack/bolt");
const axios = require("axios");
const packageJson = require("../package.json");
const SlackBot = require("slackbots");

//connect to db
createConnection();

// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)

// WebClient insantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(SLACK_OAUTH_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
});

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_OAUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
  var appHackTeam3 = "U02NLRLKX0X, U02NYD1G8TY, U02PW25QJ1W, U02PSK9CK5W";
  createLobby("Sorry Final Test I Swear", appHackTeam3);
})();

function hello(channelId, userId) {
  sendMessage(channelId, `Heya! <@${userId}>`);
}

async function sendMessage(channel, message) {
  await web.chat.postMessage({
    channel: channel,
    text: message,
  });
}

async function createLobby(location, host) {
  location = location.toLowerCase();
  location = location.replace(/ /g, "");
  var channel_id;
  console.log(location + " lobby was created!");
  try {
    const result = await client.conversations.create({
      token: SLACK_OAUTH_TOKEN,
      name: location,
      is_private: true,
    });
    channel_id = result.channel.id;
  } catch (err) {
    console.log("Unable to process the createLobby request");
    console.error("Reason: " + err.data.error);
  }
  inviteToLobby(channel_id, host);
}

async function inviteToLobby(channel_id, users) {
  try {
    const result = await client.conversations.invite({
      token: SLACK_OAUTH_TOKEN,
      channel: channel_id,
      users: users,
    });
  } catch (err) {
    console.log("Unable to process the inviteToLobby request");
    console.error("Reason: " + err.data.error);
  }
}
