const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(`MongoDB Connected: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
