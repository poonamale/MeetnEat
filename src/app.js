<<<<<<< HEAD
import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL, BOT_NAME } from "./constants";
import { createConnection } from "./connectDB";
=======
import { SLACK_OAUTH_TOKEN, BOT_NAME, BOT_SPAM_CHANNEL } from "./constants";
const SlackBot = require("slackbots");
const axios = require("axios");
const packageJson = require("../package.json");
const { App } = require("@slack/bolt");
import { BLOCK_HOST_VIEW } from "../user_interface/modals/hostView";
// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
>>>>>>> main
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
<<<<<<< HEAD
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

=======
  //createLobby('Sorry Final Test I Swear', appHackTeam3)
  //sendMessage(general, "Would you like to Host or Join?")
})();

app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: BLOCK_HOST_VIEW(message),
    text: `Hey there <@${message.user}>!`,
  });
});

app.action("action-for-host", async ({ body, ack, client }) => {
  // Acknowledge the action
  await ack();
  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        title: {
          type: "plain_text",
          text: "Host a Lunch Meet",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Submit",
          emoji: true,
        },
        type: "modal",
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
        blocks: [
          {
            type: "divider",
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "title",
              placeholder: {
                type: "plain_text",
                text: "Name a temporary private channel",
              },
            },
            label: {
              type: "plain_text",
              text: "Channel Name",
            },
          },
          {
            type: "input",
            element: {
              type: "timepicker",
              placeholder: {
                type: "plain_text",
                text: "Select time",
                emoji: true,
              },
              action_id: "timepicker-action",
            },
            label: {
              type: "plain_text",
              text: "Start Time",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "static_select",
              placeholder: {
                type: "plain_text",
                text: "Minutes",
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "30 Minutes",
                    emoji: true,
                  },
                  value: "value-0",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "60 Minutes",
                    emoji: true,
                  },
                  value: "value-1",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "90 Minutes",
                    emoji: true,
                  },
                  value: "value-2",
                },
              ],
              action_id: "static_select-action",
            },
            label: {
              type: "plain_text",
              text: "Choose a Duration",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "static_select",
              placeholder: {
                type: "plain_text",
                text: "Select a Restaurant",
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "*this is plain_text text*",
                    emoji: true,
                  },
                  value: "value-0",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "*this is plain_text text*",
                    emoji: true,
                  },
                  value: "value-1",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "*this is plain_text text*",
                    emoji: true,
                  },
                  value: "value-2",
                },
              ],
              action_id: "static_select-action",
            },
            label: {
              type: "plain_text",
              text: "Place",
              emoji: true,
            },
          },
        ],
      },
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

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

>>>>>>> main
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
