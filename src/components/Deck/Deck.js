import React, { Component } from 'react'

export default class Deck extends Component {
  render() {
    return (
      <div className="deck-container">
        <div className="deck-text text" onDragOver={e => this.props.allowDrop(e)}>Deck: {this.props.deck.main.length}</div>
        <div className="deck deck-img" onDragOver={e => this.props.allowDrop(e)} onDrop={e => this.props.drop(e)}>
          {this.props.deck.main.map((card, i )=> (
            <div className='card-cont' key={i} id={card} onClick={() => this.props.handleViewCard(card)} onDoubleClick={() => this.props.handleRemoveCard(`main:${i}`)}>
              <img className='card-small-img' src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card}.jpg`} alt=''/>
            </div>
          ))}
        </div>
        <div className="extra-text text">Extra: {this.props.deck.extra.length}</div>
        <div className="extra deck-img" onDragOver={e => this.props.allowDrop(e)} onDrop={e => this.props.drop(e)}>
          {this.props.deck.extra.map((card, i )=> (
            <div className='card-cont' key={i} id={card} onClick={() => this.props.handleViewCard(card)} onDoubleClick={() => this.props.handleRemoveCard(`extra:${i}`)}>
              <img className='card-small-img' src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card}.jpg`} alt=''/>
            </div>
          ))}
        </div>
        <div className="side-text text">Side: {this.props.deck.side.length}</div>
        <div className="side deck-img" onDragOver={e => this.props.allowDrop(e)} onDrop={e => this.props.drop_side(e)}>
          {this.props.deck.side.map((card, i )=> (
            <div className='card-cont' key={i} id={card} onClick={() => this.props.handleViewCard(card)} onDoubleClick={() => this.props.handleRemoveCard(`side:${i}`)}>
              <img className='card-small-img' src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card}.jpg`} alt=''/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}