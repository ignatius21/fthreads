import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", false);
  if (!process.env.MONGODB_URL) return console.log("MongoDB URL not found");
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};