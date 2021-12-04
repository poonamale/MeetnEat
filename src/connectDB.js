const { MongoClient } = require("mongodb");

import { NAME, PASSWORD, CLUSTER_URL } from "./constants";

export async function createConnection() {
  // code to connect to db
  const uri = `mongodb+srv://${NAME}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    let connectClient = await client.connect();
    console.log(connectClient.topology.isConnected);
  } catch (e) {
    // perform actions on the collection object
    console.log("\n ------- mongodb error ----- \n");
    console.error(e);
    client.close();
  } finally {
    console.log("closing db connection");
    await client.close();
  }
}
