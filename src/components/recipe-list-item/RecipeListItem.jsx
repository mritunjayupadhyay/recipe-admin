import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import './recipe-list-item.scss';
function RecipeListItem({ recipe, deleteRecipe }) {
  return (
    <li className='RecipeListItem' key={recipe?.id}>
      <div className='recipe-item-container'>
          <span>{recipe?.name}</span>
      </div>
      <div className='recipe-item-container'>
        <span>{recipe?.description}</span>
      </div>
      <div>
        <img src="" alt="" />
      </div>
      <div className='recipe-item-container'>
      <Link to={`${recipe?.id}/edit`}>Edit</Link>
      </div>
      <div className='recipe-item-container'>
        <Button
          buttonText={'Delete'}
          size="small"
          buttonType="danger"
          onClickFunc={() => deleteRecipe(recipe?.id)}
        />
      </div>
    </li>
  )
}

export default RecipeListItem