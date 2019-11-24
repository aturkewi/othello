import React from 'react'
import Cell from './Cell'

function Row({ data }) {
  return(
    <div className="row">
      {data.map( (playerId, i) => <Cell key={i} playerId={playerId} />)}
    </div>
  )
}

export default Row
