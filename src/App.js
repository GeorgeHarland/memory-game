import { fireEvent } from '@testing-library/react';
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// Array as const. Only property is src which is link to image

const matchImages = [
  { "src": "/img/match1.png", matched: false },
  { "src": "/img/match2.png", matched: false },
  { "src": "/img/match3.png", matched: false },
  { "src": "/img/match4.png", matched: false },
  { "src": "/img/match5.png", matched: false },
  { "src": "/img/match6.png", matched: false },
  { "src": "/img/match7.png", matched: false },
  { "src": "/img/match8.png", matched: false },
  { "src": "/img/match9.png", matched: false },
  { "src": "/img/match10.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = false

  // Function inside component
  // Shuffle cards (12 total), randomize, assign id to each (key for react)
  const createCards = () => {
    // ... = Spread syntax (expands an array into its elements)
    const readyCards = [...matchImages, ...matchImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))
      // ^ Still the same line. When negative, will remain same order, when positive will switch (ends with shuffle)
      // ^ Fire function for each element in array

    setCards(readyCards)
    setTurns(0)
  }

  // Handle a choice
  const handleChoice = (card) => {
    // If firstChoice has a value, below will evaluate as true
    // If evaluates true, left of : is run, if false run left of :
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  // Compare the selected cards
  useEffect(() => {
    setDisabled=(true)
    if (firstChoice && secondChoice) {
      if (firstChoice.src === secondChoice.src) {
        setCards(prevCards => {
          // Map to new array with all the map except the choices 'matched' are true
          return prevCards.map(card => {
            if (card.src === firstChoice.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        console.log('cards match')
        nextTurn()
      } else {
        console.log("cards don't match")
        setTimeout(() => nextTurn(), 750)
      }
    }
  }, [firstChoice,secondChoice])
  // ^ Fires function once, then again when choices updated
  
  console.log(cards)

  // Reset choices and increase turn
  const nextTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={createCards}>Start Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secondChoice || card.matched}
            disabled={}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
