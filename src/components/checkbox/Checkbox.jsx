import React, { useState } from 'react';
import './checkbox.scss';

function Checkbox({ title, name, handleCheckboxClick, checked }) {
  const propChecked = checked || false;  
  const [checkedValue, setCheckedValue] = useState(propChecked);
  const handleChange = async (event) => {
        if (!event) return;
        const value = event?.target?.checked;
        setCheckedValue(value);
        handleCheckboxClick({id: name, value });
    }
  return (
    <div className='CheckboxComponent'>
        <input className='checkbox-input' checked={checkedValue} type="checkbox" id={name} onChange={(event) => handleChange(event)} />
        <label className='checkbox-label' htmlFor={name}>{title}</label>
    </div>
  )
}

export default Checkbox