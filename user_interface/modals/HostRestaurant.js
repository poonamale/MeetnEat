export function HOST_RESTAURANT() {
    return {
            "type": "modal",
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "title": {
                "type": "plain_text",
                "text": "Host a Lunch Meet",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": "Please choose a restaurant where you'd like to host:",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Airstream Suite*\n*Share with another person*. Private walk-in bathroom. TV. Heating. Kitchen with microwave, basic cooking utensils, wine glasses and silverware."
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/Streamline-Beach.png",
                        "alt_text": "Airstream Suite"
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "1x Queen Bed"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "|"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "$220 / night"
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
                            "value": "click_me_123"
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
            ]  
      }
  }
  