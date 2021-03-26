var Datastore = require('nedb')
  let db = new Datastore({ filename: './players.db' });


  // load database
  db.loadDatabase((err) => {
    if (err) {
        console.log(err);
        return; 
    }
    console.log('Database successfully loaded')
});

// db.insert({"players": []});

let dbData;
db.find({}, (err, data) => {
    dbData = data;
    // console.log(data)
})

module.exports = db;