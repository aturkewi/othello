import React, {useState} from 'react'
import Row from './Row'

function GameBoard() {
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
    player: 1,
    board: createBoard()
  })
  const [board, setState] = useState(createBoard())
  return(
    <div className="board">
      {board.map(row => <Row data={row} />)}
    </div>
  )
}

export default GameBoard
