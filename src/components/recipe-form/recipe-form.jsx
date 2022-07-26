import React, { useState } from 'react';
import './recipe-form.scss';

function RecipeForm({ getRecipeFormData, formData }) {
  const propName = formData?.name || '';
  const propDes = formData?.description || '';
  const [name, setName] = useState(propName);
  const [description, setDescription] = useState(propDes);
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
      >Submit</button>
    </form>
  )
}

export default RecipeForm;