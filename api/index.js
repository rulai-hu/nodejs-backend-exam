const express = require('express')

/** IMPORT MIDDLEWARE(S) BELOW */
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 4000

/** IMPLEMENT MIDDLEWARE(S) BELOW */
app.use(cors())
app.use(bodyParser())


/** IMPLEMENT DATABASE BELOW */
const history = []

/** IMPLEMENT YOUR ROUTER BELOW */
app.get('/game', (req, res) => {
  res.json(history.sort((a, b) => new Date(b.date) - new Date(a.date)))
})

app.get('/game-analysis', (req, res) => {
  let x = 0, o = 0;
  history.map(game => {
    if (game.winner === 'X') {
      x++
    } else if (game.winner === 'O') {
      o++
    }
  })

  res.json({
    x,
    o
  })
})

app.post('/game', (req, res) => {
  history.push({
    date: new Date(),
    winner: req.body.winner,
    squares: req.body.squares
  })

  res.json(history.sort((a, b) => new Date(b.date) - new Date(a.date)))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))