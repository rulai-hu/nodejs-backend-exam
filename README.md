# Node.js Backend Exam / Tic Tac Toe Application

## Goal
Create a RESTful backend application for a Tic Tac Toe game in Node.js.

## Getting Started
### Run Frontend Application
1. To run a frontend application, run following commands.
    
    `$ cd ./web`

    `$ npm install`

    `$ npm start`

### Implementing Backend Application
1. We recommend you to use Express but you are welcome to use any other libraries.
1. To install Express run following command
    `$ cd ./api`

    `$ npm install`

1. Implement all of your work in `./api/`
1. Run your server on port `4000` (frontend is sending requests to `http://localhost:4000`)

## Specifications

### Model

#### Game History

    [
        ...
        {
            date: Date,
            winner: String || Null,
            square: String []
        },
        ...
    ]

You can use any database of your choice or files or simply manage your store locally during runtime.

### Router
URL | Type | Function
--- | ---- | --------
/game | GET | Retrieve game history from your store, sort by date, and return an array of games
/game | POST | Add game to your storage and returns game histroy
/game-analysis | GET | Analyze game history and return win rate for 'x' and 'o'


----

#### game | GET
Returns array of game object (game history)

    [
        ...
        {
            date: Date,
            winner: String || Null,
            squares: String []
        },
        ...
    ]

#### game-analysis | GET
Returns an object of win rate of 'x' and 'o'

    {
        x: Number,
        o: Number
    }

#### game | POST
Takes parameter as following object

    {
        winner: String || null,
        squares: String []
    }

Modify object to contain *date* and push to your storage and returns game history.

    [
        ...
        {
            date: Date,
            winner: String || Null,
            squares: String []
        },
        ...
    ]
