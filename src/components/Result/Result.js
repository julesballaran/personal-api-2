import React, { Component } from 'react'

export default class Result extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="result-container">
        <div className="result-text">Result: {this.props.result.length}</div>
        <div className="result-content">
          {this.props.result.map(card => {
            return card.type === 'Spell Card' || card.type === 'Trap Card' ? 
              <div key={card.id} className="result-card" onclick='data.viewCard(this)' onDragStart='deck.drag(this, event)' id='${card.id}' draggable="true">
                <img src={card.card_images[0].image_url_small} alt=""/>
                <p>{card.name}<br/>
                    {card.type}<br/>
                </p>
              </div>
            : (card.type === 'Link Monster') ?
              <div key={card.id} className="result-card" onClick='data.viewCard(this)' onDragStart='deck.drag(this, event)' id='${card.id}' draggable="true">
                <img src={card.card_images[0].image_url_small} alt=""/>
                <p>{card.name}<br/>
                  {card.type}<br/>
                  {card.atk}/Link {card.linkval}
                </p>
              </div>
            : <div key={card.id} class="result-card" onClick='data.viewCard(this)' onDragStart='deck.drag(this, event)' id='${card.id}' draggable="true">
                <img src={card.card_images[0].image_url_small} alt=""/>
                <p>{card.name}<br/>
                  {card.type} &#9733;{card.level}<br/>
                  {card.atk}/{card.def}
                </p>
              </div>
          })} 
        </div>
    </div>
    )
  }
}