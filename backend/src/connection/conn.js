import mongoose from "mongoose";

export const conn = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error while connecting to DB");
  }
};
