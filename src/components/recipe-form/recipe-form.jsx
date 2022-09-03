import React, { useState } from 'react';
import Button from '../button/Button';
import Swal from "sweetalert2";
import ImageUpload from '../uploadImage/imageUpload';
import './recipe-form.scss';
import Checkbox from '../checkbox/Checkbox';

function RecipeForm({ getRecipeFormData, formData }) {
  const propName = formData?.name || '';
  const propDes = formData?.description || '';
  const propImage = formData?.image || '';
  const propNonVeg = formData?.nonVeg || false;
  const [name, setName] = useState(propName);
  const [nonVeg, setNonVeg] = useState(propNonVeg);
  const [description, setDescription] = useState(propDes);
  const [recipeImage, setRecipeImage] = useState(propImage);
  const submitFunc = () => {
    if (!name) {
      Swal.fire({
        title: 'Name can not be empty',
        icon: 'error',
      });
    }
    if (!recipeImage) {
      Swal.fire({
        title: 'Recipe Image can not be empty',
        icon: 'error',
      });
    }
    return getRecipeFormData({
      name, description, 
      recipePic: recipeImage,
      nonVeg
    });
  }
  const handleImageChange = (data) => {
    console.log("is this been called", data);
    setRecipeImage(data)
  }
  const handleCheckBoxClick = (data) => {
    if (data.id === 'create-recipe-non-veg') {
      setNonVeg(data.value);
    }
  }
  return (
    <form className='RecipeFormComponent'>
      <h2>Create Recipe</h2>
      <div className='image-upload-container'>
        <ImageUpload
        title={'Add Recipe Image'}
        handleChangeFunc={(data) => handleImageChange(data)} 
        image={recipeImage}
        pathString={'recipe_create'}
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
      <div className='Checkbox-container'>
        <Checkbox
            title={'Non Veg'}
            name={'create-recipe-non-veg'} 
            checked={nonVeg}
            handleCheckboxClick={(data) => handleCheckBoxClick(data)}
        />
      </div>
      <Button
        size={'large'}
        buttonText={!!formData ? 'Edit Recipe' :'Create Recipe'}
        buttonType={'primary'}
        onClickFunc={() => submitFunc()}
      />
    </form>
  )
}

export default RecipeForm;