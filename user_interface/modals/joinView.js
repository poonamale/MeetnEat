export function BLOCK_JOIN_VIEW(RESTAURANT_NAME, ADDRESS, WALK_TIME, CUISINE, DIET, START_TIME, DURATION, IMG_URL) {
    return [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": `${RESTAURANT_NAME}`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "fields": [
                {
                    "type": "plain_text",
                    "text": `${ADDRESS}`,
                    "emoji": true
                },
                {
                    "type": "plain_text",
                    "text": `${WALK_TIME}`,
                    "emoji": true
                },
                {
                    "type": "plain_text",
                    "text": `${CUISINE}`,
                    "emoji": true
                },
                {
                    "type": "plain_text",
                    "text": `${DIET}`,
                    "emoji": true
                },
                {
                    "type": "plain_text",
                    "text": `${START_TIME}`,
                    "emoji": true
                },
                {
                    "type": "plain_text",
                    "text": `${DURATION}`,
                    "emoji": true
                }
            ]
        },
        {
            "type": "image",
            "image_url": `${IMG_URL}`,
            "alt_text": "location_name"
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Yeah",
                        "emoji": true
                    },
                    "style": "primary",
                    "value": "join_btn",
                    "action_id": "actionJoin"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Nah",
                        "emoji": true
                    },
                    "style": "danger",
                    "value": "next_btn",
                    "action_id": "actionNext"
                }
            ]
        }
    ]

}