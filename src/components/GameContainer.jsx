import React, {useState} from 'react'
import GameBoard from './GameBoard'

function GameContainer() {
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
    setState({board: board, currentPlayerId: 1})
  }

  const newCurrentPlayer = () => {
    if(currentPlayerId === 1){
      return 2
    }else{
      return 1
    }
  }

  const getLocation = (rowIndex, columnIndex) => {
    const row = board[rowIndex]
    if(row){
      return row[columnIndex]
    }
  }

  const validMove = (row, column) => {
    // is space free?
    if(board[row][column] !== 0){
      return false
    }
    // is it adjacent
    const top = getLocation(row-1, column)
    const bottom = getLocation(row+1, column)
    const left = getLocation(row, column-1)
    const right = getLocation(row, column+1)
    if(top || bottom || left || right){
      return true
    }
  }

  const makeMove = (row, column) => {
    // confirm valid move, alert otherwise
    if(!validMove(row, column)){
      alert("This is not a valid move!")
      return
    }
    // update that square
    board[row][column] = currentPlayerId
    // check for flips and flip
    setState({board: board, currentPlayerId: newCurrentPlayer()})
  }

  return (
    <div>
      <p>

        {currentPlayerId ? `It is player ${currentPlayerId}'s turn` : ''}
      </p>
      <p>
        {currentPlayerId === 0 ?
          <button onClick={startGame}>Start Game</button>
          :
          ''
        }
      </p>
      <GameBoard board={board} makeMove={makeMove}/>
    </div>
  );
}

export default GameContainer;
