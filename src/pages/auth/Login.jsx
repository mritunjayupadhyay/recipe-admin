import React, { useState } from 'react';
import './auth-form.scss';
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/index';

function Login() {
    const dispatch = useDispatch();
    const { error } = useSelector(x => x.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const submitFunc = () => {
        console.log(email, password);
        console.log("auth actions", authActions);
        return dispatch(authActions.login({ email, password }));
    }
    if (error) {
        Swal.fire({
          title: error,
          icon: 'error',
          confirmButtonText: 'OK',
        })
        .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              dispatch(authActions.removeError());
            }
        });
    }
    return (
        <form className='AuthFormComponent'>
            <h1>Login Panel</h1>
            <p>Please enter the Login credential to proceed</p>
            <input 
            type="text" 
            value={email}  
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type="password" 
            value={password} 
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <button 
            type='button' 
            className={`submitButton`} 
            onClick={() => submitFunc()}
            >Login</button>
        </form>
    );
}

export default Login;
