import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { authReducer } from './auth.slice';
import { ingredientsReducer } from './ingredient.slice';
import { recipesReducer } from './recipe.slice';
export * from './auth.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipesReducer,
        ingredients: ingredientsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});