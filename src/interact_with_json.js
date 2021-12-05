const fs = require("fs");

// Read json file to get restaurants
// extractJson();

const offices = ["Belgrave", "Sussex", "John_Street"];

function extractJson(filename) {
  return fs.readFileSync(filename, "utf8");
}
 //if exported, delete ../ ?
function getRestaurantsNearOffice(office) {
  if (offices.includes(office)) {
    const restaurantsJson = extractJson(
      `../restaurant_api/assets/${office}_restaurants.json`
    );
    return JSON.parse(restaurantsJson).data;
  } else {
    console.error("Office not included");
  }
}

// restaurant list to send to 'host' UI
function getRestaurantListForHostUI(office, startTimeString, durationString) {
  const restaurants = getRestaurantsNearOffice(office); // options: Belgrave, Sussex, John_Street
  const duration = durationString.split(" ")[0];
  const startHourByUser = startTimeString.split(":")[0];
  const startMinuteByUser = startTimeString.split(":")[1];
  const startTime = new Date(
    2021,
    11,
    6,
    startHourByUser,
    startMinuteByUser,
    0,
    0
  ).getTime();
  const endTime = startTime + duration * 60000;

  let restaurantListForHostUI = [];
  restaurants.forEach((restaurant) => {
    if (restaurant.hours.week_ranges != null) {
      const d = new Date();
      const dayOfWeek = d.getDay();

      let walkTime = 0;
      if (restaurant.distance_string.split(" ")[1] === "ft") {
        walkTime = Math.ceil(restaurant.distance_string.split(" ")[0] / 264);
      } else {
        walkTime = Math.ceil(restaurant.distance_string.split(" ")[0] / 0.05);
      }

      restaurant.hours.week_ranges[dayOfWeek].forEach((open) => {
        const openTime = convertTimeFromJson(open.open_time).getTime();
        const closeTime = convertTimeFromJson(open.close_time).getTime();

        if (openTime <= startTime && endTime <= closeTime) {
          const info = {
            locationId: restaurant.location_id,
            name: restaurant.name,
            address: restaurant.address,
            openTime: new Date(openTime).toTimeString(),
            closeTime: new Date(closeTime).toTimeString(),
            walkTime: walkTime,
            cuisine: restaurant.cuisine[0]
              ? restaurant.cuisine[0].name
              : "unknown",
            photo: restaurant.photo.images.large.url,
            dietaryRestrictions : restaurant.dietary_restrictions,
            website: restaurant.website
          }
          restaurantListForHostUI.push(info);
        }
      });
    }
  });

//  console.log(restaurantListForHostUI);
  return restaurantListForHostUI;
}

function convertTimeFromJson(jsonTime) {
  const hour = Math.floor(jsonTime / 60);
  const minute = (jsonTime / 60 - hour) * 60;
  // TODO: in live version, change the following to new Date() !!!!!!
  const d = new Date(2021, 11, 6, 3, 30, 0, 0);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const t = new Date(year, month, day, hour, minute, 0, 0);
  return t;
}

// extract necessary info to send to 'join' UI + use for event
function getRestaurantInfo(locationNameAndId, office) {
  const locationId = locationNameAndId.split("-")[1]
  let restaurantInfo = {}
  const restaurants = getRestaurantsNearOffice(office); // options: Belgrave, Sussex, John_Street
  restaurants.forEach((restaurant) => {
    if (restaurant.location_id === locationId) {
        let walkTime = 0;
      if (restaurant.distance_string.split(" ")[1] === "ft") {
        walkTime = Math.ceil(restaurant.distance_string.split(" ")[0] / 264);
      } else {
        walkTime = Math.ceil(restaurant.distance_string.split(" ")[0] / 0.05);
      }

      restaurantInfo = {
        locationId: restaurant.location_id,
        name: restaurant.name,
        address: restaurant.address,
        walkTime: walkTime,
        cuisine: restaurant.cuisine[0]
          ? restaurant.cuisine[0].name
          : "unknown",
        photo: restaurant.photo.images.large.url,
        dietaryRestrictions : restaurant.dietary_restrictions,
        website: restaurant.website
      }
    }
  });

//  console.log(restaurantInfo)
  return restaurantInfo;
}

let eventList = []

// Save event after user interaction to send it to mongoDB
function createEvent(restaurantInfo, startTimeString, durationString, host, channelId) {
    const duration = durationString.split(" ")[0];
    const startHourByUser = startTimeString.split(":")[0];
    const startMinuteByUser = startTimeString.split(":")[1];
    const startTime = new Date(
      2021,
      11,
      6,
      startHourByUser,
      startMinuteByUser,
      0,
      0
    ).getTime();
    const event = {
    restaurantInfo: restaurantInfo,
    startTime: startTime,
    duration: duration,
    host: host,
    members: [],
    channelId: channelId,
  };

  eventList.push(event)
//  return event;
}

// add new member to channel to send it to mongoDB
function addMemberToEvent(memberId, channelId) {
  const eventInfo = getChannelInfoById(channelId);
  eventInfo.event.members.push(memberId);
  // replace old event with updated event with new member
  eventList.splice(eventInfo.position, 1, eventInfo.event)
}

// get channel info from eventList array
function getChannelInfoById(channelId) {
    let returnEvent = {}
    eventList.forEach((event, index) => {
        if (event.channelId === channelId) {
            returnEvent = {event: event, position: index}
        }
    })
    return returnEvent
}


// const userInputStartTime = "12:30";
// const userInputDuration = "60 Minutes";
// getRestaurantListForHostUI("Belgrave", userInputStartTime, userInputDuration);
console.log(getRestaurantInfo("The Grosvenor Arms-680359", "Belgrave"))
// const place = getRestaurantInfo("The Grosvenor Arms-11711161", "Belgrave");
// createEvent(place, userInputStartTime, userInputDuration, "Bori", "someChannelId")
// addMemberToEvent("Pedro", "someChannelId")
// console.log(eventList)