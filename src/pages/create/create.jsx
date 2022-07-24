import React from 'react';
import './create.scss';
import { useDispatch } from 'react-redux';
import { recipesActions } from '../../store/recipe.slice';

import RecipeForm from '../../components/recipe-form/recipe-form';

function Create() {
    const dispatch = useDispatch();

    const getRecipeFormData = (formData) => {
        return dispatch(recipesActions.createRecipe(formData));
        console.log("form data for create recipe", formData);
    }
    return (
        <div className='CreateRecipeComponent'>
            <div className='CreateRecipeFormContainer'>
                <RecipeForm getRecipeFormData={getRecipeFormData} />
            </div>
        {/* <div className='CreateRecipeFormContainer'>
            <RecipeForm getRecipeFormData={getRecipeFormData} />
        </div> */}
        </div>
    )
}

export default Create