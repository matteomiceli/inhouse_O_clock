require('dotenv').config();
const mongoose = require('mongoose');

const db = mongoose.connection;
mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to DB...'))
  .catch((err) => console.log(err));

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


module.exports = db;