import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { recipesActions } from '../../store/recipe.slice';
import './home.scss';

function Home() {
    const dispatch = useDispatch();
    const { recipes } = useSelector(x => x.recipes);
    const { user } = useSelector(x => x.auth);
    const deleteRecipe = (recipeName) => {
        return dispatch(recipesActions.deleteRecipe(recipeName));
    }
    useEffect(() => {
        dispatch(recipesActions.getRecipes());
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="HomePage">
            <h1>Hi {user?.name}!</h1>
            <p>You're logged in with React 18 + Redux & JWT!!</p>
            <Link to={`create`}>Create</Link>
            {recipes?.length &&
                <ul>
                    {recipes.map(recipe =>
                        <li key={recipe?.id}>
                            <p>{recipe?.name}</p>
                            <div className='header-button-container'>
                                <Link to={`${recipe?.id}/edit`}>Edit</Link>
                                <button onClick={() => deleteRecipe(recipe?.name)}>Delete</button>
                            </div>
                        </li>
                    )}
                </ul>
            }
        </div>
    );
}

export { Home };
