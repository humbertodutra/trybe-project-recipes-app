import React from 'react';
import propTypes from 'prop-types';

export default function CardIngredient({ strIngredient, idIngredient }) {
  console.log(idIngredient);
  return (
    <div data-testid={ `${idIngredient}-ingredient-card` }>
      <img
        src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
        alt=""
        data-testid={ `${idIngredient}-card-img` }
      />
      <h2 data-testid={ `${idIngredient}-card-name` }>{strIngredient}</h2>
    </div>
  );
}

CardIngredient.propTypes = {
  strIngredient: propTypes.string,
  idIngredient: propTypes.string,
}.isRequired;
