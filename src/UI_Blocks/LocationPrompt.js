

export const locationPromptJson = `{
	"type": "message",
	"title": {
		"type": "plain_text",
		"text": "My App",
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
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Lunch around ",
				"emoji": true
			}
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": " {{ Belgrave House }} ",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Pick a time for food"
			},
			"accessory": {
				"type": "timepicker",
				"initial_time": "12:30",
				"placeholder": {
					"type": "plain_text",
					"text": "Select time",
					"emoji": true
				},
				"action_id": "timepicker-action"
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"style": "primary",
					"text": {
						"type": "plain_text",
						"text": "Continue",
						"emoji": true
					},
					"value": "pick-time",
					"action_id": "submit"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Select a different location?"
			},
			"accessory": {
				"type": "button",
				"style": "danger",
				"text": {
					"type": "plain_text",
					"text": "Go Back",
					"emoji": true
				},
				"value": "locations",
				"action_id": "pick-location"
			}
		}
	]
}`
