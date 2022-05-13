import React, { useContext } from 'react';
import CardFavorite from '../../Components/CardFavorite/CardFavorite';
import Header from '../../Components/Header/Header';
import styles from './favorite-recipes.module.css';
import MyContext from '../../context/MyContext';

export default function FavoriteRecipes(props) {
  const { filter, filterFavorite } = useContext(MyContext);

  const verifyFilter = () => {
    if (filterFavorite.length) return filterFavorite;
    return filter();
  };

  return (
    <div>
      <Header { ...props } title="Favorite Recipes" dontShowSearchIcon />
      { verifyFilter() && (
        <div className={ styles.container }>
          <form className={ styles.form }>
            <button
              type="button"
              data-testid="filter-by-all-btn"
              className={ styles.button }
              onClick={ filter }
            >
              All

            </button>
            <button
              type="button"
              data-testid="filter-by-food-btn"
              className={ styles.button }
              onClick={ () => filter('food') }
            >
              Food

            </button>
            <button
              type="button"
              data-testid="filter-by-drink-btn"
              className={ styles.button }
              onClick={ () => filter('drink') }
            >
              Drinks

            </button>
          </form>
          <ul className={ styles.ul }>
            {
              verifyFilter().map((elem, index) => (
                <li key={ elem.id } className={ styles.li }>
                  <CardFavorite
                    image={ elem.image }
                    type={ elem.type }
                    nationality={ elem.nationality }
                    category={ elem.category }
                    alcoholic={ elem.alcoholicOrNot }
                    title={ elem.name }
                    index={ index }
                    id={ elem.id }
                    { ...props }
                  />
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}
