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

module.exports =  Player;

// received from form
// {
//     name: 'asd',
//     top: '1',
//     jung: '1',
//     mid: '1',
//     adc: '11',
//     sup: '1',
//     password: '11'
// }