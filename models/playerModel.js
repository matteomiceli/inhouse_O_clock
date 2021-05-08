const mongoose = require('../src/database');
const { Schema } = mongoose;
 
// schema for player model
const playerSchema = new Schema({
    name: String,
    alias: String,
    posRatings: {
        top: String,
        jung: String,
        mid: String,
        adc: String,
        sup: String
    },
    wins: Number,
    losses: Number,
    created: Date,
}, {collection: 'players'})

// player model 
const Player = mongoose.model('newPlayer', playerSchema);


module.exports = Player;
