var express = require('express');
var app = express();
const router = express.Router();
const {client} = require('../database/db')

//return all club info
router.get("/allclubs", async function (req, res) {
    let db = client.db('campush')
    let collection = db.collection('clubs')
    let items = await collection.find({}).toArray()
    if (items !== null) {
        res.json(JSON.stringify(items));
    } else {
        res.json('Not found');
    }
});

// return all club names
router.get("/allnames", async function (req, res) {
    let db = client.db('campush')
    let collection = db.collection('clubs')
    let items = await collection.find({}, {projection: {"Organization Name": 1, "_id": 0}}).toArray()
    if (items !== null) {
        res.json(JSON.stringify(items));
    } else {
        res.json('Not found');
    }
});

module.exports = router;