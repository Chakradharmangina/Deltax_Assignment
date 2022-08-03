const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  songname: {
    type: String,
    required: [true, "enter Song Name "],
  },
  dateofrelease: {
    type: String,
    required: true,
  },
  artistname: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: String,
    required: true,
  },
  Bio: {
    type: String,
  },
  artistavgrating: {
    type: Number,
    default: 0,
  },
  songavgrating: {
    type: Number,
    default: 0,
  },
  totalratedusers: {
    type: Number,
    default: 0,
  },
});
const userModle = mongoose.model("userModle", userSchema);
module.exports = userModle;
