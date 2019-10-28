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
app.get('/', (req, res) => {
  res.json({ history })
})

app.post('/push-game-history', (req, res) => {
  history.push({
    date: new Date,
    winner: req.body.winner,
    history: req.body.history
  })

  res.send(true)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))