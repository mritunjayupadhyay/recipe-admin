import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeShow from '../../components/recipe-show/RecipeShow';
import { recipesActions } from '../../store/recipe.slice';
import { ingredientsActions } from '../../store/ingredient.slice';
import Ingredients from '../../components/ingredients/Ingredients';
import Container from '../../components/container/Container';
import './display.scss';

function Display() {
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
      return dispatch(ingredientsActions.clearEditOrCreate())
    }
      // eslint-disable-next-line
  },[])
  const { showRecipe } = useSelector(x => x.recipes);

  return (
    <div className='DisplayRecipePage'>

      <div className='goBackHomePageContainer'>
                <Container>
                    <Link to="/">Go to Home page</Link>
                </Container>
      </div>
      <Container>
                <div className='component-heading'>
                    <h1>Recipe & It's Ingredients</h1>
                </div>
                <div className="whiteContainer">
                {showRecipe ? <RecipeShow recipe={showRecipe} /> : null}

                </div>
                {showRecipe ? <Ingredients recipeId={showRecipe?.id} />: null }
            </Container>
    </div>
  )
}

export default Display;