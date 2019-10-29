/**
 * components/Game.jsx
 * 
 * Ventana Tech Services
 * 
 * Backend Exam
 * 
 * 2019
 */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

/** Components ================================================================================== */
import Board from './Board'
import Statistics from './Statistics'

/** <Square /> ================================================================================== */
export default () => {
  const [game, setGame] = useState([{ squares: Array(9).fill(null) }])
  const [gameStarted, setGameStarted ] = useState(true) 
  const [history, setHistory] = useState([])
  const [stepNumber, setStepNumber] = useState(0)
  const [winRates, setWinRates] = useState([])
  const [xIsNext, setXIsNext] = useState(true)
  const current = game[stepNumber] 

  useEffect(() => {
    fetchHistory()
  }, [])

  /**  AJAX Related ============================================================================= */
  function fetchHistory () {
    axios.get(`${process.env.REACT_APP_API_URL}/game`)
      .then((res) => {
        setHistory(res.data)
      })
    axios.get(`${process.env.REACT_APP_API_URL}/game-analysis`)
      .then((res) => {
        setWinRates(res.data)
      })
  }

  function postGame (game) {
    axios.post(`${process.env.REACT_APP_API_URL}/game`, game).then(() => {
      setGameStarted(false)
      fetchHistory()
    })
  }

  /** Business Logic ============================================================================ */
  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

        if (gameStarted) {
          postGame({
            winner: squares[a],
            squares
          })
        }        
        
        return squares[a]
      }
    }

    if (stepNumber === 9 && gameStarted) {      
      postGame({
        winner: null,
        squares
      })
    }

    return null
  }

  function reset () {
    setGame([
      {
        squares: Array(9).fill(null)
      }
    ])
    setStepNumber(0)
    setXIsNext(true)
    setGameStarted(true)
  }

  /** Event Handlers  =========================================================================== */
  function onSquareClick (i) {
    const _game = game.slice(0, stepNumber + 1)
    const current = game[game.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = xIsNext ? 'X' : 'O'

    setGame(_game.concat([ { squares } ]))
    setStepNumber(_game.length)
    setXIsNext(!xIsNext)
  }
  

  /** Render  =================================================================================== */
  const winner = calculateWinner(current.squares)

  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')

    if (stepNumber === 9) {
      status = 'It is a tie!'
    }
  } 

  return <>
    <div className='game-nav'>
      <button 
        className='game-start-button'
        onClick={reset}
      >
        New Game
      </button>
    </div>
    <div className='game'>        
      <div className='game-stat'>                    
        <Statistics 
          history={history}
          winRates={winRates}
        />
      </div>
      <div className='game-board'>
        <div className='game-info'>
          <h2>{status}</h2>
        </div>
        <Board
          squares={current.squares}
          onClick={i => onSquareClick(i)}
        />
      </div>        
    </div>
  </>
}