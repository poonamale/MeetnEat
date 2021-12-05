const fs = require("fs");

// Read json file to get restaurants
// extractJson();

const offices = ["Belgrave", "Sussex", "John_Street"];

function extractJson(filename) {
  return fs.readFileSync(filename, "utf8");
}

export function getRestaurantsNearOffice(office) {
  if (offices.includes(office)) {
    const restaurantsJson = extractJson(
      `restaurant_api/assets/${office}_restaurants.json`
    );
    return JSON.parse(restaurantsJson).data;
  } else {
    console.error("Office not included");
  }
}

// restaurant list to send to 'host' UI
function getRestaurantListForHostUI(office, startTimeString, durationString) {
  const restaurants = getRestaurantsNearOffice(office); // options: Belgrave, Sussex, John_street
  const duration = durationString.split(" ")[0];
  const startHourByUser = startTimeString.split(":")[0];
  console.log(startHourByUser);
  const startMinuteByUser = startTimeString.split(":")[1];
  console.log(startMinuteByUser);
  const startTime = new Date(
    2021,
    11,
    6,
    startHourByUser,
    startMinuteByUser,
    0,
    0
  ).getTime();
  console.log(startTime);
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
            distance: restaurant.distance_string,
            walkTime: walkTime,
            cuisine: restaurant.cuisine[0]
              ? restaurant.cuisine[0].name
              : "unknown",
          };
          restaurantListForHostUI.push(info);
        }
      });
    }
  });

  console.log(restaurantListForHostUI);
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

// TODO: make changes when we know what data arrives from user
// TODO: make this a function
const userInputStartTime = "12:30";
const userInputDuration = "60 Minutes";

// getRestaurantListForHostUI("Belgrave", userInputStartTime, userInputDuration);

// extract necessary info to send to 'join' UI + use for event
function getRestaurantInfo(locationId, office) {
  let restaurantInfo = {};
  const restaurants = getRestaurantsNearOffice(office); // options: Belgrave, Sussex, John_street
  restaurants.forEach((restaurant) => {
    if (restaurant.location_id === locationId) {
      restaurantInfo = restaurant;
    }
  });

  //    console.log(restaurantInfo)
  return restaurantInfo;
}

// getRestaurantInfo("11711161", "Belgrave");

// Save event after user interaction to send it to mongoDB
function createEvent(restaurantInfo, startTime, duration, host, channelId) {
  const event = {
    restaurantInfo: restaurantInfo,
    startTime: startTime,
    duration: duration,
    host: host,
    members: [],
    channelId: channelId,
  };

  return event;
}

// add new member to channel to send it to mongoDB
function addMemberToChannel(memberId, channelId) {
  const channelInfo = getChannelInfoById(channelId);
  channelInfo.members.push(memberId);

  return channelInfo;
}

// TODO: get channel info from mongoDB
function getChannelInfoById(channelId) {}
