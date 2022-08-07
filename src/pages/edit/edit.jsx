import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../../store/recipe.slice';
import RecipeForm from '../../components/recipe-form/recipe-form';
import Ingredients from '../../components/ingredients/Ingredients';

function Edit() {
  const { recipeId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line
    dispatch(recipesActions.getRecipe(recipeId));
  // eslint-disable-next-line
  },[]);
  useEffect(() => {
    return () => {
        // eslint-disable-next-line
      return dispatch(recipesActions.removeShowRecipe())
    }
      // eslint-disable-next-line
  },[])
  const { showRecipe } = useSelector(x => x.recipes);

  const getRecipeFormData = (formData) => {
    return dispatch(recipesActions.editRecipe({
      recipeId: showRecipe.id,
      formData
    }));
  }
  return (
    <div className='EditRecipeComponent'>
      <div className='CreateRecipeFormContainer'>
        {showRecipe && <RecipeForm
          getRecipeFormData={getRecipeFormData}
          formData={{
            name: showRecipe?.name,
            description: showRecipe?.description
          }}
        />}
      </div>
      {showRecipe && <Ingredients recipeId={showRecipe?.id} />}
    </div>
  )
}

export default Edit;