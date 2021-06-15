const express = require('express');
const router = express.Router();
const { Player, updatePlayerScores } = require('../models/playerModel');
const Game = require('../models/gameModel');
const rating = require('../controllers/scoreAdjustController');
const { check, validationResult  } = require('express-validator');
const createGameDataObject = require('../controllers/gameController')

router.get('/', async (req, res) => {
    await Player.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let players = data;
        // res.json(data)
        res.render("LoL", { players: players });
    });
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
    let gameData = createGameDataObject(req.body);
    let gameObject = rating.getScoreAdjust(gameData);
    
    // archive game into game db
    const newGame = new Game(gameObject);
    await newGame.save();

    updatePlayerScores(gameObject);

    res.json(gameObject);
})

router.get('/player/:alias', async (req, res) => {
    // return a single player from the database
    const alias = req.params.alias; 

    await Player.find({ alias: alias }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let player = data[0]
       
        res.render('player', { player: player, newPlayer: false })
    });
});

// player creation
router.post("/player", async (req, res) => {
    let playerObj = req.body;
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
    res.render('player', { player: newPlayer, newPlayer: true });
    return;
})


router.get("/new-player", (req, res) => {
    res.render('new-player');
})

module.exports = router;