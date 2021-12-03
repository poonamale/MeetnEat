const fs = require('fs')

// Read json file to get restaurants
require.extensions['.json'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8')
}

const offices = ["Belgrave", "Sussex", "John_Street"]

function getRestaurantsNearOffice(office) {
    if (offices.includes(office)) {
        restaurantsJson = require(`../restaurant_api/assets/${office}_restaurants.json`)
        return JSON.parse(restaurantsJson).data
    } else {
        console.error("Office not included")
    }
}

// restaurant list to send to 'host' UI
function getRestaurantListForHostUI(office, startTime, duration) {
    const restaurants = getRestaurantsNearOffice(office) // options: Belgrave, Sussex, John_street
    const endTime = startTime + duration * 60000

    let restaurantListForHostUI = []
    restaurants.forEach(restaurant => {
        if (restaurant.hours.week_ranges != null) {
            const d = new Date()
            const dayOfWeek = d.getDay()

            let walkTime = 0
            if (restaurant.distance_string.split(' ')[1] === "ft") {
                walkTime = Math.ceil(restaurant.distance_string.split(' ')[0] / 264)
            } else {
                walkTime = Math.ceil(restaurant.distance_string.split(' ')[0] / 0.05)
            }

            restaurant.hours.week_ranges[dayOfWeek].forEach(open => {
                const openTime = convertTimeFromJson(open.open_time).getTime()
                const closeTime = convertTimeFromJson(open.close_time).getTime()

                if (openTime <= startTime) {
                    const info = {
                        locationId: restaurant.location_id, 
                        name: restaurant.name, 
                        address: restaurant.address, 
                        openTime: new Date(openTime).toTimeString(), 
                        closeTime: new Date(closeTime).toTimeString(), 
                        distance: restaurant.distance_string,
                        walkTime: walkTime,
                        cuisine: restaurant.cuisine[0] ? restaurant.cuisine[0].name : "unknown"
                    }
                    restaurantListForHostUI.push(info)
                }

            })
        }
    })

    console.log(restaurantListForHostUI)
}

function convertTimeFromJson(jsonTime) {
    const hour = Math.floor(jsonTime / 60)
    const minute = (jsonTime / 60 - hour) * 60
    const d = new Date(2021, 11, 6, 12, 30, 0, 0)
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    const t = new Date(year, month, day, hour, minute, 0, 0)
    return t
}

// TODO: make changes when we know what data arrives from user
// TODO: make this a function
const userInputStartTime = new Date(2021, 11, 6, 12, 30, 0, 0).getTime()
const userInputDuration = 60

getRestaurantListForHostUI("Belgrave", userInputStartTime, userInputDuration)

// TODO: extract necessary info to send to 'join' UI
function getRestaurantInfo (locationId) {
    let restaurantInfo = {}

}



// TODO: Save event after user interaction to json file
const events = []

function createEvent (restaurantInfo, time, host, members, channelId) {
    
}