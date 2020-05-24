import React, { useState, useEffect } from 'react';
import { createUser } from '../../services/userServices';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await createUser(username, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Username
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      Password
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default RegisterForm;
