const express = require("express");
const server = express();
const bp = require("body-parser");
server.use(bp.json());
const cors = require("cors");
server.use(cors());
const song = require("./Routes/Data");

server.get("/", (req, res) => {
  try {
    res.send("haii");
  } catch (err) {
    res.send(err);
  }
});
server.use("/", song);
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/songsdata")
  .then((res) => console.log("connected to db"))
  .catch((err) => console.log(err));
server.listen(3003, () => console.log("server started"));
