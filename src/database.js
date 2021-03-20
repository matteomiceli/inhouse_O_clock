var Datastore = require('nedb')
  let db = new Datastore({ filename: './src/database.db' });

module.exports = db;