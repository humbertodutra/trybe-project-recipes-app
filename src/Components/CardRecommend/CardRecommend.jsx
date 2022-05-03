import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardRecommend({ index, strMealOrDrink, strMealOrDrinkThumb, id, prevPath }) {
  return (
    <Link
      to={ `/${prevPath}/${id}` }
    >
      <img
        src={ strMealOrDrinkThumb }
        alt={ strMealOrDrink }
      />
      <h2 data-testid={ `${index}-recomendation-title` }>{strMealOrDrink}</h2>
    </Link>
  );
}

CardRecommend.propTypes = {
  index: propTypes.number,
  id: propTypes.number,
  strMeal: propTypes.string,
  strMealThumb: propTypes.string,
  prevPath: propTypes.string,
}.isRequired;

export default CardRecommend;
