// applies elo function and returns new data to be updated in db

// UPDATE FORMULA 
// new_rating = rating + k-score (score(1 or 0) - expected score);

function updatePlayerScores(gameData) {
    let k = 16;
    if (gameData.winningTeam == 'red') {
        let redProb = gameData.probability.red;
        let redScoreAdjust = k * (1 - redProb);

        let blueProb = gameData.probability.blue;
        let blueScoreAdjust = k * (0 - blueProb);

        return { 
            redScore: Math.round(redScoreAdjust), 
            blueScore: Math.round(blueScoreAdjust),
            gameData: gameData
        }
    } else {
        let redProb = gameData.probability.red;
        let redScoreAdjust = k * (0 - redProb);

        let blueProb = gameData.probability.blue;
        let blueScoreAdjust = k * (1 - blueProb);

        return { 
            redScore: Math.round(redScoreAdjust), 
            blueScore: Math.round(blueScoreAdjust),
            gameData: gameData
        }
    }
}

module.exports = { updatePlayerScores }


// gameData structure
const data = {
    winningTeam: 'blue',
    red: {
      top: { alias: 'Hiii1324', score: '50' },
      jung: { alias: 'Bougino', score: '89' },
      mid: { alias: '', score: '' },
      adc: { alias: '', score: '' },
      sup: { alias: '', score: '' }
    },
    blu: {
      top: { alias: '', score: '' },
      jung: { alias: '', score: '' },
      mid: { alias: '', score: '' },
      adc: { alias: '', score: '' },
      sup: { alias: '', score: '' }
    },
    probability: { red: '0.6', blue: '0.42' }
  }

console.log(updatePlayerScores(data));