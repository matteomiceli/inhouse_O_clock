const express = require('express');
const router = express.Router();
const { Player, updatePlayerScores } = require('../models/playerModel');
const Game = require('../models/gameModel');
const rating = require('../controllers/scoreAdjustController');
const { check, validationResult  } = require('express-validator');
const createGameDataObject = require('../controllers/gameController')

router.get('/', (req, res) => {
    res.render('LoL');
});


// game creation
router.get("/new-game", async (req, res) => {
    await Player.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let players = data;
        // res.json(data)
        res.render("new-game", { players: players });
    })
});

router.post("/new-game", async (req, res) => {
    let reqPlayer = req.body.player;
    let reqPosition = req.body.position

    await Player.find({ alias: reqPlayer }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        data = data[0]
        let score = data['posRatings'][reqPosition];


        res.send({ alias: reqPlayer, score: score });
    })
});

router.post('/game-results', async (req, res) => {
    console.log(req.body);
    createGameDataObject(req.body);
    // let gameObject = rating.getScoreAdjust(req.body);
    
    // // archive game into game db
    // const newGame = new Game(gameObject);
    // await newGame.save();

    // updatePlayerScores(gameObject);

    
    res.json(req.body);
})

// player creation
router.post("/player-created", async (req, res) => {
    let playerObj = req.body;

    if (playerObj.password == 'tf') {
        const newPlayer = new Player({
            name: playerObj.name,
            alias: playerObj.alias,
            posRatings: {
                top: playerObj.top,
                jung: playerObj.jung,
                mid: playerObj.mid,
                adc: playerObj.adc,
                sup: playerObj.sup
            },
            wins: 0,
            losses: 0,
            created: new Date()
        });
    
        await newPlayer.save();
        res.render('player-created', { player: newPlayer });
        return;
    }
    res.render('error-auth'); 
})


router.get("/new-player", (req, res) => {
    res.render('new-player');
})

module.exports = router;