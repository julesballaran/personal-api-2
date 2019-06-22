import React, { Component } from 'react'

export default class Deck extends Component {
  
  render() {
    return (
      <div className="deck-container">
        <div className="deck-text text" ondragover="deck.allowDrop(event)">Deck: 0</div>
        <div className="deck deck-img" ondragover="deck.allowDrop(event)" onDrop="deck.drop(event)"></div>
        <div className="extra-text text">Extra: 0</div>
        <div className="extra deck-img" ondragover="deck.allowDrop(event)" onDrop="deck.drop(event)"></div>
        <div className="side-text text">Side: 0</div>
        <div className="side deck-img" ondragover="deck.allowDrop(event)" onDrop="deck.drop_side(event)"></div>
      </div>
    )
  }
}