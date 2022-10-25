import React from 'react'

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#FFD32D" : "white"
  }

  function switchDice() {
    switch(props.value) {

    case 1:
      return <div className="dice first-face" style={style}>
        <span className="dot"> </span>
      </div>;

    case 2:
      return <div class="dice second-face" style={style}>
        <span class="dot"> </span>
        <span class="dot"> </span>
      </div>

    case 3:
      return <div class="dice third-face" style={style}>
        <span class="dot"> </span>
        <span class="dot"> </span>
        <span class="dot"> </span>
      </div>

    case 4:
      return <div class="dice fourth-face" style={style}>
        <div class="column">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="column">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>

    case 5:
      return <div class="dice fifth-face" style={style}>
        <div class="column">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="column">
          <span class="dot"></span>
        </div>
        <div class="column">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>

    case 6:
      return <div class="dice fourth-face" style={style}>
        <div class="column">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        <div class="column">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
      </div>

    default:
      return props.value;
    }
  }

  return (
    <div>
      <div
        className="die-face"
        onClick={props.holdDice}
      >

        {/* <h2 className='die-num'>{props.value}</h2> */}

        <h2 className='die-num'>
          {switchDice()}
        </h2>


      </div>
    </div>
  )
}
