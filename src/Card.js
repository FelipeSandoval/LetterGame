import React from "react";
import './Card.css';

const Card = (props) => {
  const { letter, id , onClick, backGroundColor } = props;
  return (
    <div 
        className={`card-container ${backGroundColor}`}
        key={id}
        onClick={onClick}
    >
    {letter}
    </div>
  );
}


export default Card;