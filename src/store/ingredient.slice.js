import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    // initialize state from local storage to enable user to stay logged in
    ingredients: [],
    newIngredient: null,
    error: '',
    loading: false
};

function createExtraActions() {
    
    return {
        getIngredients: getIngredients(),
        deleteIngredient: deleteIngredient(),
        createIngredient: createIngredient()
    };    

    function getIngredients() {
        return createAsyncThunk('getIngredients', async () => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe`;
            return axios
              .get(url)
              .then(response => {
                console.log("response from server", response);
                return response?.data;
              })
        })
    }
    function deleteIngredient() {
        return createAsyncThunk('deleteIngredient', async (recipeName) => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe/${recipeName}`;
            // const { authToken } = useSelector(x => x.auth);
            const authToken = localStorage.getItem('authToken');
            console.log("from action of delete recipe", url, authToken);
            return axios
            .delete(url, {
                headers: {
                    token: `Bearer ${authToken}`
                }
            })
            .then(response => {
                console.log("response from server", response);
                return response?.data;
            })
        })
    }
    function createIngredient() {
        return createAsyncThunk('createIngredient', async (formData) => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe/`;
            // const { authToken } = useSelector(x => x.auth);
            const authToken = localStorage.getItem('authToken');
            console.log("from action of delete recipe", url, authToken);
            const data = formData;
            return axios
            .post(url, data, {
                headers: {
                    token: `Bearer ${authToken}`
                }
            })
            .then(response => {
                console.log("response from server", response);
                return response?.data;
            })
        })
    }
    
}

const extraActions = createExtraActions();

const createExtraReducer = (builder) => {
    builder.addCase(extraActions?.getIngredients?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.getIngredients?.fulfilled, (state, action) => {
        state.loading = false
        state.ingredients = action?.payload?.data
        state.error = '';
    })
    builder.addCase(extraActions?.getIngredients?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message
    })
    builder.addCase(extraActions?.deleteIngredient?.fulfilled, (state, action) => {
        // state.loading = false
        console.log("payload in delete recipe", action.payload);
        if (action.payload.error === false) {
            state.ingredients = [...state.ingredients]
                            .filter((item) => item?.name !== action?.meta?.arg);
        }
        state.error = '';
    })
    builder.addCase(extraActions?.deleteIngredient?.rejected, (state, action) => {
        // state.loading = false;
        state.error = action?.error?.message
    })
    builder.addCase(extraActions?.createIngredient?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.createIngredient?.fulfilled, (state, action) => {
        state.loading = false
        state.newIngredient = action?.payload?.data
        state.error = '';
    })
    builder.addCase(extraActions?.createIngredient?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message
    })
}

const slice = createSlice({
    name: 'ingredient',
    initialState,
    extraReducers: createExtraReducer
});

// exports
export const recipesActions = { 
    ...slice.actions, ...extraActions };
export const recipesReducer = slice.reducer;