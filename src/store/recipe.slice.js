import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    // initialize state from local storage to enable user to stay logged in
    recipes: [],
    error: '',
    loading: false
};

function createExtraActions() {
    return {
        getRecipes: getRecipes()
    };    

    function getRecipes() {
        return createAsyncThunk('recipe', async () => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe`;
            return axios
              .get(url)
              .then(response => {
                console.log("response from server", response);
                return response.data;
              })
        })
    }
}

const extraActions = createExtraActions();

const createExtraReducer = (builder) => {
    builder.addCase(extraActions.getRecipes.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions.getRecipes.fulfilled, (state, action) => {
        state.loading = false
        state.recipes = action.payload.data
        state.error = '';
    })
    builder.addCase(extraActions.getRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
    })
}

const slice = createSlice({
    name: 'recipes',
    initialState,
    extraReducers: createExtraReducer
});

// exports
export const recipesActions = { 
    ...slice.actions, ...extraActions };
export const recipesReducer = slice.reducer;