import React, { useState } from 'react';
import './recipe-form.scss';

function RecipeForm({ getRecipeFormData }) {
  const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const [recipePic, setRecipePic] = useState('')

    const submitFunc = () => {
        return getRecipeFormData({
          name, description
        });
    }
  return (
    <form className='RecipeFormComponent'>
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
            <button 
            type='button' 
            className={`submitButton`} 
            onClick={() => submitFunc()}
            >Login</button>
        </form>
  )
}

export default RecipeForm;