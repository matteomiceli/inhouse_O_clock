const path = require('path');
const express = require('express');
const { version } = require('./globals');
const app = express();
const port = process.env.PORT || 8080; // default port to listen
const LoL = require('./routes/LoL');


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
    res.render('index', { version: version });
});

app.get("/about", (req, res) => {
    res.render('about', { version: version });
});

app.get("/error-auth", (req, res) => {
    res.render('error-auth');
})


// start the Express server
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
