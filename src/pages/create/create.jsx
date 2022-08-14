import React, { useEffect } from 'react';
import './create.scss';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../../store/recipe.slice';
import RecipeShow from '../../components/recipe-show/RecipeShow';
import RecipeForm from '../../components/recipe-form/recipe-form';
import Ingredients from '../../components/ingredients/Ingredients';
import Container from '../../components/container/Container';
import LoadingOne from '../../components/loading/LoadingOne';
import { Link } from 'react-router-dom';
import { ingredientsActions } from '../../store/ingredient.slice';

function Create() {
    const dispatch = useDispatch();
    const { newRecipe, loading } = useSelector(x => x.recipes);

    const getRecipeFormData = (formData) => {
        console.log("form data after create", formData);
        return dispatch(recipesActions.createRecipe(formData));
    }
    useEffect(() => {
        return () => {
            // eslint-disable-next-line
          return dispatch(ingredientsActions.clearEditOrCreate())
        }
          // eslint-disable-next-line
      },[])
    return (
        <div className='CreateRecipeComponent'>
            <div className='goBackHomePageContainer'>
                <Container>
                    <Link to="/">Go to Home page</Link>
                </Container>
            </div>
            <Container>
                <div className='component-heading'>
                    <h1>Add Recipe & It's Ingredients</h1>
                </div>
                <div className="whiteContainer">
                    {loading && <LoadingOne />}
                    {newRecipe
                        ? <div className='CreateRecipeDisplayContainer'>
                            <RecipeShow recipe={newRecipe} />
                        </div>
                        : <div className='CreateRecipeFormContainer'>
                            <RecipeForm getRecipeFormData={getRecipeFormData} />
                        </div>
                    }
                </div>
                {newRecipe && <Ingredients recipeId={newRecipe?.id} />}
            </Container>

            {/* <button onClick={() => clearNewRecipe()}>Finish</button> */}
        </div>
    )
}

export default Create