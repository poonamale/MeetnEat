import { NAME, PASSWORD, CLUSTER_URL } from "./constants";

const { MongoClient } = require("mongodb");

export async function createConnection() {
  // code to connect to db
  const uri = `mongodb+srv://${NAME}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    let connectedClient = await client.connect();

    console.log(
      "database connected " + connectedClient.db().admin().listDatabases()
    );
  } catch (e) {
    // perform actions on the collection object
    console.error(e);
    client.close();
  } finally {
    await client.close();
  }
}
