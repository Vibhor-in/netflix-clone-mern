import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(error);
  }
};

export default databaseConnection;
