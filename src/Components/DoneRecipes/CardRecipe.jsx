import PropTypes from 'prop-types';
import React from 'react';

export default function CardRecipe({ index, image, nameRecipe }) {
  return (
    <section>
      <img
        src={ image }
        alt=""
        data-testid={ `${index}-horizontal-image` }
      />
      <h2>{nameRecipe}</h2>
    </section>
  );
}

CardRecipe.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  nameRecipe: PropTypes.string.isRequired,
};
