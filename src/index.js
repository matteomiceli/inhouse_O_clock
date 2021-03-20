const path = require('path');
const express = require('express');
const app = express();
const port = 8080; // default port to listen
const db = require('./database');
const playerModel = require('../models/playerModel');

// views engine
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// body parsing
app.use(express.json());
app.use(express.urlencoded());

app.get( "/", ( req, res ) => {
    res.render('index')
});

app.get( "/new-game", ( req, res ) => {
    db.find({}, (err, data) => {
        res.render( "new-game");
    })
});

app.get( "/new-player", (req, res) => {
    res.render('new-player');
})

app.get( "/error-auth", (req, res) => {
    res.render('error-auth');
})

app.post( "/player-created", (req, res) => {
    console.log(req.body);
    res.render("player-created");
})

// start the Express server
app.listen( port, () => {
    console.log( `server running on port ${ port }` );
}); 

