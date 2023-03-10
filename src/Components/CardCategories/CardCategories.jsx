import React, { useContext } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';
import styles from './CardCategories.module.css';

function CardCategories(props) {
  const { categoryName, title, selectedCategory, setSelectedCategory } = props;
  const {
    getRecipesByCategory,
    originalRecipes,
    setRecipes,
  } = useContext(MyContext);

  const tagConvert = { Foods: 'meals', Drinks: 'drinks' };

  return (
    <button
      data-testid={ `${categoryName}-category-filter` }
      className={ styles[selectedCategory === categoryName ? 'selected' : 'unselected'] }
      type="button"
      onClick={ () => {
        if (categoryName === selectedCategory || categoryName === 'All') {
          setSelectedCategory('All');
          setRecipes(originalRecipes);
        } else {
          setSelectedCategory(categoryName);
          getRecipesByCategory(categoryName, tagConvert[title]);
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
