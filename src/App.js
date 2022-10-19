import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import './App.css';
import Die from './Components/Die';

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const singleValue = dice[0].value
    const allSameValue = dice.every(die => die.value === singleValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      alert("You Win!")
    }
    
  }, [dice])

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
    setDice(oldDice => oldDice.map(die => (
      die.isHeld ?
      die :
      generateNewDie()
    )))
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
      <div className="dice-container">
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
