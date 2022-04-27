import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState(true);

  const handleInputEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setPassword(target.value);
  };

  const searchOn = useCallback(() => {
    setSearch(true);
  });

  const searchOff = useCallback(() => {
    setSearch(false);
  });

  const context = {
    email,
    password,
    handleInputEmail,
    handleInputPassword,
    searchOn,
    search,
    searchOff,
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
