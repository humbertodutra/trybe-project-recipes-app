import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputSearch, setinputSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [search, setSearch] = useState(true);

  const handleRadio = ({ target }) => {
    setRadio(target.value);
  };

  const handleInputSearch = ({ target }) => {
    setinputSearch(target.value);
  };

  const handleInputEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setPassword(target.value);
  };

  // const getApiFood = async (url) => {
  //   const request = await fetch(url);
  //   const data = await request.json();
  //   return data;
  // };

  // const getApiFood = () => {
  //   switch(radio) {
  //     case "ingredient": {

  //     }
  //   }
  // }

  const searchOn = useCallback(() => {
    setSearch(true);
  }, []);

  const searchOff = useCallback(() => {
    setSearch(false);
  }, []);

  const context = {
    email,
    password,
    handleInputEmail,
    handleInputPassword,
    searchOn,
    search,
    searchOff,
    inputSearch,
    radio,
    handleInputSearch,
    handleRadio,
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
