import React from 'react';
import Button from '../button/Button';
import './ingredient-show.scss';

function IngredientShow({ ingredient, editIngredient, deleteIngredient }) {
    return (
        <div className='IngredientShowComponent'>
        <div className="form-container">
          <input
            type="text"
            disabled
            value={ingredient.name}
            placeholder="name"
          />
          <input
            type={"text"}
            disabled
            value={ingredient.description}
            placeholder="description"
          />
          <input
            type="text"
            value={ingredient.amount}
            disabled
            placeholder="amount"
          />
          <div className='buttonContainer'>
            <Button
              size={'small'}
              buttonText={'Edit'}
              buttonType={'warning'}
              onClickFunc={() => editIngredient(ingredient?.id)}
            />
            <Button
              size={'small'}
              buttonText={'Delete'}
              buttonType={'danger'}
              onClickFunc={() => deleteIngredient(ingredient?.id)}
            />
          </div>
        </div>
      </div>
    )
}

export default IngredientShow