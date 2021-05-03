const mongoose = require('../src/database');
const { Schema } = mongoose;
 

// takes in a req.body, parses the data and returns an object that can 
// be inserted into the database

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
    losses: Number
}, {collection: 'players'})

const Player = mongoose.model('newPlayer', playerSchema);


module.exports = Player;

// class Player {
//     name;
//     alias;
//     posRatings;
//     wins;
//     losses;
//     #password = 'tf';
//     #auth = true;


//     constructor(req) {
//         console.log(req);
//         if (req.password === this.#password) {
//             this.name = req.name;
//             this.alias = req.alias;
//             this.posRatings = {
//                 top: req.top,
//                 jung: req.jung,
//                 mid: req.mid,
//                 adc: req.adc,
//                 sup: req.sup
//             }
//             this.wins = 0;
//             this.losses = 0;
//             return;
//         }
//         this.#auth = false;
//     }

//     getAuth() {
//         return this.#auth;
//     }

//     pushToDb() {
//         db.insert(this);
//     }
// }
