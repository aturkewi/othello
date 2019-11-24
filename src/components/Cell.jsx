import React from 'react'

function Cell({ playerId }) {
  return(
    <div className={`cell player${playerId}`}>
      {playerId}
    </div>
  )
}

export default Cell
