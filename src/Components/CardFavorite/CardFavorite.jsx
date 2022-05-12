import React, { useContext, useState } from 'react';
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
  const [copiedLink, setcopiedLink] = useState(false);

  const copied = () => {
    const url = `http://localhost:3000/${type}s/${id}`;
    copy(url);
    setcopiedLink(true);
  };

  return (
    <div className={ styles.card }>
      <section className={ styles.card_recipe }>
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
        <section className={ styles.share }>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ share }
            onClick={ copied }
          >
            <img src={ share } alt="profileIcon" />

          </button>
          {copiedLink && <span>Link copied!</span>}
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ deslike }
            onClick={ () => unfavoriteRecipe(id) }
          >
            <img src={ deslike } alt="profileIcon" />
          </button>
        </section>
      </section>
    </div>
  );
}

CardFavorite.propTypes = {
  image: propTypes.string,
  title: propTypes.string,
  categoryOrAlcool: propTypes.string,
  component: propTypes.string,
}.isRequired;
