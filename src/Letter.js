import React from "react";

const Letter = (props) => {
  const { letter, id } = props;
  return (
    <div 
        id={id}
        className="Letter"
        key={id}
    >
    {letter}
    </div>
  );
}


export default Letter;