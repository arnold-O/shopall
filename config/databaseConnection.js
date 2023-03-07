const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DB = process.env.DATABASE;

const databaseConnect = async () => {
  try {
    mongoose.connect(DB, {}).then((conn) => {
      console.log("Database connected Successfully");
    });
  } catch (error) {
    console.log("Databse errr");
  }
  
};

module.exports = databaseConnect;
