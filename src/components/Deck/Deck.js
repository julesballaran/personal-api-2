import React, { Component } from 'react'

export default class Deck extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="deck-container">
        <div className="deck-text text" ondragover="deck.allowDrop(event)">Deck: {this.props.deck.main.length}</div>
        <div className="deck deck-img" ondragover="deck.allowDrop(event)" onDrop="deck.drop(event)">
          {this.props.deck.main.map((card, i )=> (
            <div className='card-cont' key={i} id={card} onClick={() => this.props.handleViewCard(card)} onDoubleClick={() => this.props.handleRemoveCard(`main:${i}`)}>
              <img className='card-small-img' src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card}.jpg`}/>
            </div>
          ))}
        </div>
        <div className="extra-text text">Extra: {this.props.deck.extra.length}</div>
        <div className="extra deck-img" ondragover="deck.allowDrop(event)" onDrop="deck.drop(event)">
          {this.props.deck.extra.map((card, i )=> (
            <div className='card-cont' key={i} id={card} onClick={() => this.props.handleViewCard(card)} onDoubleClick={() => this.props.handleRemoveCard(`extra:${i}`)}>
              <img className='card-small-img' src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card}.jpg`}/>
            </div>
          ))}
        </div>
        <div className="side-text text">Side: {this.props.deck.side.length}</div>
        <div className="side deck-img" ondragover="deck.allowDrop(event)" onDrop="deck.drop_side(event)">
          {this.props.deck.side.map((card, i )=> (
            <div className='card-cont' key={i} id={card} onClick={() => this.props.handleViewCard(card)} onDoubleClick={() => this.props.handleRemoveCard(`side:${i}`)}>
              <img className='card-small-img' src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card}.jpg`}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}