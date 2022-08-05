import React from 'react';
import './Button.scss';

function Button({ buttonText, size, buttonType, onClickFunc }) {
  return (
    <button 
        onClick={() => onClickFunc()}
        className={`${size} ${buttonType}`}
    >{buttonText}</button>
  )
}

export default Button