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



app.get( "/", ( req, res ) => {
    res.render('index')
});


// game creation
app.get( "/new-game", ( req, res ) => {
    db.find({}, (err, data) => {
        res.render( "new-game");
    })
});


// player creation
app.post( "/player-created", (req, res) => {
    let player = new Player(req.body); 
    if (player.getAuth()) {
        player.pushToDb();
        res.render("player-created", { player: player });
        return;
    }
        res.render('error-auth');
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

