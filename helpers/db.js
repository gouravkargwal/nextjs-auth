import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";

export async function connectDatabase() {
  const client = await MongoClient.connect(url);
  return client;
}
