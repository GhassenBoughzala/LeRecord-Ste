require("dotenv").config({
  path: "./config/config.env",
});

module.exports = {
  secret: process.env.SECRET,
  database: process.env.MONGODB,
};
