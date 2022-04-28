import React from 'react';
import propTypes from 'prop-types';

export default function CardRecipes({ index, strMeal, strMealThumb }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{strMeal}</h2>
    </section>
  );
}

CardRecipes.propTypes = {
  index: propTypes.number,
  strMeal: propTypes.string,
  strMealThumb: propTypes.string,
}.isRequired;
