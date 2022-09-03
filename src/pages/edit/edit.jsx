import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../../store/recipe.slice';
import RecipeForm from '../../components/recipe-form/recipe-form';
import Ingredients from '../../components/ingredients/Ingredients';
import RecipeShow from '../../components/recipe-show/RecipeShow';
import Container from '../../components/container/Container';
import './edit.scss';
import { ingredientsActions } from '../../store/ingredient.slice';
function Edit() {
  const { recipeId } = useParams();
  const dispatch = useDispatch();
  const [editRecipe, setEditRecipe] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    dispatch(recipesActions.getRecipe(recipeId));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      return dispatch(ingredientsActions.clearEditOrCreate())
    }
    // eslint-disable-next-line
  }, [])
  const { showRecipe } = useSelector(x => x.recipes);

  const getRecipeFormData = (formData) => {
    dispatch(recipesActions.editRecipe({
      recipeId: showRecipe.id,
      formData
    }));
    setEditRecipe(false);
    return;
  }
  return (
    <div className='EditRecipeComponent'>
      <div className='goBackHomePageContainer'>
        <Container>
          <Link to="/">Go to Home page</Link>
        </Container>
      </div>
      <div className='CreateRecipeFormContainer'>

        <Container>
          <div className='component-heading'>
            <h1>Edit Recipe & It's Ingredients</h1>
          </div>
          <div className="whiteContainer">
            <div className='list-heading'>
              <Button
                buttonText={editRecipe ? 'Cancel' : 'Edit'}
                buttonType={editRecipe ? 'warning' : 'primary'}
                size={'medium'}
                onClickFunc={() => setEditRecipe(!editRecipe)}
              />
            </div>
            {editRecipe
              ? <div className='CreateRecipeFormContainer'>
                <RecipeForm 
                  getRecipeFormData={getRecipeFormData} 
                  formData={{
                    name: showRecipe?.name,
                    image: showRecipe.recipePic,
                    description: showRecipe?.description,
                    nonVeg: showRecipe?.nonVeg,
                    id: showRecipe?.id
                  }}
                />
              </div>
              : <div className='CreateRecipeDisplayContainer'>
                {showRecipe ? <RecipeShow recipe={showRecipe} /> : null}
              </div>
            }
          </div>
          {showRecipe && <Ingredients recipeId={showRecipe?.id} />}
        </Container>
      </div>
    </div>
  )
}

export default Edit;