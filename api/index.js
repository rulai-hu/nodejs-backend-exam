const express = require('express');
const History = require('./History.js');
const app = express();
const history = new History();

app.use(express.json());
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/game', function(req, res) {
    console.log('GET game');
    res.json(history.all());
});

app.post('/game', function(req, res) {
    console.log('POST game');
    history.add(req.body);
});

app.get('/game-analysis', function(req, res) {
    console.log('GET game-analysis');
    res.json(history.summarize());
});

app.listen(4000, () => console.log('Listening.'));


/** IMPORT MIDDLEWARE(S) BELOW */

/** IMPLEMENT MIDDLEWARE(S) BELOW */

/** IMPLEMENT DATABASE BELOW */

/** IMPLEMENT YOUR ROUTER BELOW */

/** RUN YOUR SERVER BELOW */
