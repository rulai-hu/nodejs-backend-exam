/**
 * components/Game.jsx
 * 
 * Ventana Tech Services
 * 
 * Backend Exam
 * 
 * 2019
 */
import React, { useEffect } from 'react'

/** Common ====================================================================================== */
import calculateWinner from '../common/calculateWinner'

/** Components ================================================================================== */
import Board from './Board'
import Statistics from './Statistics'

/** Hooks ======================================================================================= */
import {
  combineHooks,
  useArray,
  useAxios,
  useCounter,
  useText,
  useToggle,
} from '../hooks'

/** Constants =================================================================================== */
const URL_GAME_HISTORY = `${process.env.REACT_APP_API_URL}/game`
const URL_GAME_ANALYSIS = `${process.env.REACT_APP_API_URL}/game-analysis`

/** <Game /> ==================================================================================== */
export default () => {
  const [game, $game] = useArray([{ squares: Array(9).fill(null) }])
  const [gameStarted, $gameStarted] = useToggle(true)
  const [step, $step] = useCounter(0)
  const [turn, $turn] = useToggle(true)
  const [winner, $winner] = useText(null)
  const [history, { get: getHistory, post: postHistory }] = useAxios(URL_GAME_HISTORY)
  const [gameAnalysis, $gameAnalysis] = useAxios(URL_GAME_ANALYSIS)

  /** Lifecycle ================================================================================= */
  useEffect(() => {
    fetch()
  }, [])

  /** Controller ================================================================================ */
  const fetch = combineHooks([
    { get: getHistory },
    $gameAnalysis,
  ]).get

  const reset = combineHooks([
    $game,
    $gameStarted,
    $step,
    $turn,
    $winner
  ]).reset

  /** Event Handlers  =========================================================================== */
  const handleSquareClick = i => {        
    const gameTemp = game.slice(0, step + 1)    
    const current = game[game.length - 1]
    const squares = current.squares.slice()    

    if (!squares[i]) {
      squares[i] = turn ? 'X' : 'O'
  
      const winner = calculateWinner(squares)
  
      if (step < 9 && gameStarted) {
        $game.set(gameTemp.concat([ { squares } ]))    
        $turn.toggle()
        $step.increment()
  
        /** X or O is the winner */
        if (winner) {
          $gameStarted.toggle()
          $winner.set(winner)
          postHistory({ winner, squares }).then($gameAnalysis.get)
        }
      } else if (step === 9 && gameStarted) {
        /** Game is finished without winnerm, therefore, a tie */
        $gameStarted.toggle()
        $winner.set(winner)
        postHistory({ winner, squares }).then($gameAnalysis.get)
      }
    }
  }

  /** Render  =================================================================================== */
  return <>
    <div className='game-nav'>
      <button 
        className='game-start-button'
        onClick={reset}
      >
        New Game
      </button>
      <button 
        className='game-start-button'
        onClick={fetch}
      >
        Refresh
      </button>
    </div>
    <div className='game'>        
      <div className='game-stat'>
        {
          history.loading ? 
            'Loading ...' :
            <Statistics 
              history={history.data || []}
              winRates={gameAnalysis.data || {}}
            />
        }
        { history.error && 'Something wrong' }
      </div>
      <div className='game-board'>
        <div className='game-info'>
          <h2>
            {(() => {
              let status

              if (winner) {
                status = `Winner: ${winner}`
              } else {
                status = `Next player: ${turn ? 'X' : 'O'}`
            
                if (step === 9) {
                  status = 'It is a tie!'
                }
              } 

              return status
          })()}
          </h2>
        </div>
        <Board
          squares={game[step].squares}
          onClick={i => handleSquareClick(i)}
        />
      </div>        
    </div>
  </>
}