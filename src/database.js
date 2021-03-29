var Datastore = require('nedb')
  let db = new Datastore({ filename: './src/players.db' });


  // load database
  db.loadDatabase((err) => {
    if (err) {
        console.log(err);
        return; 
    }
    console.log('Database successfully loaded')
});


module.exports = db;