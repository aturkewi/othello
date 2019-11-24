import React from 'react'
import Cell from './Cell'

function Row({ data }) {
  return(
    <div className="row">
      {data.map( playerId => <Cell playerId={playerId} />)}
    </div>
  )
}

export default Row
