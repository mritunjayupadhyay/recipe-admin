import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { recipesActions } from '../../store/recipe.slice';
import './home.scss';

function Home() {
    const dispatch = useDispatch();
    const { recipes } = useSelector(x => x.recipes);
    const { user } = useSelector(x => x.auth)
    useEffect(() => {
        dispatch(recipesActions.getRecipes());
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="HomePage">
            <h1>Hi {user?.name}!</h1>
            <p>You're logged in with React 18 + Redux & JWT!!</p>
            {recipes.length &&
                <ul>
                    {recipes.map(recipe =>
                        <li key={recipe.id}>
                            <p>{recipe.name}</p>
                            <div className='header-button-container'>
                                <Link>Edit</Link>
                                <Link>Delete</Link>
                            </div>
                        </li>
                    )}
                </ul>
            }
        </div>
    );
}

export { Home };
