export function LOCATION_PROMPT() {
  return [
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Belgrave House",
      },
      accessory: {
        type: "image",
        image_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3EI2njATd0cZQW2BCaksACaJMzs3DKHqqdNqsgibGiapafU0LLuFy7mNx8i0ltnKlhc&usqp=CAU",
        alt_text: "Windsor Court Hotel thumbnail",
      },
    },
    {
      type: "context",
      elements: [
        {
          text: ":round_pushpin:Location Near London Victoria Station",
          type: "plain_text",
        },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          text: {
            type: "plain_text",
            text: "Click Me",
            emoji: true,
          },
          type: "button",
          value: "belgrave-house",
          action_id: "action-for-belgrave",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Sussex House",
      },
      accessory: {
        type: "image",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Sussex_House_-_geograph.org.uk_-_710865.jpg",
        alt_text: "Sussex House",
      },
    },
    {
      type: "context",
      elements: [
        {
          text: ":round_pushpin:Location:Near Brighton Station",
          type: "plain_text",
        },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          text: {
            type: "plain_text",
            text: "Click Me",
            emoji: true,
          },
          type: "button",
          value: "sussex-house",
          action_id: "action-for-sussex",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "John Street",
      },
      accessory: {
        type: "image",
        image_url:
          "https://i.pinimg.com/originals/d8/e5/3c/d8e53c4751d065ed6f6271b75a38f31f.jpg",
        alt_text: "John Street Image",
      },
    },
    {
      type: "context",
      elements: [
        {
          text: ":round_pushpin:Location:Near Brighton city campus",
          type: "plain_text",
        },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          text: {
            type: "plain_text",
            text: "Click Me",
            emoji: true,
          },
          type: "button",
          value: "john-street",
          action_id: "action-for-john",
        },
      ],
    },
    {
      type: "divider",
    },
  ];
}
