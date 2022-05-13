import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './CardRecommend.module.css';

function CardRecommend({ index, strMealOrDrink, strMealOrDrinkThumb, id, prevPath }) {
  return (
    <Link
      to={ `/${prevPath}/${id}` }
    >
      <div
        className={ styles.card_recipe }
      >
        <img
          src={ strMealOrDrinkThumb }
          alt={ strMealOrDrink }
          className={ styles.recommend_image }
        />
        <h2
          data-testid={ `${index}-recomendation-title` }
          className={ styles.title_recommend }
        >
          {strMealOrDrink}

        </h2>
      </div>

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
