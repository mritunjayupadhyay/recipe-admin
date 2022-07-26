import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    // initialize state from local storage to enable user to stay logged in
    recipes: [],
    newRecipe: null,
    showRecipe: null,
    error: '',
    loading: false
};

function createExtraActions() {
    
    return {
        getRecipes: getRecipes(),
        deleteRecipe: deleteRecipe(),
        createRecipe: createRecipe(),
        getRecipe: getRecipe(),
        editRecipe: editRecipe()
    };    

    function getRecipes() {
        return createAsyncThunk('recipes', async () => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe`;
            return axios
              .get(url)
              .then(response => {
                console.log("response from server", response);
                return response?.data;
              })
        })
    }
    function deleteRecipe() {
        return createAsyncThunk('deleteRecipe', async (recipeId) => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe/${recipeId}`;
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
    function createRecipe() {
        return createAsyncThunk('createRecipe', async (formData) => {
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
    function getRecipe() {
        return createAsyncThunk('recipe', async (recipeId) => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe/${recipeId}`;
            return axios
              .get(url)
              .then(response => {
                console.log("response from server", response);
                return response?.data;
              })
        })
    }
    function editRecipe() {
        return createAsyncThunk('editRecipe', async ({recipeId, formData}) => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe/${recipeId}`;
            // const { authToken } = useSelector(x => x.auth);
            const authToken = localStorage.getItem('authToken');
            console.log("from action of delete recipe", url, authToken);
            const data = formData;
            return axios
            .put(url, data, {
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

function createReducers() {
    return {
        clearNewRecipe,
        removeShowRecipe
    };

    function clearNewRecipe(state) {
        state.newRecipe = null;
    }
    function removeShowRecipe(state) {
        state.showRecipe = null;
    }
}

const createExtraReducer = (builder) => {
    // To get list of recipe
    builder.addCase(extraActions?.getRecipes?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.getRecipes?.fulfilled, (state, action) => {
        state.loading = false
        state.recipes = action?.payload?.data
        state.error = '';
    })
    builder.addCase(extraActions?.getRecipes?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message
    })

    // To delete a recipe
    builder.addCase(extraActions?.deleteRecipe?.fulfilled, (state, action) => {
        // state.loading = false
        console.log("payload in delete recipe", action.payload);
        if (action.payload.error === false) {
            state.recipes = [...state.recipes]
                            .filter((item) => item?.name !== action?.meta?.arg);
        }
        state.error = '';
    })
    builder.addCase(extraActions?.deleteRecipe?.rejected, (state, action) => {
        // state.loading = false;
        state.error = action?.error?.message
    })

    // To create recipe
    builder.addCase(extraActions?.createRecipe?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.createRecipe?.fulfilled, (state, action) => {
        state.loading = false
        state.newRecipe = action?.payload?.data
        state.error = '';
    })
    builder.addCase(extraActions?.createRecipe?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message
    })

    // To get one recipe
    builder.addCase(extraActions?.getRecipe?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.getRecipe?.fulfilled, (state, action) => {
        state.loading = false
        state.showRecipe = action?.payload?.data
        state.error = '';
    })
    builder.addCase(extraActions?.getRecipe?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message
    })

    // To edit one recipe
    builder.addCase(extraActions?.editRecipe?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.editRecipe?.fulfilled, (state, action) => {
        state.loading = false
        state.showRecipe = action?.payload?.data
        state.error = '';
    })
    builder.addCase(extraActions?.editRecipe?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message
    })
}

const slice = createSlice({
    name: 'recipes',
    initialState,
    reducers: createReducers(),
    extraReducers: createExtraReducer
});

// exports
export const recipesActions = { 
    ...slice.actions, ...extraActions };
export const recipesReducer = slice.reducer;