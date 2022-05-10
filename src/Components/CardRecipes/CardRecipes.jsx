import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './CardRecipes.module.css';

function CardRecipes({ index, strMealOrDrink, strMealOrDrinkThumb, id, prevPath }) {
  return (
    <Link
      className={ styles.card_recipe }
      data-testid={ `${index}-recipe-card` }
      to={ `/${prevPath}/${id}` }
    >
      <img
        src={ strMealOrDrinkThumb }
        alt={ strMealOrDrink }
        data-testid={ `${index}-card-img` }
        className={ styles.recipeCard }
      />
      <h2 data-testid={ `${index}-card-name` }>{strMealOrDrink}</h2>
    </Link>
  );
}

CardRecipes.propTypes = {
  index: propTypes.number,
  id: propTypes.number,
  strMeal: propTypes.string,
  strMealThumb: propTypes.string,
  prevPath: propTypes.string,
}.isRequired;

export default CardRecipes;
