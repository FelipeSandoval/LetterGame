import React from "react";
import './ListLetters.css';
import Letter from './Letter';

const ListLetters = (props) => {
  const { listLetters, isValidWord, message, spanClass } = props;

  const list = listLetters  ? listLetters.map((cv,i) => (
      <Letter 
        key={i}
        letter={cv.letter}
      />
  )): '';
  const resolveSpanClass =  `stateSpan ${spanClass ? spanClass : '' }`

  return (
    <div className="ListLetters" >
      {list}
      {listLetters && listLetters.length > 0 ? 
        <label className={resolveSpanClass}>{isValidWord ? 'valid' : 'invalid'}</label>:
        <label className="noLetterSpan">{message}</label>
      }
    </div>
  );
}


export default ListLetters;