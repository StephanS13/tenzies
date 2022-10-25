import React from 'react'

export default function Score(props) {
  return (
    <div className='results-container'>
      <h1>Your Time: <span>{(Math.floor(props.timeResults / 1000))}</span></h1>  
      <h1>Your Score: <span>{props.moveResults}</span></h1>  
    </div>

  )
}
