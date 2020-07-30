var express = require("express");
var app = express();
const router = express.Router();
const { client } = require("../database/db");

//return all club info
router.get("/allclubs", async function (req, res) {
  let db = client.db("campush");
  let collection = db.collection("clubs");
  let clubs = await collection.find({}).toArray();
  if (clubs !== null) {
    res.json(JSON.stringify(clubs));
  } else {
    res.json("Not found");
  }
});

// return all club names
router.get("/allnames", async function (req, res) {
  let db = client.db("campush");
  let collection = db.collection("clubs");
  let clubs = await collection
    .find({}, { projection: { "Organization Name": 1, _id: 0 } })
    .toArray();
  if (clubs !== null) {
    res.json(JSON.stringify(clubs));
  } else {
    res.json("Not found");
  }
});

// return all clubs within a certain category
router.get("/clubs", async function (req, res) {
  let db = client.db("campush");
  let collection = db.collection("clubs");
  const category = req.query.category;
  let clubs = await collection
    .find(
      { "Searched Category": { $regex: new RegExp(`^${category}$`, "i") } },
      { projection: { "Organization Name": 1, _id: 0 } }
    )
    .toArray();
  if (clubs !== null) {
    res.json(clubs);
  } else {
    res.json("Not found");
  }
});

module.exports = router;
