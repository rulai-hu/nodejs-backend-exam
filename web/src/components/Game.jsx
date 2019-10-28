import React from 'react'
import axios from 'axios'

import Board from './Board'
import Stat from './Stat'

export default class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    gameHistory: [],
    stepNumber: 0,
    gameStarted: true,
    xIsNext: true
  }

  componentDidMount () {
    this.getGameHistory()
  }

  getGameHistory = () => {
    axios.get('http://localhost:4000')
      .then(({ data }) => {
        this.setState({ gameHistory: data.history })
      })
  }

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

        if (this.state.gameStarted) {
          axios.post('http://localhost:4000/push-game-history', {
            winner: squares[a],
            history: squares
          }).then(() => {
            this.getGameHistory()
            this.setState({
              gameStarted: false
            })
          })
        }        
        
        return squares[a];
      }
    }

    if (this.state.stepNumber === 9 && this.state.gameStarted) {      
      axios.post('http://localhost:4000/push-game-history', {
        winner: null,
        history: squares
      }).then(() => {
        this.getGameHistory()
        this.setState({
          gameStarted: false
        })
      })
    }

    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  startNewGame = () => {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      gameStarted: true,
      xIsNext: true
    })
  }

  selectPreviousGame = (history) => {
    this.setState({ history })
  }

  render() {
    const gameHistory = this.state.gameHistory
    const history = this.state.history;    
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");

      if (this.state.stepNumber === 9) {
        status = "It is a tie!"
      }
    }    

    return <>
      <div className="game-nav">
        <button 
          className="game-start-button"
          onClick={this.startNewGame}
        >
          New Game
        </button>
      </div>
      <div className="game">        
        <div className="game-stat">                    
          <Stat history={gameHistory}/>
        </div>
        <div className="game-board">
          <div className="game-info">
            <div>{status}</div>
          </div>
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>        
      </div>
    </>;
  }
}