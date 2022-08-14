import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import LoadingOne from '../../components/loading/LoadingOne';
import RecipeListItem from '../../components/recipe-list-item/RecipeListItem';
import { navigationRouter } from '../../helpers/navigation-router';
import { recipesActions } from '../../store/recipe.slice';
import './home.scss';

function Home() {
    const dispatch = useDispatch();
    const { recipes, loading } = useSelector(x => x.recipes);
    const deleteRecipe = (recipeId) => {
        return dispatch(recipesActions.deleteRecipe(recipeId));
    }
    const createRecipe = () => {
        navigationRouter.navigate('/create')
    }
    useEffect(() => {
        dispatch(recipesActions.getRecipes());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="HomePage">
            <Container>
                <div className='component-heading'>
                    <h1>Recipe List</h1>
                </div>
                <div className='listContainer'>
                    {loading && <LoadingOne />}
                    <div className='list-heading'>
                        <Button
                            buttonText={'Add New Recipe'}
                            buttonType="primary"
                            size={'medium'}
                            onClickFunc={createRecipe}
                         />
                    </div>
                    <div className='recipe-list'>
                    {recipes?.length ?
                        <ul>
                            <li className='list-header'>
                                <div>
                                <span>name</span>
                                </div>
                                <div className='tabletView'>
                                <span>description</span>
                                </div>
                                <div style={{ justifyContent: 'center'}}>
                                <span>picture</span>
                                </div>
                                <div className='action-button-header'>
                                <span></span>
                                </div>
                            </li>
                            {recipes.map(recipe =>
                                <RecipeListItem 
                                    key={recipe.id}
                                    recipe={recipe} 
                                    deleteRecipe={(id) => deleteRecipe(id)} 
                                />
                            )}
                        </ul>
                        : <div><p>No Recipe</p></div>
                    }
                    </div>                   
                </div>
            </Container>

        </div>
    );
}

export { Home };
