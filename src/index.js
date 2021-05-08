const path = require('path');
const express = require('express');
const app = express();
const port = 8080; // default port to listen
const db = require('./database');
const Player = require('../models/playerModel');
const Game = require('../models/gameModel')
const rating = require('../controllers/playerRating')

// views engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// body parsing
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));



app.get("/", (req, res) => {
    res.render('index');
});


// game creation
app.get("/new-game", async (req, res) => {
    await Player.find({}, (err, data) => {
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
            return;
        }
        data = data[0]
        let score = data['posRatings'][reqPosition];


        res.send({ alias: reqPlayer, score: score });
    })
});

app.post('/game-results', async (req, res) => {
    console.log(req.body);
    let gameObject = rating.getScoreAdjust(req.body);
    
    // archive game into game db
    const newGame = new Game(gameObject);
    await newGame.save();

    // updating player scores from ELO function -- move to playermodel?
    if (gameObject.gameData.winningTeam == 'red') {
        let redTeam = gameObject.gameData.red;
        let redScore = gameObject.redScore;

        let blueTeam = gameObject.gameData.blu;
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
        await Player.findOneAndUpdate({ alias: redTeam.sup.alias }, {$set:{ 'posRatings.adc': supScoreRed }, $inc: { wins: 1 }})
        
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

        let blueTeam = gameObject.gameData.blu;
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


    res.json(gameObject);
})

// player creation
app.post("/player-created", async (req, res) => {
    let playerObj = req.body;
    console.log(playerObj);

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

