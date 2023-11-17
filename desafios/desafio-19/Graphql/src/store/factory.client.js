import MongoClient from "./mongo.client.js";

class StoreFactory {
  createDatabaseClient() {
    return MongoClient.getInstance();
  }
}

export default StoreFactory;
