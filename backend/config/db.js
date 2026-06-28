import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "task_tracker",
    });

    console.log(
      `✅ MongoDB Connected: ${connection.connection.host}/${connection.connection.name}`,
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;
