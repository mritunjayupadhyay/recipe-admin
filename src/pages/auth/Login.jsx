import React, { useState } from 'react';
import './auth-form.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const submitFunc = () => {
        console.log(email, password);
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
        </form>
    );
}

export default Login;
