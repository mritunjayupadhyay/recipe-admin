import React from 'react';
import './ingredient-show.scss';

function IngredientShow({ ingredient, editIngredient, deleteIngredient }) {
    return (
        <div>
            <p>{ingredient?.name}</p>
            <p>{ingredient?.description}</p>
            <p>{ingredient?.amount}</p>
            <div className='header-button-container'>
                <button onClick={() => editIngredient(ingredient?.id)}>Edit</button>
                <button onClick={() => deleteIngredient(ingredient?.id)}>Delete</button>
            </div>
        </div>
    )
}

export default IngredientShow