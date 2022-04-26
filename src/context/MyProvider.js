import React, { useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setPassword(target.value);
  };

  const context = {
    email,
    password,
    handleInputEmail,
    handleInputPassword,
  };
  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: propTypes.objectOf,
}.isRequired;

export default MyProvider;
