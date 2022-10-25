import React, { useState, useEffect } from 'react';
import Die from './Components/Die';
import Counter from './Components/Counter';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Timer from './Components/Timer';
import Score from './Components/Score';


function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false);
  const [timeResults, setTimeResults] = useState('')
  const [moveResults, setMoveResults] = useState('')

  // Stores data
  useEffect(() => {
    localStorage.setItem("moves", count)
    localStorage.setItem("time", time)
  }, [tenzies])

  // Set results for final score
  useEffect(() => {
    setTimeResults(JSON.parse(localStorage.getItem("time")))
    setMoveResults(localStorage.getItem("moves"))
  }, [tenzies])

  // Sets timer
  useEffect(() => {
    let interval = null;
  
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  // Sets Tenzies & Stops timer
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const singleValue = dice[0].value
    const allSameValue = dice.every(die => die.value === singleValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      setIsActive(false)
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
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
      setTime(0)
    } else {
      setDice(oldDice => oldDice.map(die => (
        die.isHeld ?
        die :
        generateNewDie()
      )))
      setCount(count + 1)
      setIsActive(true)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => (
      die.id === id ?
      { ...die, isHeld: !die.isHeld } :
      die
    )))
    setIsActive(true)
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
      {tenzies && <Score timeResults={timeResults} moveResults={moveResults}/>}

      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className="stop-watch">
        <Timer time={time} />
        <Counter count={count} />
      </div>
           
      <div className="dice-container">
        {diceElements}
      </div>

      <button className='roll-dice' onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
