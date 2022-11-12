require("dotenv").config({});

module.exports = {
  secret: process.env.SECRET,
  database: process.env.MONGODB,
};
