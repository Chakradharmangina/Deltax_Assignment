const express = require("express");
const router = express.Router();
const userModle = require("../model/usermodel");

router.post("/addsong", async (req, res) => {
  let data = req.body;
  console.log(data);
  const song = await userModle.findOne({ songname: data.email });
  if (!song) {
    try {
      const result = userModle.create({
        songname: data.songname,
        dateofrelease: data.dateofrelease,
        artistname: data.artistname,
        dateofbirth: data.dateofbirth,
        Bio: data.Bio,
      });
      res.send("song added sucessfull");
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send("song already exist");
  }
});

router.get("/getdata", async (req, res) => {
  try {
    const items = await userModle.find().lean().exec();
    items.sort((a, b) => (a["songavgrating"] > b["songavgrating"] ? -1 : 1));
    res.json({ items });
  } catch (err) {
    console.log(err);
  }
});

router.post("/addavg", async (req, res) => {
  let addavg = req.body;
  const item1 = await userModle.findOne({ songname: addavg.songname });
  const item2 = await userModle.find({ artistname: addavg.artistname });
  let newavg = 0;
  if (item1.songavgrating === 0) {
    newavg = addavg.newrating;
  } else {
    newavg = (item1.songavgrating + addavg.newrating) / 2;
  }
  let newartistavgrating = 0;
  item2.forEach((i) =>
    i.artistavgrating == 0
      ? (newartistavgrating = addavg.newrating)
      : (newartistavgrating = (i.artistavgrating + addavg.newrating) / 2)
  );
  let totalratedusers = item1.totalratedusers + 1;
  try {
    const items = await userModle.findOneAndUpdate(
      { songname: addavg.songname },
      {
        $set: {
          songavgrating: newavg,
          totalratedusers: totalratedusers,
          artistavgrating: newartistavgrating,
        },
      }
    );
    const newitems = await userModle.find().lean().exec();
    newitems.sort((a, b) => (a["songavgrating"] > b["songavgrating"] ? -1 : 1));
    res.send({ newitems });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
