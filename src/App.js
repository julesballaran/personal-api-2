import React, { Component } from 'react';
import axios from 'axios'

import './App.css';
import backPic from './img/back-card.jpg'
import Search from './components/Search/Search'
import Result from './components/Result/Result'

class App extends Component {
  constructor(){
    super()
    this.state = {
      cards: [],
      result: [],
    }
  }

  componentDidMount(){
    axios
      .get('https://db.ygoprodeck.com/api/v5/cardinfo.php')
      .then(res => this.setState({ cards: res.data }))
  }

  handleSearch = (val) => {
    if(val){
      this.setState({ result: this.findMatches(val, this.state.cards)})
    }else{
      this.setState({ result: []})
    }
  }

  findMatches = (word, cards) => {
    return cards.filter(card => {
        const regex = new RegExp(word, 'gi');
        return card.name.match(regex);
    });
  }

  render (){
    return (
      <div className="container">
        <div className="details-cont">
          <div className="card">
              <img className="card-img" src={backPic} alt=""/>
          </div>
          <div className="card-info">Card Info</div>
          <div className="card-details">
              <span className='card-name'></span><br/>
              <span className='card-type blue'></span><br/>
              <span className='card-atk blue'></span><br/>
              <span className='card-desc'></span>
          </div>
        </div>
        <div className="cards-cont">
            <div className="top-cont">
                <div className="select-deck">
                    <div>New Deck: &nbsp;&nbsp;
                        <input type="text" class='add-deck-name' />
                        <button className="add-deck">Add</button>
                    </div>
                    <div>Select Deck:
                        <select className='deck-list'>
                        </select>
                        <button className='remove-btn'>Remove</button>
                    </div>
                    <div>
                    Options: &nbsp;&nbsp;&nbsp;
                        <button className="export-btn">Save</button>
                        <input type="file" id="file" style={{display: 'none'}} onchange='file.readText(this)' />
                        <button><label for="file">Import</label></button> 
                    </div>
                </div>
                <Search handleSearch={this.handleSearch}/>
            </div>
            <div className="bot-cont">
                <div className="deck-container">
                    <div className="deck-text text" ondragover="deck.allowDrop(event)">Deck: 0</div>
                    <div className="deck deck-img" ondragover="deck.allowDrop(event)" onDrop="deck.drop(event)"></div>
                    <div className="extra-text text">Extra: 0</div>
                    <div className="extra deck-img" ondragover="deck.allowDrop(event)" onDrop="deck.drop(event)"></div>
                    <div className="side-text text">Side: 0</div>
                    <div className="side deck-img" ondragover="deck.allowDrop(event)" onDrop="deck.drop_side(event)"></div>
                </div>
                <Result result={this.state.result}/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
