import PropTypes from 'prop-types';
import React from 'react';
import uniqid from 'uniqid';
import shareIcon from '../../images/shareIcon.svg';

export default function CardRecipe({
  image, name, doneDate, tagName, type, category, alcoholicOrNot, index, nationality,
}) {
  return (
    <section>
      {type === 'comida' ? (
        <>
          <img
            src={ image }
            width="50%"
            alt="Imagem da receita"
            data-testid={ `${index}-horizontal-image` }
          />
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${nationality} - ${category}`}
          </span>
          <img
            src={ shareIcon }
            alt="Ícone de compartilhamento"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <p data-testid={ `${index}-horizontal-done-date` }>{`Done in: ${doneDate}`}</p>
          {tagName && tagName.map((tag) => (
            <button
              key={ uniqid() }
              type="button"
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </button>
          ))}
        </>
      ) : (
        <>
          <img
            src={ image }
            width="50%"
            alt="Imagem da receita"
            data-testid={ `${index}-horizontal-image` }
          />
          <span data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</span>
          <img
            src={ shareIcon }
            alt="Ícone de compartilhamento"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <p data-testid={ `${index}-horizontal-done-date` }>{`Done in: ${doneDate}`}</p>
          {tagName && tagName.map((etag) => (
            <button
              key={ uniqid() }
              type="button"
              data-testid={ `${index}-${etag}-horizontal-tag` }
            >
              {etag}
            </button>
          ))}
        </>
      )}
    </section>
  );
}

CardRecipe.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  tagName: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};
