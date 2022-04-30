import React, { useContext } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';

function CardCategories(props) {
  const { categoryName, title, selectedCategory, setSelectedCategory } = props;
  const {
    getRecipesByCategory,
    getAllRecipes,
  } = useContext(MyContext);

  const tagConvert = { Foods: 'meals', Drinks: 'drinks' };

  return (
    <button
      data-testid={ `${categoryName}-category-filter` }
      type="button"
      onClick={ () => {
        if (categoryName === 'All') {
          getAllRecipes(tagConvert[title]);
        } else {
          getRecipesByCategory(categoryName, tagConvert[title]);
        }
        if (categoryName === selectedCategory) {
          setSelectedCategory('All');
          getAllRecipes(tagConvert[title]);
        } else {
          setSelectedCategory(categoryName);
        }
      } }
    >
      {categoryName}
    </button>
  );
}

CardCategories.propTypes = {
  categoryName: propTypes.string,
}.isRequired;

export default CardCategories;
