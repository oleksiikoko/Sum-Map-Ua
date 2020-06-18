const express = require("express");
const dotenv = require("dotenv");
const createServer = require("http").createServer;

dotenv.config();

const createRoutes = require("./core/routes");

mongoose = require("mongoose");

const DB = "geoMap";
mongoose.connect("mongodb://localhost:27017/" + DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
const http = createServer(app);

createRoutes(app);

http.listen(process.env.PORT || 3005, function () {
  console.log(`Server: http://localhost:${process.env.PORT}`);
});
