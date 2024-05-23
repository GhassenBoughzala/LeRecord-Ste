const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const catRoute = require("./routes/category");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const fournisseurRoute = require("./routes/fournisseur");
let path = require("path");
var compression = require("compression");

require("dotenv").config({});

connectDB();

var app = express();
app.use(compression());

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, Product-Session, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Referer, User-Agent"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});


app.use("/api/auth", authRoute);
app.use("api//users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", catRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/fournisseurs", fournisseurRoute);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  // serve static assets from the build folder
  app.use(express.static(path.join(__dirname, "client/build")));
  // serve index.html for all remaining routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5500;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
