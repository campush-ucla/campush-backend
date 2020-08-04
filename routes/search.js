var express = require("express");
var app = express();
const router = express.Router();
const { client } = require("../database/db");
const { json } = require("express");

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

// return all clubs with descriptions and emails within a certain category
router.get("/clubs", async function (req, res) {
  let db = client.db("campush");
  let collection = db.collection("clubs");
  const category = req.query.category;
  let clubs = await collection
    .find(
      { "Category": {$regex: new RegExp(`^${category}$`, 'i')} },
      { projection: { "Organization Name": 1, "Organization Description": 1, "Email": 1, _id: 0 } }
    )
    .toArray();
  if (clubs !== null) {
    res.json(clubs);
  } else {
    res.json("Not found");
  }
});

// return club name, description and email for a given club
router.get("/club", async function (req, res) {
  let db = client.db("campush");
  let collection = db.collection("clubs");
  const name = req.query.name;
  let clubs = await collection
    .find(
      { "Organization Name": {$regex: new RegExp(`^${name}$`, 'i')} },
      { projection: { "Organization Name": 1, "Category": 1, "Organization Description": 1, "Email": 1, _id: 0 } }
    )
    .toArray();
  if (clubs !== null) {
    res.json(clubs);
  } else {
    res.json("Not found");
  }
});

module.exports = router;
