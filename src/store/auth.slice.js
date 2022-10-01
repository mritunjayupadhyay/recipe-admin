import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { defaultError } from '../app.constant';
import { navigationRouter } from '../helpers/navigation-router';
const initialState = {
    // initialize state from local storage to enable user to stay logged in
    authToken: localStorage.getItem('authToken'),
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
              .catch((error) => {
                const errorData = error?.response?.data || defaultError;
                console.log("we got some error", errorData);
                return errorData;
            } )
        })
    }
}

const extraActions = createExtraActions();

function createReducers() {
    return {
        logout,
        removeError
    };

    function logout(state) {
        state.user = null;
        state.authToken = '';
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        navigationRouter.navigate('/login');
    }
    function removeError(state) {
        state.error = '';
    }
}

const createExtraReducer = (builder) => {
    builder.addCase(extraActions.login.pending, state => {
        state.loading = true;
    })
    builder.addCase(extraActions.login.fulfilled, (state, action) => {
        const { data, error, message } = action.payload;
        if (error === false) {
            state.loading = false
            state.authToken = data?.token;
            state.user = data?.user;
            state.error = '';
            localStorage.setItem('authToken', action.payload.data.token);
            localStorage.setItem('user', JSON.stringify(action.payload.data.user));
            navigationRouter.navigate('/');
        } else {
            state.loading = false;
            state.user = null;
            state.authToken = '';
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            state.error = message;
        }
        
    })
    builder.addCase(extraActions.login.rejected, (state, action) => {
        const { message } = action.payload;
        state.loading = false;
        state.user = null;
        state.authToken = '';
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        state.error = message;
    })
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: createReducers(),
    extraReducers: createExtraReducer
});

// exports
export const authActions = { 
    ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;