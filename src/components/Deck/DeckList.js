import React from 'react'

let i = 0;
export default function DeckList(props){
  return (
    <div>Select Deck:
      <select className='deck-list'>
        {props.deckList.map(deck => <option key={i++}>{deck.name}</option>)
        }
      </select>
      <button className='remove-btn'>Remove</button>
    </div>
  )
}