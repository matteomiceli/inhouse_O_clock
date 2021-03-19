var Datastore = require('nedb')
  let db = new Datastore({ filename: './database.db' });

module.exports = db;