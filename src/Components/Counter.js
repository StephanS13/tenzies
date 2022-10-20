import React from 'react'

export default function Counter(props) {

  return (
    <div className='counter-container'>
      <h2>Moves:</h2>
      <h2 className='counter'>{props.count}</h2>
    </div>
  )
}
