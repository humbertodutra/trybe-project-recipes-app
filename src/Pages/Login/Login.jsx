import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';

function Login({ history }) {
  const {
    email, password, handleInputEmail, handleInputPassword,
  } = useContext(MyContext);
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    const minLength = 6;
    const validRegex = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (!email.match(validRegex) || password.length < minLength) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [email, password]);

  const onSubmit = (e) => {
    e.preventDefault();
    setButtonDisable(false);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={ onSubmit }>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          placeholder="Email"
          onChange={ (e) => {
            handleInputEmail(e);
          } }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          placeholder="Password"
          onChange={ (e) => {
            handleInputPassword(e);
          } }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ buttonDisable }
        >
          Enter
        </button>
      </form>
    </>

  );
}

Login.propTypes = {
  history: propTypes.shape,
}.isRequired;

export default Login;
