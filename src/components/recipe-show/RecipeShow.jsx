import React from 'react';
import './recipe-show.scss';

function RecipeShow({ recipe}) {
  return (
    <div>
        <p>{ recipe.name }</p>
        <p>{ recipe.description }</p>
    </div>
  )
}

export default RecipeShow