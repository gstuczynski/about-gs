import React, { Component } from 'react';
import config from '../../config';

let email, password;

const LoginForm = ({ onLogin, onLogout }) => (
  <div>
    <form
      onSubmit={evt => {
        evt.preventDefault();
        onLogin(email.value, password.value);
      }}>
      <input name="email" type="email" ref={el => (email = el)} />
      <input type="password" ref={el => (password = el)} />
      <input type="submit" />
    </form>
    <button onClick={onLogout}>Logout</button>
  </div>
);

export default LoginForm;
