import React, { Component  } from 'react';
import './Header.css';

export default class Header extends Component{

  render(){
    return (
      <div className="HeaderLetterGame">
        <h1>Letter Game</h1>
        <h5>Pick some letters to compose words </h5>
      </div>
    )
  }
}