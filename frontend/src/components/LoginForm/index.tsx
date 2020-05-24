import React, { useState, useEffect } from 'react';
import { login } from '../../services/loginServices';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await login(username, password);

      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   console.log(token);
  // }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        type='text'
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};

export default LoginForm;
