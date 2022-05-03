import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';

export default function CardIngredient({ strIngredient, index: idIngredient }) {
  const { fetchPhotoIngredient } = useContext(MyContext);
  // useEffect(() => {
  //   ;
  // }, []);

  return (
    // <div data-testid={ `${index}-ingredient-card` }>
    <img
      src={() => fetchPhotoIngredient(strIngredient)}
      alt=""
      data-testid={ `${index}-card-img` }
    />
    //   <h2 data-testid={ `${index}-card-name` }>nome do ingrediente</h2>
    // </div>
  );
}

CardIngredient.propTypes = {
  strIngredient: propTypes.string,
  idIngredient: propTypes.string,
}.isRequired;
