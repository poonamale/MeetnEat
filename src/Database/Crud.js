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
