import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Search from './components/Search/Search'
import Result from './components/Result/Result'
import ViewCard from './components/ViewCard/ViewCard'
import Deck from './components/Deck/Deck'
import DeckList from './components/Deck/DeckList'
import NewDeck from './components/Deck/NewDeck'

class App extends Component {
  constructor(){
    super()
    this.state = {
      cards: [],
      result: [],
      viewCard: {},
      deck: {
        main: [],
        extra: [],
        side: [],
      },
      deckList: [{
        name: 'add-deck',
        deck: {
          main: [],
          extra: [],
          side: [],
        },
      }],
      deckName: '',
    }
  }

  componentDidMount(){
    axios
      .get('https://db.ygoprodeck.com/api/v5/cardinfo.php')
      .then(res => this.setState({ cards: res.data }))

    this.setState({ deck: this.state.deckList[0].deck})
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

  allowDrop = (e) => {
    e.preventDefault();
  }

  drag = (card, e) => {
    e.dataTransfer.setData('text', card);
  }

  drop = (e) => {
    this.addCard(e.dataTransfer.getData('text'))
  }

  drop_side = (e) => {
    this.addCard(e.dataTransfer.getData('text'), true)
  }

  addCard = (cardId, c) => {
    const card = this.state.cards.find((card) => card.id == cardId)
    var deckTemp = this.state.deck;
    if(card){
      if (c){
        if(deckTemp.side.length < 15)
          deckTemp.side.push(cardId);
      }
      else if(card.type.match(/link/gi) || card.type.match(/synchro/gi) || card.type.match(/fusion/gi) || card.type.match(/xyz/gi) || card.type.match(/ritual/gi)){
        if(deckTemp.extra.length < 15)
          deckTemp.extra.push(cardId);
      }
      else{
        if(deckTemp.main.length < 60)
          deckTemp.main.push(cardId);
      }
      this.setState({deck: deckTemp})
    }
  }

  handleNewDeck = e => {
    this.setState({ deckName: e.target.value})
  }

  addNewDeck = () => {
    var deckListCopy = this.state.deckList
    if(this.state.deckName){
      if(this.state.deckList[0].name === 'add-deck'){
        deckListCopy.pop()
        this.setState({deckList: deckListCopy})
      } 
        this.setState({deckList: this.state.deckList.concat({
          name: this.state.deckName,
          deck: {
            main: [],
            extra: [],
            side: [],
          },
        })})
      
      this.setState({deckName: ''})
    }
  }

  render (){
    return (
      <div className="container">
        <ViewCard viewCard={this.state.viewCard}/>
        <div className="cards-cont">
            <div className="top-cont">
                <div className="select-deck">
                    <NewDeck handleNewDeck={this.handleNewDeck} addNewDeck={this.addNewDeck} deckName={this.state.deckName}/>
                    <DeckList deckList={this.state.deckList}/>
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
              <Deck 
                deck={this.state.deck} handleViewCard={this.handleViewCard} handleRemoveCard={this.handleRemoveCard} 
                allowDrop={this.allowDrop} drop={this.drop} drop_side={this.drop_side}
              />  
              <Result result={this.state.result} handleViewCard={this.handleViewCard} drag={this.drag}/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
