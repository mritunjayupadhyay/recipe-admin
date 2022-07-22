import React, { useState } from 'react';
import './auth-form.scss';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/index';

function Login() {
    const dispatch = useDispatch();
    const authUserToken = useSelector(x => x.auth.authToken);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const submitFunc = () => {
        console.log(email, password);
        console.log("auth actions", authActions);
        return dispatch(authActions.login({ email, password }));
    }
    return (
        <form className='AuthFormComponent'>
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
            <p>{authUserToken}</p>
        </form>
    );
}

export default Login;
