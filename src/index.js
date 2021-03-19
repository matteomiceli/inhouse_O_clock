const path = require('path');
const express = require('express');
const app = express();
const port = 8080; // default port to listen
const db = require('./database');

// load database
db.loadDatabase(function (err) {   // Callback is optional
    // Now commands will be executed
  });
  

// views engine
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.render('index')
} );

app.get( "/new-game", ( req, res ) => {
    res.render( "new-game" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server running on port ${ port }` );
}); 

