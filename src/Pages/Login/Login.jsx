import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import { AiOutlineMail } from '@react-icons/all-files/ai/AiOutlineMail';
import { RiLockPasswordFill } from '@react-icons/all-files/ri/RiLockPasswordFill';
import MyContext from '../../context/MyContext';
import styles from './login.module.css';

function Login({ history }) {
  const {
    email, password, handleInputEmail, handleInputPassword,
  } = useContext(MyContext);
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    const minLength = 6;
    const validRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!email.match(validRegex) || password.length <= minLength) {
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
    <section className={ styles.container }>
      <div className={ styles.login_area }>
        <div>
          <h1>Login</h1>
        </div>

        <form className={ styles.form } onSubmit={ onSubmit }>
          <div className={ styles.div_input }>
            <input
              type="email"
              data-testid="email-input"
              name="email"
              className={ styles.inputs }
              value={ email }
              placeholder="Email"
              onChange={ (e) => {
                handleInputEmail(e);
              } }
            />
            <AiOutlineMail />
            <hr />
          </div>

          <div className={ styles.div_input }>
            <input
              type="password"
              data-testid="password-input"
              name="password"
              className={ styles.inputs }
              value={ password }
              placeholder="Password"
              onChange={ (e) => {
                handleInputPassword(e);
              } }
            />
            <RiLockPasswordFill />
            <hr />
          </div>

          <div className={ styles.div_button }>
            <button
              type="submit"
              data-testid="login-submit-btn"
              className={ styles.button }
              disabled={ buttonDisable }
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </section>

  );
}

Login.propTypes = {
  history: propTypes.shape,
}.isRequired;

export default Login;
