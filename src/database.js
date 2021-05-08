require('dotenv').config();
const db = require('mongoose');
db.set('useFindAndModify', false);


db.connect(process.env.DB_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to DB...'))
  .catch((err) => console.log(err));


module.exports = db;