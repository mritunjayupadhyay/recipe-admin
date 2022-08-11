import React, { useState } from 'react';
import Button from '../button/Button';
import ImageUpload from '../uploadImage/imageUpload';
import './recipe-form.scss';

function RecipeForm({ getRecipeFormData, formData }) {
  const propName = formData?.name || '';
  const propDes = formData?.description || '';
  const propImage = formData?.image || '';
  const [name, setName] = useState(propName);
  const [description, setDescription] = useState(propDes);
  const [recipeImage, setRecipeImage] = useState(propImage);
  // const [recipePic, setRecipePic] = useState('')
  const submitFunc = () => {
    return getRecipeFormData({
      name, description
    });
  }
  const handleImageChange = (data) => {
    console.log("handle image change", data);
    setRecipeImage(data);
  }
  return (
    <form className='RecipeFormComponent'>
      <h2>Create Recipe</h2>
      <div className='image-upload-container'>
        <ImageUpload
        title={'Add Recipe Image'}
        handleChangeFunc={(data) => setRecipeImage(data)} 
        image={recipeImage}
        />
      </div>
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
      <Button
        size={'large'}
        buttonText={'Create Recipe'}
        buttonType={'primary'}
        onClickFunc={() => submitFunc()}
      />
    </form>
  )
}

export default RecipeForm;