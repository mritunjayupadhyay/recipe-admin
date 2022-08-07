import React from 'react';
import './create.scss';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../../store/recipe.slice';
import RecipeShow from '../../components/recipe-show/RecipeShow';
import RecipeForm from '../../components/recipe-form/recipe-form';
import Ingredients from '../../components/ingredients/Ingredients';

function Create() {
    const dispatch = useDispatch();
    const { newRecipe } = useSelector(x => x.recipes);

    const getRecipeFormData = (formData) => {
        return dispatch(recipesActions.createRecipe(formData));
    }
    const clearNewRecipe = () => {
        return dispatch(recipesActions.clearNewRecipe());
    }
    return (
        <div className='CreateRecipeComponent'>
            {newRecipe
                ? <div className='CreateRecipeDisplayContainer'>
                    <RecipeShow recipe={newRecipe} />
                </div>
                : <div className='CreateRecipeFormContainer'>
                    <RecipeForm getRecipeFormData={getRecipeFormData} />
                </div>
            }
            <Ingredients recipeName={newRecipe?.name} />
            <button onClick={() => clearNewRecipe()}>Finish</button>
        </div>
    )
}

export default Create