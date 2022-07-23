import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { navigationRouter } from '../helpers/navigation-router';
const initialState = {
    // initialize state from local storage to enable user to stay logged in
    authToken: JSON.parse(localStorage.getItem('authToken')),
    user: JSON.parse(localStorage.getItem('user')),
    error: '',
    loading: false
};

function createExtraActions() {
    return {
        login: login()
    };    

    function login() {
        return createAsyncThunk('auth/login', async ({ email, password}) => {
            const url = `${process.env.REACT_APP_BASE_URL}/login-recipe`;
            const data = {
                email, password
            }
            return axios
              .post(url, data)
              .then(response => {
                console.log("response from server", response);
                return response.data;
              })
        })
    }
}

const extraActions = createExtraActions();

const createReducers = () => {
    return {
        logout
    };

    function logout(state) {
        state.user = null;
        state.authToken = '';
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        // history.navigate('/login');
    }
}

const createExtraReducer = (builder) => {
    builder.addCase(extraActions.login.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions.login.fulfilled, (state, action) => {
        state.loading = false
        state.authToken = action.payload.data.token;
        state.user = action.payload.data.user
        state.error = '';
        navigationRouter.navigate('/')
    })
    builder.addCase(extraActions.login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.authToken = '';
        state.error = action.error.message
    })
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: createReducers,
    extraReducers: createExtraReducer
});

// exports
export const authActions = { 
    ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;