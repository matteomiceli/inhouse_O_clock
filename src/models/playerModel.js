const mongoose = require('../database');
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


// updates player scores from ELO function
async function updatePlayerScores(gameObject) {
    if (gameObject.gameData.winningTeam == 'red') {
        let redTeam = gameObject.gameData.red;
        let redScore = gameObject.redScore;

        let blueTeam = gameObject.gameData.blue;
        let blueScore = gameObject.blueScore;

        // red team [winners]
        let topScoreRed = (parseInt(redTeam.top.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.top.alias }, {$set:{ 'posRatings.top': topScoreRed}, $inc: { wins: 1 }})
        
        let jungScoreRed = (parseInt(redTeam.jung.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.jung.alias }, {$set:{ 'posRatings.jung': jungScoreRed }, $inc: { wins: 1 }})

        let midScoreRed = (parseInt(redTeam.mid.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.mid.alias }, {$set:{ 'posRatings.mid': midScoreRed }, $inc: { wins: 1 }})
            
        let adcScoreRed = (parseInt(redTeam.adc.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.adc.alias }, {$set:{ 'posRatings.adc': adcScoreRed }, $inc: { wins: 1 }})

        let supScoreRed = (parseInt(redTeam.sup.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.sup.alias }, {$set:{ 'posRatings.sup': supScoreRed }, $inc: { wins: 1 }})
        
        // blue team [losers]
        let topScoreBlu = (parseInt(blueTeam.top.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.top.alias }, {$set:{ 'posRatings.top': topScoreBlu }, $inc: { losses: 1 }})

        let jungScoreBlu = (parseInt(blueTeam.jung.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.jung.alias }, {$set:{ 'posRatings.jung': jungScoreBlu }, $inc: { losses: 1 }})

        let midScoreBlu = (parseInt(blueTeam.mid.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.mid.alias }, {$set:{ 'posRatings.mid': midScoreBlu }, $inc: { losses: 1 }})

        let adcScoreBlu = (parseInt(blueTeam.adc.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.adc.alias }, {$set:{ 'posRatings.adc': adcScoreBlu }, $inc: { losses: 1 }})

        let supScoreBlu = (parseInt(blueTeam.sup.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.sup.alias }, {$set:{ 'posRatings.sup': supScoreBlu }, $inc: { losses: 1 }})

    } else {
        let redTeam = gameObject.gameData.red;
        let redScore = gameObject.redScore;

        let blueTeam = gameObject.gameData.blue;
        let blueScore = gameObject.blueScore;

        // red team [losers]
        let topScoreRed = (parseInt(redTeam.top.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.top.alias }, {$set:{ 'posRatings.top': topScoreRed }, $inc: { losses: 1 }})
        
        let jungScoreRed = (parseInt(redTeam.jung.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.jung.alias }, {$set:{ 'posRatings.jung': jungScoreRed }, $inc: { losses: 1 }})

        let midScoreRed = (parseInt(redTeam.mid.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.mid.alias }, {$set:{ 'posRatings.mid': midScoreRed }, $inc: { losses: 1 }})
            
        let adcScoreRed = (parseInt(redTeam.adc.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.adc.alias }, {$set:{ 'posRatings.adc': adcScoreRed }, $inc: { losses: 1 }})

        let supScoreRed = (parseInt(redTeam.sup.score) + redScore).toString(); 
        await Player.findOneAndUpdate({ alias: redTeam.sup.alias }, {$set:{ 'posRatings.adc': supScoreRed }, $inc: { losses: 1 }})
        
        // blue team [winners]
        let topScoreBlu = (parseInt(blueTeam.top.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.top.alias }, {$set:{ 'posRatings.top': topScoreBlu }, $inc: { wins: 1 }})

        let jungScoreBlu = (parseInt(blueTeam.jung.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.jung.alias }, {$set:{ 'posRatings.jung': jungScoreBlu }, $inc: { wins: 1 }})

        let midScoreBlu = (parseInt(blueTeam.mid.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.mid.alias }, {$set:{ 'posRatings.mid': midScoreBlu }, $inc: { wins: 1 }})

        let adcScoreBlu = (parseInt(blueTeam.adc.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.adc.alias }, {$set:{ 'posRatings.adc': adcScoreBlu }, $inc: { wins: 1 }})

        let supScoreBlu = (parseInt(blueTeam.sup.score) + blueScore).toString(); 
        await Player.findOneAndUpdate({ alias: blueTeam.sup.alias }, {$set:{ 'posRatings.sup': supScoreBlu }, $inc: { wins: 1 }})
    }
}



module.exports = { Player, updatePlayerScores };