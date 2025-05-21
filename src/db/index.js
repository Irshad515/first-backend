import mongoose from "mongoose";
import { DB_name } from "./constants.js";


const connectDB = async () => {
  try {
    const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
    console.log(`\n MongoDB connected !!  DB HOST: ${connectionInstances.connection.host} \n`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;