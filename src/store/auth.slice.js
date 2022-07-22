import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    // initialize state from local storage to enable user to stay logged in
    authToken: JSON.parse(localStorage.getItem('authToken')),
    user: JSON.parse(localStorage.getItem('user')),
    error: '',
    loading: false
};

// Generates pending, fulfilled and rejected action types
const callLogin = ({ email, password}) => {
    return createAsyncThunk('auth/login', () => {
        const url = `${process.env.REACT_APP_BASE_URL}/login-recipe`;
        const data = {
            email, password
        }
        return axios
          .post(url, data,)
          .then(response => response.data.map(user => user.id))
    })
}

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
              .post(url, data,)
              .then(response => response.data.map(user => user.id))
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
        state.authToken = 'isCalled'
    })
    builder.addCase(extraActions.login.fulfilled, (state, action) => {
        state.loading = false
        state.authToken = 'isFullFilled';
        state.users = action.payload
        state.error = ''
    })
    builder.addCase(extraActions.login.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.authToken = 'isError';
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