import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Search from './components/Search/Search'
import Result from './components/Result/Result'
import ViewCard from './components/ViewCard/ViewCard'
import Deck from './components/Deck/Deck'
import DeckList from './components/Deck/DeckList'
import NewDeck from './components/Deck/NewDeck'
import Options from './components/Deck/Options'

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
      deckList: JSON.parse(localStorage.getItem('decks')) || [{name: 'add-deck', deck: {main: [], extra: [], side: []}}],
      deckName: '',
      selectedDeck: '',
    }
  }

  componentDidMount(){
    axios
      .get('https://db.ygoprodeck.com/api/v5/cardinfo.php')
      .then(res => this.setState({ cards: res.data }))

    this.setState({ deck: this.state.deckList[0].deck})
    this.setState({ selectedDeck: this.state.deckList[0].name})
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
    var deckListCopy = this.state.deckList
    let index = this.state.deckList.findIndex(name => name.name === this.state.selectedDeck)
    deckListCopy[index].deck = this.state.deck
    this.setState({deckList: deckListCopy})
    localStorage.setItem('decks', JSON.stringify(this.state.deckList));
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
      var deckListCopy = this.state.deckList
      let index = this.state.deckList.findIndex(name => name.name === this.state.selectedDeck)
      deckListCopy[index].deck = this.state.deck
      this.setState({deckList: deckListCopy})
      localStorage.setItem('decks', JSON.stringify(this.state.deckList));
    }
  }

  handleNewDeck = e => {
    this.setState({ deckName: e.target.value})
  }

  addNewDeck = () => {
    var deckListCopy = this.state.deckList
    if(this.state.deckName && !this.state.deckList.find(name => name.name === this.state.deckName)){
      if(this.state.deckList[0].name === 'add-deck'){
        deckListCopy.splice(0, 1)
        this.setState({selectedDeck: this.state.deckName})
      }
      deckListCopy.push({
        name: this.state.deckName,
        deck: {
          main: [],
          extra: [],
          side: [],
        },
      })
      this.setState({deckList: deckListCopy})
      this.setState({deckName: ''})
      localStorage.setItem('decks', JSON.stringify(this.state.deckList));
    }
  }

  changeDeck = (e) => {
    let index = this.state.deckList.findIndex(name => name.name === e.target.value)
    this.setState({ selectedDeck : e.target.value})
    this.setState({ deck: this.state.deckList[index].deck})
  }

  removeDeck = () => {
    var deckListCopy = this.state.deckList
    let index = this.state.deckList.findIndex(name => name.name === this.state.selectedDeck)
    deckListCopy.splice(index, 1)
    if(deckListCopy.length === 0 ){
      deckListCopy.push({
        name: 'add-deck',
        deck: {
          main: [],
          extra: [],
          side: [],
        },
      })
    }
    this.setState({ deckList: deckListCopy})
    this.setState({ selectedDeck: this.state.deckList[0].name})
    this.setState({ deck: this.state.deckList[0].deck})
    localStorage.setItem('decks', JSON.stringify(this.state.deckList));
  }

  readText = (e) => {
    if(e.target.files && e.target.files[0]){
      var reader = new FileReader();
      let name = e.target.files[0].name.split('.');
      reader.onload = (event) => {  
        var output=event.target.result;		
        output=output.split("\n");
        
        if(!output[0].match(/#/gi)){
          return;
        }
        var main = [], extra = [], side = [];
        var checker = '';
        for(let i=0; i<output.length; i++){
          if(output[i].match(/#/gi) || output[i].match(/!/gi)){
            checker = output[i];
          }
          else{
            if(checker.match(/#main/gi)){
              main.push(output[i]);
            }
            else if(checker.match(/#extra/gi)){
              extra.push(output[i]);
            }
            else if(checker.match(/!side/gi)){
              side.push(output[i]);
            }
          }
        }
        console.log(main)
        var deckListCopy = this.state.deckList
        deckListCopy.push({name: name[0], deck: {main: main, extra: extra, side: side}})
        this.setState({deckList: deckListCopy})
        localStorage.setItem('decks', JSON.stringify(this.state.deckList));
        //window.location.reload();
      };
      reader.readAsText(e.target.files[0]);
    }
  }

  fileSave = () =>{
    var out = '#main\n';

    for(let i=0; i<this.state.deck.main.length; i++){
        out += this.state.deck.main[i] + '\n';
    }
    out += '\n#extra\n';
    for(let i=0; i<this.state.deck.extra.length; i++){
        out += this.state.deck.extra[i] + '\n';
    }
    out += '\n!side\n';
    for(let i=0; i<this.state.deck.side.length; i++){
        out += this.state.deck.side[i] + '\n';
    }
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURIComponent(out);
    hiddenElement.target = '_blank';
    hiddenElement.download = `${this.state.selectedDeck}.ydk`;
    hiddenElement.click();
  }

  render (){
    return (
      <div className="container">
        <ViewCard viewCard={this.state.viewCard}/>
        <div className="cards-cont">
          <div className="top-cont">
            <div className="select-deck">
              <NewDeck handleNewDeck={this.handleNewDeck} addNewDeck={this.addNewDeck} deckName={this.state.deckName}/>
              <DeckList deckList={this.state.deckList} changeDeck={this.changeDeck} removeDeck={this.removeDeck}/>
              <Options readText={this.readText} fileSave={this.fileSave}/>
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
