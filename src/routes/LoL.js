const express = require('express');
const router = express.Router();
const { version } = require('../globals');
const { Player, updatePlayerScores } = require('../models/playerModel');
const Game = require('../models/gameModel');
const rating = require('../controllers/scoreAdjustController');
const createGameDataObject = require('../controllers/gameObjectController');
const playerRankController = require('../controllers/playerRankController');


router.get('/', async (req, res) => {
    await Player.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const players = data;
        const sortedPlayers = playerRankController(players);

        // res.json(data)
        res.render("LoL", { players: sortedPlayers, version: version });
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
        res.render("new-game", { players: players, version: version });
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


        res.send({ alias: reqPlayer, score: score, version: version });
    })
});

router.post('/game-results', async (req, res) => {
    let gameData = createGameDataObject(req.body);
    let gameObject = rating.getScoreAdjust(gameData); //
    
    // archive game into game db
    const newGame = new Game(gameObject);
    await newGame.save();

    updatePlayerScores(gameObject);

    res.render('game', { game: gameObject, version: version });
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
       
        res.render('player', { player: player, newPlayer: false, version: version })
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
    res.render('player', { player: newPlayer, newPlayer: true, version: version });
    return;
})


router.get("/new-player", (req, res) => {
    res.render('new-player', { version: version });
})

// set param to take in game object (for match history implementation in the future)
router.get('/game', (req, res) => {
    const gameObj = {
        "gameData": {
            "red": {
                "top": {
                    "alias": "skoutNova",
                    "score": "56"
                },
                "jung": {
                    "alias": "Pesus sesus",
                    "score": "67"
                },
                "mid": {
                    "alias": "Pesus sesus",
                    "score": "70"
                },
                "adc": {
                    "alias": "Pesus sesus",
                    "score": "25"
                },
                "sup": {
                    "alias": "Pesus sesus",
                    "score": "95"
                }
            },
            "blue": {
                "top": {
                    "alias": "Pesus sesus",
                    "score": "77"
                },
                "jung": {
                    "alias": "Pesus sesus",
                    "score": "67"
                },
                "mid": {
                    "alias": "Pesus sesus",
                    "score": "70"
                },
                "adc": {
                    "alias": "Pesus sesus",
                    "score": "25"
                },
                "sup": {
                    "alias": "Pesus sesus",
                    "score": "95"
                }
            },
            "probability": {
                "red": "0.38141587791096926",
                "blue": "0.6185841220890307"
            },
            "winningTeam": "blue"
        },
        "redScore": 10,
        "blueScore": -10,
        "date": {
            "$date": "2021-06-09T08:44:56.462Z"
        }
    }

    res.render('game', { game: gameObj, version: version });
})

module.exports = router;