import React, {useState} from 'react'
import GameBoard from './GameBoard'

function GameContainer() {
  // const [currentPlayer, setState] = useState(1)
  const createBoard = () => {
    const board = []
    for(let i=0; i < 8; i++){
      board[i] = []
      for(let j=0; j < 8; j++){
        board[i].push(0)
      }
    }
    return board
  }
  const defaultState = () => ({
    currentPlayerId: 0,
    board: createBoard()
  })
  const [{currentPlayerId, board}, setState] = useState(defaultState())

  const startGame = () => {
    board[3][3] = 1
    board[4][4] = 1
    board[3][4] = 2
    board[4][3] = 2
    setState({board: board, currentPlayer: 1})
  }

  return (
    <div>
      <p>It is someones turn</p>
      <p>
        {currentPlayerId === 0 ?
          <button onClick={startGame}>Start Game</button>
          :
          ''
        }
      </p>
      <GameBoard board={board}/>
    </div>
  );
}

export default GameContainer;
