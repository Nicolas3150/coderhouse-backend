import mongoose from "mongoose";
import userModel from "../models/user.js";
import config from "../config.js";

mongoose.connect(config.MONGO_URL);

class UserContainer {
  constructor() {
    this.collection = userModel;
  }

  async saveUser(user) {
    try {
      let newUser = new this.collection(user);
      await newUser.save();
      return newUser;
    } catch (e) {
      console.log(e);
    }
  }

  async ifExist(username) {
    try {
      const user = await this.collection.findOne({ username });
      if (user) return true;
      return false;
    } catch (err) {
      console.log(err);
    }
  }

  getById = (id, done) => {
    try {
      this.collection.findById(id, done);
    } catch (error) {
      console.log(error);
    }
  };

  getByUsername = async (username) => {
    try {
      const user = await this.collection.findOne({ username });
      return user;
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserContainer;
