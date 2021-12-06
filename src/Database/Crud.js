export async function saveNewUser(client, user_id) {
  try {
    console.log(`saving ${user_id}`);
    await client.connect();
    const result = await client
      .db("MeetNEat")
      .collection("Users")
      .insertOne({ user_id: `user_${user_id}` });
    console.log(`New user id added to the db ${user_id}`);
  } catch (e) {
    // perform actions on the collection object
    console.log("\n ------- mongodb error ----- \n");
    console.error(e);
    client.close();
  } finally {
    client.close();
  }
}

export async function postLocationData(client, locationName, locationJson) {
  try {
    await client.connect();
    console.log(`saving location ${locationJson}`);

    await locationJson.forEach((element) => {
      InsertOne(client, locationName, element.location_id, element);
      console.log(`item added: ${element}`);
    });
  } catch (e) {
    // perform actions on the collection object
    console.log("\n ------- mongodb error ----- \n");
    console.error(e);
    client.close();
  }
}

async function InsertOne(client, name, id, item) {
  await client
    .db("MeetNEat")
    .collection(name)
    .insertOne({ _id: id, data: item });
}

export async function closeSession(client) {
  await client.close();
}

export async function AddEventToDB(client, event) {
  try {
    await client.connect();
    client.db("MeetNEat").collection("events").insertOne(event);
  } catch (e) {
    // perform actions on the collection object
    console.log("\n ------- mongodb error ----- \n");
    console.error(e);
    client.close();
  }
}

export async function insertOneNewChannel(client, channel_id) {
  const query = { _id: "demo", payload: { saved_channel_id: channel_id } };
  try {
    await client.connect();
    await client
      .db("MeetNEat")
      .collection("channels_id")
      .insertOne(query, update);
  } catch (e) {
    console.log("\n ------- mongodb error ----- \n");
    console.error(e);
    await client.close();
  }
}

export async function readOneChannel(client) {
  try {
    let result = await client.connect();
    await client.db("MeetNEat").collection("channels_id").find();
    console.log("channel id found in db is " + result);
  } catch (e) {
    console.log("\n ------- mongodb error ----- \n");
    console.error(e);
    await client.close();
  }
  return result;
}
