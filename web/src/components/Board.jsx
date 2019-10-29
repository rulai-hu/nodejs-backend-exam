/**
 * components/Board.jsx
 * 
 * Ventana Tech Services
 * 
 * Backend Exam
 * 
 * 2019
 */
import React from 'react'

/** Components ================================================================================== */
import Square from './Square'

/** <Board /> =================================================================================== */
export default function Board (props) {
  const { onClick, squares } = props

  const renderSquare = i => <Square
    value={squares[i]}
    onClick={() => onClick(i)}
  />

  return <div>
    <div className='board-row'>
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
    </div>
    <div className='board-row'>
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
    </div>
    <div className='board-row'>
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
  </div>
}