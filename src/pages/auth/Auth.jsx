import React from 'react'
import Login from './Login';
import './auth.scss';
function Auth() {
  return (
    <div className='AuthPage'>
        <div className='auth-page-container'>
            {/* <div className='header-button-container'>
                <button type='button' className={`loginButton ${isLogin ? 'active' : ''}`} onClick={() => setLogin(true)}>Login</button>
                <button type='button' className={`registerButton ${isLogin ? '' : 'active'}`} onClick={() => setLogin(false)}>Register</button>
            </div> */}
            <div className='formContainer'>
              <Login />   
            </div>
        </div>
    </div>
  )
}

export default Auth;