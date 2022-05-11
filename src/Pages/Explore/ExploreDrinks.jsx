import React, { useContext } from 'react';
import propTypes from 'prop-types';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../context/MyContext';
import styles from './explore.module.css';

export default function ExploreDrinks(props) {
  const { exploreRandom } = useContext(MyContext);
  return (
    <div>
      <Header { ...props } title="Explore Drinks" dontShowSearchIcon />
      <form className={ styles.explore_container }>
        <button
          className={ styles.buttons }
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            const { history } = props;
            history.push('/explore/drinks/ingredients');
          } }
        >
          By Ingredient

        </button>
        <button
          className={ styles.buttons }
          type="button"
          data-testid="explore-surprise"
          onClick={ async () => {
            const { history } = props;
            const result = await exploreRandom('https://www.thecocktaildb.com/api/json/v1/1/random.php', 'drinks');
            history.push(`/drinks/${result.drinks[0].idDrink}`);
          } }
        >
          Surprise me!

        </button>
      </form>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  push: propTypes.func,
}.isRequired;
