export function JOIN_OPTIONS(
  restaurant,
  address,
  distance,
  cuisine,
  diet,
  start,
  duration,
  img
) {
  return {
    type: "modal",
    callback_id: "host_view_1",
    title: {
      type: "plain_text",
      text: "Join a Lunch Meet",
      emoji: true,
    },
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: restaurant ? restaurant : "McDonald's",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "plain_text",
            text: address ? address : "Address: 21 Pong Street",
            emoji: true,
          },
          {
            type: "plain_text",
            text: distance ? distance : "Walking: 5 mins",
            emoji: true,
          },
          {
            type: "plain_text",
            text: cuisine ? cuisine : "Cuisine: American",
            emoji: true,
          },
          {
            type: "plain_text",
            text: diet ? diet : "Diet: Fast Food",
            emoji: true,
          },
          {
            type: "plain_text",
            text: start ? start : "Start Time: 12:30 PM",
            emoji: true,
          },
          {
            type: "plain_text",
            text: duration ? duration : "Duration: 60 Mins",
            emoji: true,
          },
        ],
      },
      {
        type: "image",
        image_url: img
          ? img
          : "https://live.staticflickr.com/3087/2559557812_d264a19f1f_c.jpg",
        alt_text: "location_name",
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Yes!",
              emoji: true,
            },
            style: "primary",
            value: "belgrave",
            action_id: "actionJoin",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "No",
              emoji: true,
            },
            style: "danger",
            value: "next_btn",
            action_id: "actionNext",
          },
        ],
      },
    ],
  };
}
