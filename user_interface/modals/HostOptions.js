export function HOST_OPTIONS(ArrayOfPlaces) {
  return {
    type: "modal",
    callback_id: "host_view_1",
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
        block_id: "time_input",
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
          text: "Select a Start Time",
          emoji: true,
        },
      },
      {
        type: "input",
        block_id: "duration_input",
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
    ],
  };
}