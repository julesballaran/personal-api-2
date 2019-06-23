import React from 'react'

export default function NewDeck (props){
  return (
    <div>New Deck: &nbsp;&nbsp;
      <input onChange={e => props.handleNewDeck(e)} type="text" class='add-deck-name' value={props.deckName}/>
      <button onClick={props.addNewDeck}className="add-deck">Add</button>
    </div>
  )
}