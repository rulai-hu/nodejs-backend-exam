import React from 'react'

/** Common ====================================================================================== */
import { formatDate } from '../common/format'

/** Statistics ================================================================================== */
export default function Stat (props) {
  const { history, winRates } = props

  return <>
    {
      (() => {
        if (history.length === 0 ) {
          return <h2>No games yet!</h2>
        } else {
          return <h2>X: {winRates.x} O: {winRates.o}</h2>
        }
      })()
    }
    <ul>
      {
        history.map((game, key) => {
          return <li key={key} >
            <span className='date'>{formatDate(game.date)}</span>
            <span className='winner'>Winner: <b>{game.winner || '-'}</b></span>
          </li>
        })
      }
    </ul>
  </>
}