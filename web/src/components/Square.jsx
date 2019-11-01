/**
 * components/Square.jsx
 * 
 * Ventana Tech Services
 * 
 * Backend Exam
 * 
 * 2019
 */
import React from 'react'

/** <Square /> ================================================================================== */
export default function Square (props) {
  const { onClick, value } = props

  return <button 
    className='square' 
    onClick={onClick}
  >
    {value}
  </button>
}