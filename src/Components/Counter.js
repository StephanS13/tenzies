import React from 'react'

export default function Counter(props) {

  return (
    <div className='counter-container'>
      <div>Attempts:</div>
      <h2>{props.count}</h2>
    </div>
  )
}
