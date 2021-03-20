var Datastore = require('nedb')
  let db = new Datastore({ filename: './src/players.db' });

module.exports = db;

