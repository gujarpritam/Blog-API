const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function db() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = db;
