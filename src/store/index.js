import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { authReducer } from './auth.slice';
import { recipesReducer } from './recipe.slice';
export * from './auth.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});