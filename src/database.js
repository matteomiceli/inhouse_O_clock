require('dotenv').config();
const db = require('mongoose');


db.connect(process.env.DB_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to DB...'))
  .catch((err) => console.log(err));


module.exports = db;



// make a player model and then replace playerModel function with mongoose schema


// var Datastore = require('nedb')
//   let db = new Datastore({ filename: './src/players.db' });


//   // load database
//   db.loadDatabase((err) => {
//     if (err) {
//         console.log(err);
//         return; 
//     }
//     console.log('Database successfully loaded')
// });