import React, {useState, useEffect} from 'react'
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
    const newBoard = createBoard()

    newBoard[3][3] = 1
    newBoard[4][4] = 1
    newBoard[3][4] = 2
    newBoard[4][3] = 2
    setState({board: newBoard, currentPlayerId: 1})
  }

  const nextPlayer = () => {
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

  const flipDirecrtions = [
    [1, 0], // down
    [-1, 0], // up
    [0, 1], // right
    [0, -1], // left
    [1, 1], // down and to the right
    [1, -1], // up and to the right
    [-1, 1], // down and to the left
    [-1, -1] // up and to the left
  ]

  const isAdjacent = (row, column) => (
    flipDirecrtions.reduce((acc, shiftDirections) => {
      const location = getLocation(row + shiftDirections[0], column + shiftDirections[1])
      const taken = (location === 1) || (location === 2)
      return acc || taken
    }, false)
  )

  const getFlippableCellsForDirection = (rowStart, columnStart, rowShift, columnShift) => {
    let currentCellOwner = getLocation(rowStart + rowShift, columnStart + columnShift) // nextPlayer()
    let offset = 1
    while(currentCellOwner === nextPlayer()) {
      currentCellOwner = getLocation(rowStart + offset * rowShift, columnStart  + offset * columnShift)
      offset++
    }

    if(offset === 1){
      return []
    }

    if(currentCellOwner === currentPlayerId){
      const flipableCells = []
      for(let i=1; i < offset; i++){
        flipableCells.push([rowStart + i * rowShift, columnStart + i * columnShift])
        // board[rowStart + i * rowShift][columnStart + i * columnShift] = currentPlayerId
      }
      return flipableCells
    }else{
      return []
    }

  }

  const getAllFlippableCells = (row, column) => {
    return flipDirecrtions.reduce( (flippableCells, shiftDirections) => (
      flippableCells
        .concat(getFlippableCellsForDirection(row, column, shiftDirections[0], shiftDirections[1]))
    ), [])
  }

  const validMove = (row, column) => {
    // is space free?
    if(board[row][column] !== 0){
      return false
    }

    // Is it next to something?
    if(!isAdjacent(row, column)){
      return false
    }

    // are there flippable cells?
    const cellsToFlip = getAllFlippableCells(row, column)
    if(cellsToFlip.length == 0){
      return false
    }else {
      return true
    }
  }

  const flip = (rowStart, columnStart, rowShift, columnShift) => {
    let currentCellOwner = nextPlayer()
    let offset = 1
    while(currentCellOwner === nextPlayer()) {
      currentCellOwner = getLocation(rowStart + offset * rowShift, columnStart  + offset * columnShift)
      offset++
    }
    if(currentCellOwner === currentPlayerId){
      for(let i=1; i < offset; i++){
        board[rowStart + i * rowShift][columnStart + i * columnShift] = currentPlayerId
      }
    }
  }

  const checkForFlips = (row, column) => {
    flipDirecrtions.forEach( shiftDirections => {
      flip(row, column, shiftDirections[0], shiftDirections[1])
    })
  }

  const endGame = (score) => {
    let winner
    if (score[1] > score[2]) {
      winner = 1
    }else {
      winner = 2
    }
    alert(`The winner is player${winner}! Final score: \n Player1: ${score[1]} \n Player2: ${score[2]}`)
  }

  const checkEndGame = () => {
    const score = {1: 0, 2: 0}
    let stillPlaying = false
    board.forEach( row => {
      row.forEach( cell => {
        if(cell === 0){
          stillPlaying = true
        }
        score[cell]++
      })
    })
    if(!stillPlaying){
      endGame(score)
    }
  }

  useEffect(checkEndGame)

  const makeMove = (row, column) => {
    // confirm valid move, alert otherwise
    if(!validMove(row, column)){
      alert("This is not a valid move!")
      return
    }
    // update that square
    board[row][column] = currentPlayerId
    // check for flips and flip
    checkForFlips(row, column)

    // update state
    setState({board: board, currentPlayerId: nextPlayer()})
  }

  return (
    <div>
      <div className="column">
        <div className={`cell player${currentPlayerId}`}>.</div>
        <p>
          {currentPlayerId ? `It is player ${currentPlayerId}'s turn` : ''}
        </p>
      </div>
      <p>
        {currentPlayerId === 0 ?
          <button onClick={startGame}>Start Game</button>
          :
          ''
        }
      </p>
      <GameBoard board={board} makeMove={makeMove}/>
      <p>
        {currentPlayerId !== 0 ?
          <button onClick={startGame}>Restart Game</button>
          :
          ''
        }
      </p>
    </div>
  );
}

export default GameContainer;
