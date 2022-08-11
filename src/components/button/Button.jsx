import React from 'react';
import './Button.scss';

function Button({ buttonText, size, buttonType, onClickFunc }) {
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    onClickFunc();
  }
  return (
    <button 
        onClick={(event) => handleClick(event)}
        className={`${size} ${buttonType}`}
    >{buttonText}</button>
  )
}

export default Button