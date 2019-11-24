import React, {useState} from 'react'
import Row from './Row'

function GameBoard({board}) {
  return(
    <div className="board">
      {board.map((row, i) => <Row key={i} data={row} />)}
    </div>
  )
}

export default GameBoard
