import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Search from './components/Search/Search'
import Result from './components/Result/Result'
import ViewCard from './components/ViewCard/ViewCard'
import Deck from './components/Deck/Deck'

class App extends Component {
  constructor(){
    super()
    this.state = {
      cards: [],
      result: [],
      viewCard: {},
      deck: {
        main: [46986414, 46986414],
        extra: [],
        side: [],
      }
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

  handleViewCard = (cardId) => {
    const card = this.state.cards.find((card) => card.id == cardId)
    if(card){
      var tempCard = {
        name: card.name,
          type: '',
          atk: '',
          desc: card.desc,
          img: card.card_images[0].image_url
      }
      if(card.type === 'Spell Card' || card.type === 'Trap Card'){
        tempCard.type = card.type;
      }
      else if(card.type === 'Link Monster'){
        var arrow = [];
        var link = card.linkmarkers;
        for(let i=0; i<link.length; i++){
            if(link[i] === 'Top'){
              arrow.push(String.fromCharCode(8593));
            }
            else if(link[i] === 'Top-Left'){
              arrow.push(String.fromCharCode(8598));
            }
            else if(link[i] === 'Left'){
              arrow.push(String.fromCharCode(8592));
            }
            else if(link[i] === 'Bottom-Left'){
              arrow.push(String.fromCharCode(8601));            
            }
            else if(link[i] === 'Bottom'){
              arrow.push(String.fromCharCode(8595));
            }
            else if(link[i] === 'Bottom-Right'){
              arrow.push(String.fromCharCode(8600));
            }
            else if(link[i] === 'Right'){
              arrow.push(String.fromCharCode(8594));
            }
            else{
              arrow.push(String.fromCharCode(8599));
            }
        }
        tempCard.type = `[${card.type.split(' ').join('|')}] ${card.race}/${card.attribute}`;
        tempCard.atk = `${card.atk}/Link ${card.linkval} [${arrow.join('][')}]`;
      }
      else {
        tempCard.type = `[${card.type.split(' ').join('|')}] ${card.race}/${card.attribute}`;
        tempCard.atk = `[${String.fromCharCode(9733).repeat(card.level)}] ${card.atk}/${card.def}`;
      }
      this.setState({ viewCard: tempCard})
    }
  }

  handleRemoveCard = (name) => {
    var deckTemp = this.state.deck;
    let str = name.split(':');
    if(str[0] == 'main'){
      deckTemp.main.splice(parseInt(str[1]), 1);
    }
    else if(str[0] == 'extra'){
      deckTemp.extra.splice(parseInt(str[1]), 1);
    }
    else{
      deckTemp.side.splice(parseInt(str[1]), 1);
    }
    this.setState({ deck: deckTemp})
  }

  render (){
    return (
      <div className="container">
        <ViewCard viewCard={this.state.viewCard}/>
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
              <Deck deck={this.state.deck} handleViewCard={this.handleViewCard} handleRemoveCard={this.handleRemoveCard}/>  
              <Result result={this.state.result} handleViewCard={this.handleViewCard}/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
