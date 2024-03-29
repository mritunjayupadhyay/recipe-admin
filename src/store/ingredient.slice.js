import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { defaultError } from '../app.constant';
import { arrayToStringTransformer } from '../helpers/transform-toString';
const initialState = {
    // initialize state from local storage to enable user to stay logged in
    ingredients: [],
    newIngredient: null,
    readyToCreate: false,
    readyToEdit: 0,
    error: '',
    loading: false
};

function createExtraActions() {
    
    return {
        getIngredients: getIngredients(),
        deleteIngredient: deleteIngredient(),
        createIngredient: createIngredient(),
        editIngredient: editIngredient()
    };    

    function getIngredients() {
        return createAsyncThunk('getIngredients', async (recipeId) => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe/${recipeId}/ingredients`;
            return axios
              .get(url)
              .then(response => {
                console.log("response from server", response);
                return response?.data;
              })
              .catch((error) => {
                const errorData = error?.response?.data || defaultError;
                console.log("we got some error", errorData);
                return errorData;
            } )
        })
    }
    function deleteIngredient() {
        return createAsyncThunk('deleteIngredient', async ({recipeId, ingredientId}) => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe/${recipeId}/ingredients/${ingredientId}`;
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
            .catch((error) => {
                const errorData = error?.response?.data || defaultError;
                console.log("we got some error", errorData);
                return errorData;
            })
        })
    }
    function createIngredient() {
        return createAsyncThunk('createIngredient', async ({recipeId, formData}) => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe/${recipeId}/ingredients`;
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
            .catch((error) => {
                const errorData = error?.response?.data || defaultError;
                console.log("we got some error", errorData);
                return errorData;
            } )
        })
    }
    function editIngredient() {
        return createAsyncThunk('editIngredient', async ({recipeId, ingredientId, formData}) => {
            const url = `${process.env.REACT_APP_BASE_URL}/recipe/${recipeId}/ingredients/${ingredientId}`;
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
            .catch((error) => {
                const errorData = error?.response?.data || defaultError;
                console.log("we got some error", errorData);
                return errorData;
            } )
        })
    }
}

const extraActions = createExtraActions();
const readyToCreate = createAction('ingredient/readyToCreate')
const readyToEdit = createAction('ingredient/readyToEdit')
const clearEditOrCreate = createAction('ingredient/clearEditOrCreate');
const removeError = createAction('ingredient/removeError');
// const createReducers = createReducer(initialState, (builder) => {    
//     builder
//       .addCase(readyToCreate, (state, action) => {
//         state.readyToCreate = action.payload;
//         state.readyToEdit = 0;
//         console.log("state value", state, action.payload);
//       })
//       .addCase(readyToEdit, (state, action) => {
//         state.readyToCreate = false;
//         state.readyToEdit = action.payload;
//       })
// })

const createExtraReducer = (builder) => {
    builder.addCase(extraActions?.getIngredients?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.getIngredients?.fulfilled, (state, action) => {
        const { data, error, message } = action?.payload;
        if (error === false) {
            state.loading = false
            state.ingredients = data
            state.error = '';
        } else {
            state.loading = false;
            state.error = arrayToStringTransformer(message)
        }
        
    })
    builder.addCase(extraActions?.getIngredients?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message
    })
    builder.addCase(extraActions?.deleteIngredient?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.deleteIngredient?.fulfilled, (state, action) => {
        // state.loading = false
        const { data, error, message } = action?.payload;
        if (error === false) {
            state.loading = false
            state.ingredients = [...state.ingredients]
                                .filter((item) => item?.id !== data?.ingredientId);
            state.error = '';
        } else {
            state.loading = false;
            state.error = arrayToStringTransformer(message)
        }
    })
    builder.addCase(extraActions?.deleteIngredient?.rejected, (state, action) => {
        // state.loading = false;
        state.error = action?.error?.message
    })
    builder.addCase(extraActions?.createIngredient?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.createIngredient?.fulfilled, (state, action) => {
        const { data, error, message } = action?.payload;
        if (error === false) {
            state.loading = false
            state.newIngredient = data
            state.ingredients.push(data)
            state.readyToCreate = false;
            state.error = '';
        } else {
            state.loading = false;
            state.error = arrayToStringTransformer(message)
        }
    })
    builder.addCase(extraActions?.createIngredient?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message
    })
    builder.addCase(extraActions?.editIngredient?.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions?.editIngredient?.fulfilled, (state, action) => {
        
        const { data, error, message } = action?.payload;
        if (error === false) {
            state.loading = false
        console.log("payload", action.payload);
        // state.newIngredient = action?.payload?.data
        state.ingredients = state.ingredients.map((ingredient) => {
            if (ingredient?.id === action?.payload?.data?.id) {
                return action?.payload?.data;
            }
            return ingredient;
        })
        state.readyToEdit = 0;
        state.error = '';
        } else {
            state.loading = false;
            state.error = arrayToStringTransformer(message)
        }
    })
    builder.addCase(extraActions?.editIngredient?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message
    })
    .addCase(readyToCreate, (state, action) => {
        state.readyToCreate = action.payload;
        state.readyToEdit = 0;
        console.log("state value", state, action.payload);
    })
    .addCase(readyToEdit, (state, action) => {
        state.readyToCreate = false;
        state.readyToEdit = action.payload;
    })
    .addCase(clearEditOrCreate, (state, action) => {
        state = initialState;
    })
    .addCase(removeError, (state, action) => {
        state.loading = false;
        state.error = ''
    })
}

// function createReducers() {
//     return {
//         clearNewRecipe,
//         removeShowRecipe
//     };

//     function clearNewRecipe(state) {
//         state.newRecipe = null;
//     }
//     function removeShowRecipe(state) {
//         state.showRecipe = null;
//     }
// }



const slice = createSlice({
    name: 'ingredient',
    initialState,
    extraReducers: createExtraReducer
});

// exports
export const ingredientsActions = { 
    ...slice.actions, readyToCreate, readyToEdit, clearEditOrCreate, removeError, ...extraActions };
export const ingredientsReducer = slice.reducer;