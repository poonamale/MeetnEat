export function BLOCK_HOST_VIEW(message) {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Hey there <@${message.user}>! Would you like to host or join?`,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Host",
            emoji: true,
          },
          value: "click_me_123",
          action_id: "action-for-host",
        },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Join",
            emoji: true,
          },
          value: "click_me_123",
          action_id: "action-for-join",
        },
      ],
    },
  ];
}
