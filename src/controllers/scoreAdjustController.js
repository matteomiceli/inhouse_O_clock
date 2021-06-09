// applies elo function and returns new data to be updated in db

// UPDATE FORMULA 
// new_rating = rating + k-score (score(1 or 0) - expected score);

function getScoreAdjust(gameData) {
    const k = 16;
    if (gameData.winningTeam == 'red') {
        let redProb = gameData.probability.red;
        let redScoreAdjust = k * (1 - redProb);

        let blueProb = gameData.probability.blue;
        let blueScoreAdjust = k * (0 - blueProb);

        return { 
            redScore: Math.round(redScoreAdjust), 
            blueScore: Math.round(blueScoreAdjust),
            gameData: gameData,
            date: new Date()
        }
    } else {
        let redProb = gameData.probability.red;
        let redScoreAdjust = k * (0 - redProb);

        let blueProb = gameData.probability.blue;
        let blueScoreAdjust = k * (1 - blueProb);

        return { 
            redScore: Math.round(redScoreAdjust), 
            blueScore: Math.round(blueScoreAdjust),
            gameData: gameData,
            date: new Date()
        }
    }
}

module.exports = { getScoreAdjust }
