import React, { Component } from 'react';
import  './GameBoard.css';
import Card from './Card';
import { data } from './data/dictionary';
import { board } from './data/letterOptions';
import ListLetters from './listLetters';

export default class GameBoard extends Component{
  constructor(props){
    super(props);

    // we get the letters map then as we need
    let cards = board.map((cv, index) => {
      return {letter: cv, isSelected: false, key:index };
    });

    //define state
    this.state = {
          cards, 
          listSelectedLetters: [], 
          isValidWord: false, 
          message: 'Pick some letters'
    };

    this.clearAllLetters = this.clearAllLetters.bind(this);
    this.handleListLetters = this.handleListLetters.bind(this);
    this.updateSelectedWord = this.updateSelectedWord.bind(this);
    this.popLastLetter = this.popLastLetter.bind(this);

  }

  // To clear all selected letters
  clearAllLetters(){
    const newCards = this.state.cards.map((cv) => {
        return {
          ...cv,
          isSelected: false 
        };
    });
    this.setState({cards: newCards, listSelectedLetters: []});
  }

  // Component life-cicle that triggers every time state or prop is change i used to check if the word is valid (to not change setState callbacks)
  componentDidUpdate(prevProps, prevState){
    if(this.state.listSelectedLetters.length !== prevState.listSelectedLetters.length) {
      let listCheckedLetters = this.state.listSelectedLetters.map((cv) => (cv.letter));
      let isValidWord = data.words.includes([...listCheckedLetters].join().replace(/,/g, '').toLowerCase());
      this.setState({isValidWord});
    }
  }

  // Pretty self explanatory
  popLastLetter(list){
    if(list instanceof Array && list.length > 0){
      let deletedLetter = [...list].pop();
      this.handleListLetters(deletedLetter.key, true);
    }
  }

  // I use this method to update the list of selected letters vs the unselected list
  handleListLetters(key, isSelected){
    const checkLetter = (cards,selectedId,isSelected) => {
      return cards.map((cv) => {
        if(cv.key === selectedId){
          this.updateSelectedWord(cv, this.state.listSelectedLetters,isSelected );
          return {
            ...cv,
            isSelected: isSelected 
          };
        }
        return cv;
      });
    }

    let cards = checkLetter(this.state.cards, key, !isSelected);
    this.setState({cards})
  }

  // Helper to update the list of selected letters
  updateSelectedWord(selectedLetter,listSelectedLetters, isSelected){
    if(isSelected){
      this.setState({listSelectedLetters: [...listSelectedLetters, selectedLetter]})
    }else{ 
      this.setState({listSelectedLetters: [
        ...listSelectedLetters.filter((element) => {
          return element.key !== selectedLetter.key;
        })]
      });
    }
  }

  render (){
    const Cards = this.state.cards.map((card, i) => {
      let backGroundColor = this.state.isValidWord ? 'isValid' : 'isInValid';
      return( 
        <Card 
          letter={card.letter}
          key={i}
          id={card.key}
          onClick={() => this.handleListLetters(card.key, card.isSelected)}
          backGroundColor={card.isSelected ? backGroundColor : ''}
        />)
    });
    const spanClass = this.state.isValidWord ? 'isValid' : 'isInValid';

    return (
      <div>
        <div className="gameBoard">
          {Cards}
        </div>
        <div className="container-list">
          <ListLetters 
            listLetters={this.state.listSelectedLetters}
            isValidWord={this.state.isValidWord}
            message={this.state.message}
            spanClass = {spanClass}
          />
          <div className="buttons-container">
            <button
              onClick={() => this.popLastLetter(this.state.listSelectedLetters)}
            >Erase Last Letter (X)
            </button>
            <button
              onClick={() => this.clearAllLetters()}>
              Clear all Letters
            </button>
          </div>  
        </div>
      </div>
      
      
    )
  }

  
}