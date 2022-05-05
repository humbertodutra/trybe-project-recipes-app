import React from 'react';
import propTypes from 'prop-types';
// import MyContext from '../../context/MyContext';
// import { fetchDrinksRecipes } from '../../service/getIngredients';

export default function CardDrinkIngredient({ strIngredient, idIngredient }) {
  return (
    <div data-testid={ `${idIngredient}-ingredient-card` }>
      <img
        src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient}-Small.png` }
        alt=""
        data-testid={ `${idIngredient}-card-img` }
      />
      <h2 data-testid={ `${idIngredient}-card-name` }>{strIngredient}</h2>
    </div>
  );
}

CardDrinkIngredient.propTypes = {
  strIngredient: propTypes.string,
  idIngredient: propTypes.string,
}.isRequired;
