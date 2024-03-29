const mongoose = require('../database');
const { Schema } = mongoose;
 
// schema for game model
const gameSchema = new Schema({
    redScore: Number,
    blueScore: Number,
    gameData: {
        winningTeam: String,
        red: {
            top: { alias: String, score: String }, 
            jung: { alias: String, score: String },
            mid: { alias: String, score: String },
            adc: { alias: String, score: String },
            sup: { alias: String, score: String }
        },
        blue: {
            top: { alias: String, score: String },
            jung: { alias: String, score: String },
            mid: { alias: String, score: String },
            adc: { alias: String, score: String },
            sup: { alias: String, score: String }
        },
        probability: { red: String, blue: String }
    },
    date: Date,
}, {collection: 'games'})

// game model 
const Game = mongoose.model('newGame', gameSchema);

module.exports = Game;
