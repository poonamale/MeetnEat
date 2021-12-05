export function HOST_RESTAURANT(restaurantDetails) {
    return {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "Host a Lunch Meet",
                "emoji": true
            },
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
            "blocks": restaurantDetails
        }
  }
  