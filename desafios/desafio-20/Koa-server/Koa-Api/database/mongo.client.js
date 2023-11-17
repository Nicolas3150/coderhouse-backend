import mongoose from "mongoose";

export const connect = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/challenge18");
    await mongoose.connect(
      "mongodb+srv://nico:nico123@cluster0.uridlts.mongodb.net/desafio20?retryWrites=true&w=majority"
    );

    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

export const disconnect = async () => {
  try {
    await mongoose.connection.close();

    console.log("Database disconnected!");
  } catch (error) {
    console.log(error);
  }
};
