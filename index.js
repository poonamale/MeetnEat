const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-2783537601379-2785120023221-Yql6ZVqerJcXLcWnTrNMzYiq',
  name: 'aaa'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    'general',
    'Lets plan lunch',
    params
  );
});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});
