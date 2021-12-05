import { SLACK_OAUTH_TOKEN, BOT_NAME, BOT_SPAM_CHANNEL } from "./constants";
import { BLOCK_INIT_VIEW } from "../user_interface/modals/InitialView";
import { HOST_OPTIONS } from "../user_interface/modals/HostOptions";
import { HOST_RESTAURANT } from "../user_interface/modals/HostRestaurant";
import { createClient } from "./Database/connectDB";
import { postLocationData, closeSession } from "./Database/Crud";
import { getRestaurantListForHostUI } from "./interact_with_json";

const { App } = require("@slack/bolt");

// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");
const axios = require("axios");
const packageJson = require("../package.json");
const SlackBot = require("slackbots");

//create single instance and connect to db
const clientDataBase = new createClient();

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
  //createLobby('Sorry Final Test I Swear', appHackTeam3)
  //sendMessage(general, "Would you like to Host or Join?")
})();

app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: BLOCK_INIT_VIEW(message),
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
      view: HOST_OPTIONS(),
    });

  } catch (error) {
    console.error(error);
  }
  clientDataBase.close();
});

app.view('host_view_1', async ({ ack, body, view, context }) => {
  // Acknowledge the view_submission event
  ack();

  const selectedTime = view['state']['values']['time_input']['timepicker-action'];
  const selectedDuration = view['state']['values']['duration_input']['static_select-action'];
  const user = body['user']['id'];

  //probably want to store these values somewhere
  console.log(selectedTime);
  console.log(selectedDuration);
  console.log("user_id:", user);

  //Passing the host restaurant view after time and duration is stored
  try {
    const allOpenRestaurants = getRestaurantListForHostUI("Belgrave", selectedTime.selected_time, selectedDuration.selected_option.text.text)
    const restaurantDetails = [];
    //const photoUrl = belgrave_rest.data.photo.large.url
    allOpenRestaurants.forEach((element, index) => {
      restaurantDetails.push(
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*${element.name}*\n${element.address}`
          },
          "accessory": {
            "type": "image",
            "image_url": `${element.photo}`,
            "alt_text": "photo of restaurant",
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `Walk time: ${element.walkTime} mins`
            },
            {
              "type": "mrkdwn",
              "text": "|"
            },
            {
              "type": "mrkdwn",
              "text": `Cuisine: ${element.cuisine}`
            }
          ]
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Choose",
                "emoji": true
              },
              "value": `${index}`
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "View Details",
                "emoji": true
              },
              "value": "click_me_123"
            }
          ]
        },
        {
          "type": "divider"
        }
      )
    })

    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: HOST_RESTAURANT(restaurantDetails),
    });

    console.log(result);
    console.log(allOpenRestaurants);
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

// list of restaurant info based on that location.
// save user ID if they're in a lobby, and remove the user ID if they have left the lobby.
// split out the channel name and the place
// location place-to-eat time
// list view of the restaurant and detail view
