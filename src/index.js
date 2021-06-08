const path = require('path');
const express = require('express');
const app = express();
const port = 8080; // default port to listen

const LoL = require('./routes/LoL');

const { Player, updatePlayerScores } = require('./models/playerModel');
const Game = require('./models/gameModel');
const rating = require('./controllers/playerRating');
const { check, validationResult  } = require('express-validator');

// views engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// body parsing
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

// routes
app.use('/LoL', LoL);


app.get("/", (req, res) => {
    res.render('index');
});


// game creation
app.get("/new-game", async (req, res) => {
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

app.post("/new-game", async (req, res) => {
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

app.post('/game-results', async (req, res) => {
    console.log(req.body);
    // let gameObject = rating.getScoreAdjust(req.body);
    
    // // archive game into game db
    // const newGame = new Game(gameObject);
    // await newGame.save();

    // updatePlayerScores(gameObject);

    
    res.json(req.body);
})

// player creation
app.post("/player-created", async (req, res) => {
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


app.get("/new-player", (req, res) => {
    res.render('new-player');
})


app.get("/error-auth", (req, res) => {
    res.render('error-auth');
})


// start the Express server
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

