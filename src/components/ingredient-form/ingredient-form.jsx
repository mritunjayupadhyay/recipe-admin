import React, { useState } from 'react';
import './ingredient-form.scss';

function IngredientForm({ getIngredientFormData, formData }) {
  const propName = formData?.name || '';
  const propDes = formData?.description || '';
  const propAmount = formData?.amount || '';
  const [name, setName] = useState(propName);
  const [description, setDescription] = useState(propDes);
  const [amount, setAmount] = useState(propAmount);
    // const [recipePic, setRecipePic] = useState('')

    const submitFunc = () => {
        return getIngredientFormData({
          name, description, amount,
          id: formData?.id
        });
    }
  return (
    <form className='IngredientFormComponent'>
      <h2>Create Recipe</h2>
            <input 
            type="text" 
            value={name}  
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            />
            <textarea 
            value={description} 
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            />
            <input 
            type="text" 
            value={amount}  
            placeholder="amount"
            onChange={(e) => setAmount(e.target.value)}
            />
            <button 
            type='button' 
            className={`submitButton`} 
            onClick={() => submitFunc()}
            >Login</button>
        </form>
  )
}

export default IngredientForm;