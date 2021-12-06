// export function BLOCK_JOIN_VIEW(
//   RESTAURANT_NAME,
//   ADDRESS,
//   WALK_TIME,
//   CUISINE,
//   DIET,
//   START_TIME,
//   DURATION,
//   IMG_URL
// ) {
//   return {
//     type: "modal",
//     callback_id: "host_view_1",
//     block: [
//       {
//         type: "header",
//         text: {
//           type: "plain_text",
//           text: `${RESTAURANT_NAME}`,
//           emoji: true,
//         },
//       },
//       {
//         type: "section",
//         fields: [
//           {
//             type: "plain_text",
//             text: `${ADDRESS}`,
//             emoji: true,
//           },
//           {
//             type: "plain_text",
//             text: `${WALK_TIME}`,
//             emoji: true,
//           },
//           {
//             type: "plain_text",
//             text: `${CUISINE}`,
//             emoji: true,
//           },
//           {
//             type: "plain_text",
//             text: `${DIET}`,
//             emoji: true,
//           },
//           {
//             type: "plain_text",
//             text: `${START_TIME}`,
//             emoji: true,
//           },
//           {
//             type: "plain_text",
//             text: `${DURATION}`,
//             emoji: true,
//           },
//         ],
//       },
//       {
//         type: "image",
//         image_url: `${IMG_URL}`,
//         alt_text: "location_name",
//       },
//       {
//         type: "actions",
//         elements: [
//           {
//             type: "button",
//             text: {
//               type: "plain_text",
//               text: "Yeah",
//               emoji: true,
//             },
//             style: "primary",
//             value: "join_btn",
//             action_id: "actionJoin",
//           },
//           {
//             type: "button",
//             text: {
//               type: "plain_text",
//               text: "Nah",
//               emoji: true,
//             },
//             style: "danger",
//             value: "next_btn",
//             action_id: "actionNext",
//           },
//         ],
//       },
//     ],
//   };
// }
export function BLOCK_JOIN_VIEW() {
  return {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "McDonald's",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "plain_text",
            text: "Address: 21 Pong Street",
            emoji: true,
          },
          {
            type: "plain_text",
            text: "Walking: 5 mins",
            emoji: true,
          },
          {
            type: "plain_text",
            text: "Cuisine: American",
            emoji: true,
          },
          {
            type: "plain_text",
            text: "Diet: Vegan Friendly",
            emoji: true,
          },
          {
            type: "plain_text",
            text: "Start Time: 12:30 PM",
            emoji: true,
          },
          {
            type: "plain_text",
            text: "Duration: 60 Mins",
            emoji: true,
          },
        ],
      },
      {
        type: "image",
        image_url:
          "https://i1.wp.com/thetempest.co/wp-content/uploads/2017/08/The-wise-words-of-Michael-Scott-Imgur-2.jpg?w=1024&ssl=1",
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
            value: "join_btn",
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
