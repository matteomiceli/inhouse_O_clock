const path = require('path');
const express = require('express');
const app = express();
const port = 8080; // default port to listen
const db = require('./database');

// load database
db.loadDatabase((err) => {
    if (err) {
        console.log(err);
        return; 
    }
    console.log('Successfully loaded')
});

// db.insert({"players": []});

let dbData;
db.find({}, (err, data) => {
    dbData = data;
    console.log(data)
})

// views engine
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.render('index')
});

app.get( "/new-game", ( req, res ) => {
    db.find({}, (err, data) => {
        res.json(data)
        res.render( "new-game");
    })
});

app.get( "/new-player", (req, res) => {
    res.render('new-player');
})

// start the Express server
app.listen( port, () => {
    console.log( `server running on port ${ port }` );
}); 

