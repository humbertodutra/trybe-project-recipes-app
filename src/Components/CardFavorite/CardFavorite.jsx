import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import share from '../../images/shareIcon.svg';
import deslike from '../../images/blackHeartIcon.svg';
import MyContext from '../../context/MyContext';
import styles from './CardFavorite.module.css';

const copy = require('clipboard-copy');

export default function CardFavorite(
  { image, title, category, nationality, alcoholic, type, index, id },
) {
  const { unfavoriteRecipe } = useContext(MyContext);

  const copied = async () => {
    const url = `http://localhost:3000/${type}s/${id}`;
    copy(url);
    global.alert('Link copied!');
  };

  // const route = () => {
  //   history.push(`/${type}s/${id}`);
  // };

  return (
    <div>
      <Link to={ `/${type}s/${id}` } className={ styles.linkImg }>
        <img
          src={ image }
          alt={ title }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>{ title }</h1>
      </Link>
      {type === 'drink' ? (
        <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholic }</p>
      ) : (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${nationality} - ${category}` }

        </p>)}
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ share }
        onClick={ copied }
      >
        <img src={ share } alt="profileIcon" />

      </button>
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ deslike }
        onClick={ () => unfavoriteRecipe(id) }
      >
        <img src={ deslike } alt="profileIcon" />
      </button>
    </div>
  );
}

CardFavorite.propTypes = {
  image: propTypes.string,
  title: propTypes.string,
  categoryOrAlcool: propTypes.string,
  component: propTypes.string,
}.isRequired;
