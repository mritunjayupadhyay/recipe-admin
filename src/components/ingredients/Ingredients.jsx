import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsActions } from '../../store/ingredient.slice';
import IngredientShow from '../ingredient-show/IngredientShow';
import IngredientForm from '../ingredient-form/ingredient-form';

function Ingredients({ recipeId }) {
  const dispatch = useDispatch();

  const [editIngredientId, setEditIngredientId] = useState(0);
  const [createNew, setCreateNew] = useState(false);
   useEffect(() => {
    // eslint-disable-next-line
    dispatch(ingredientsActions.getIngredients(recipeId));
  // eslint-disable-next-line
  },[recipeId]);

  const deleteIngredient = (ingredientId) => {
    return dispatch(ingredientsActions.deleteIngredient({recipeId, ingredientId}));
}

const editIngredient = (ingredientId) => {
  setEditIngredientId(ingredientId);
}

const getIngredientFormData = (formData) => {
  console.log("only edit is remaining", formData)
  if (formData.id) {
    return dispatch(ingredientsActions.editIngredient({
      recipeId: recipeId,
      ingredientId: formData.id,
      formData
    }));
  }
  return dispatch(ingredientsActions.createIngredient({
    recipeId: recipeId,
    formData
  }));
}

  const { ingredients } = useSelector(x => x.ingredients);

    return (
    <div>Ingredient : {recipeId}
    <p></p>
    {ingredients?.length &&
                <ul>
                    {ingredients.map(ingredient =>
                        <li key={ingredient?.id}>
                            {ingredient.id === editIngredientId 
                            ? <IngredientForm
                            getIngredientFormData={getIngredientFormData} 
                            formData={{
                              name: ingredient?.name,
                              description: ingredient?.description,
                              amount: ingredient?.ingredient,
                              id: ingredient?.id
                            }}
                            />
                          : <IngredientShow
                          ingredient={ingredient}
                          editIngredient={editIngredient}
                          deleteIngredient={deleteIngredient}
                          />}
                        </li>
                    )}
                </ul>
            }
            {createNew 
            ? <IngredientForm
            getIngredientFormData={getIngredientFormData} 
            /> 
            : <button onClick={() => setCreateNew(true)}>Add Ingredient</button>
}
    </div>
  )
}

export default Ingredients;