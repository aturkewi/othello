import React, {useState} from 'react'
import GameBoard from './GameBoard'

function GameContainer() {
  const [currentPlayer, setState] = useState(1)

  return (
    <div>
      <p>It is someones turn</p>
      <p>
        <button>Start Game</button>
      </p>
      <p>
        <GameBoard />
      </p>
    </div>
  );
}

export default GameContainer;
