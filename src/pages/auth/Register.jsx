import React, { useState } from 'react';
import './auth-form.scss';

function Register() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('')
  const submitFunc = () => {
    console.log(email, password);
  }
  return (
    <form className='AuthFormComponent'>
      <input
        type="text"
        value={firstName}
        placeholder="text"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        placeholder="text"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={mobile}
        placeholder="text"
        onChange={(e) => setMobile(e.target.value)}
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
  )
}

export default Register;