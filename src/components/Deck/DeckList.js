import React from 'react'

export default function DeckList(props){
  return (
    <div>Select Deck:
      <select className='deck-list' onChange={e => props.changeDeck(e)}>
        {props.deckList.map(deck => <option key={deck.name}>{deck.name}</option>)}
      </select>
      <button onClick={props.removeDeck} className='remove-btn'>Remove</button>
    </div>
  )
}