import { SLACK_OAUTH_TOKEN, BOT_NAME, BOT_SPAM_CHANNEL } from "./constants";
import { BLOCK_HOST_VIEW } from "../user_interface/modals/hostView";
import { HOST_OPTIONS } from "../user_interface/modals/HostOptions";
import { createConnection } from "./connectDB";
import { BLOCK_JOIN_VIEW } from "../user_interface/modals/joinView";
const { App } = require("@slack/bolt");

// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");
const axios = require("axios");
const packageJson = require("../package.json");
const SlackBot = require("slackbots");

//connect to db
createConnection();

// WebClient instantiates a client that can call API methods
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
  await ack()
  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: HOST_OPTIONS(),
    });

    console.log(result)
  } catch (error) {
    console.error(error)
  }
})

app.action("action-for-join", async ({body, ack, client, locationNameAndId, office}) => {
    var restaurant = getRestaurantInfo(locationNameAndId, office)
    let RESTAURANT_NAME = restaurant.name
     ADDRESS = restaurant.address
     WALK_TIME = restaurant.walkTime
     CUISINE = restaurant.cuisine
     DIET = restaurant.dietary_restrictions
     START_TIME = getLobbyInfo().START_TIME
     DURATION = getLobbyInfo().DURATION
     IMG_URL = restaurant.photo.images.large.url
    await ack()
    try {
        const result = await client.views.open({
            trigger_id: body.trigger_id,
            view: BLOCK_JOIN_VIEW(RESTAURANT_NAME, ADDRESS, WALK_TIME, CUISINE, DIET, START_TIME, DURATION, IMG_URL),
        })

        console.log(result)
    } catch (err) {
        console.error(err)
    }
})

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
