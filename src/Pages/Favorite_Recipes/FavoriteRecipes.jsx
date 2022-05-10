import React, { useContext } from 'react';
import CardFavorite from '../../Components/CardFavorite/CardFavorite';
import Header from '../../Components/Header/Header';
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
        <div>
          <form>
            <button
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ filter }
            >
              All

            </button>
            <button
              type="button"
              data-testid="filter-by-food-btn"
              onClick={ () => filter('food') }
            >
              Food

            </button>
            <button
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ () => filter('drink') }
            >
              Drinks

            </button>
          </form>
          <ul>
            {
              verifyFilter().map((elem, index) => (
                <li key={ elem.id }>
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
