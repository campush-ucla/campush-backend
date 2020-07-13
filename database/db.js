var {MongoClient} = require('mongodb');
let client = MongoClient("mongodb://localhost:27017")

// Connect to the db
client.connect(function (err) {
    let db = client.db('campush')
    let collection = db.collection('clubs')
    collection.find({}).toArray((err, items) => {
      if(err) throw err;    
      // console.log(items);
    });          
});

module.exports = {client}