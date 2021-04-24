const db = require('../src/database');


// takes in a req.body, parses the data and returns an object that can 
// be inserted into the database

class Player {
    name;
    alias;
    posRatings;
    wins;
    losses;
    #password = 'tf';
    #auth = true;


    constructor (req) {
        console.log(req);
        if (req.password === this.#password) {
            this.name = req.name;
            this.alias = req.alias;
            this.posRatings = {
                top: req.top,
                jung: req.jung,
                mid: req.mid,
                adc: req.adc,
                sup: req.sup
            }
            this.wins = 0;
            this.losses = 0;
            return;
        }
        this.#auth = false;
    }

    getAuth() {
        return this.#auth;
    }

    pushToDb () {
        db.insert(this);
    }
}

function updatePlayerScores(gameData) {
    
}

module.exports =  { Player, updatePlayerScores };

// gameData structure
// {
//     winningTeam: 'red',
//     red: {
//       top: { alias: 'Hiii1324', score: '50' },
//       jung: { alias: 'Bougino', score: '89' },
//       mid: { alias: '', score: '' },
//       adc: { alias: '', score: '' },
//       sup: { alias: '', score: '' }
//     },
//     blu: {
//       top: { alias: '', score: '' },
//       jung: { alias: '', score: '' },
//       mid: { alias: '', score: '' },
//       adc: { alias: '', score: '' },
//       sup: { alias: '', score: '' }
//     },
//     probability: { red: '0.9608565972483071', blue: '0.039143402751692924' }
//   }