const path = require('path');
const express = require('express');
const app = express();
const port = 8080; // default port to listen
const db = require('./database');
const Player = require('../models/playerModel');

// views engine
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// body parsing
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));



app.get( "/", ( req, res ) => {
    res.render('index')
});


// game creation
app.get( "/new-game", ( req, res ) => {
    Player.find({}, (err, data) => {
        let players = data;
        // res.json(data)
        res.render( "new-game", { players: players });
    })
});

app.post( "/new-game", (req, res) => {
    let reqPlayer = req.body.player;
    let reqPosition = req.body.position

    Player.find({ alias: reqPlayer }, (err, data) => {
        if (err) {
            return;
        }
        data = data[0]
        let score = data['posRatings'][reqPosition];


        res.send({ alias: reqPlayer, score: score });
    })  
});

app.post('/game-results', (req, res) => {
    console.log(req.body);
    updatePlayerScores(req.body);
})

// player creation
app.post( "/player-created", async (req, res) => {
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
        losses: 0
    });

    newPlayer.save();
    res.render('player-created', { player: newPlayer })
})


app.get( "/new-player", (req, res) => {
    res.render('new-player');
})


app.get( "/error-auth", (req, res) => {
    res.render('error-auth');
})


// start the Express server
app.listen( port, () => {
    console.log( `server running on port ${ port }` );
}); 

