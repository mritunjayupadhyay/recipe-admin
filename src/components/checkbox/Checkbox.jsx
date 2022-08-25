import React, { useState, useEffect } from 'react';
import './checkbox.scss';

function Checkbox({ title, name, handleCheckboxClick, checked }) {
  const handleChange = async (event) => {
        if (!event) return;
        const value = event?.target?.checked;
        handleCheckboxClick({id: name, value });
  }
  return (
    <div className='CheckboxComponent'>
        <input className='checkbox-input' checked={checked} type="checkbox" id={name} onChange={(event) => handleChange(event)} />
        <label className='checkbox-label' htmlFor={name}>{title}</label>
    </div>
  )
}

export default Checkbox;