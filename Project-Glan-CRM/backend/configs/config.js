const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;