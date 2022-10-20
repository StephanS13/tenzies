import React, { useState, useEffect } from 'react';
import Die from './Components/Die';
import Counter from './Components/Counter';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)


  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const singleValue = dice[0].value
    const allSameValue = dice.every(die => die.value === singleValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function initializeCount() {
    setCount()
  }


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
    } else {
      setDice(oldDice => oldDice.map(die => (
        die.isHeld ?
        die :
        generateNewDie()
      )))
      setCount(count + 1)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => (
      die.id === id ?
      { ...die, isHeld: !die.isHeld } :
      die
    )))
  }

  const diceElements = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)} 
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <Counter count={count} />

      {/* <div className="dice first-face">
        <span className="dot"> </span>
      </div> */}
    </main>
  );
}

export default App;
