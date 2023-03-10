import React, { useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import MyContext from '../../context/MyContext';
import styles from './explore.module.css';

export default function ExploreFoods(props) {
  const { exploreRandom } = useContext(MyContext);
  return (
    <div>
      <Header { ...props } title="Explore Foods" dontShowSearchIcon />
      <form className={ styles.explore_container }>
        <button
          className={ styles.buttons }
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            const { history } = props;
            history.push('/explore/foods/ingredients');
          } }
        >
          By Ingredient

        </button>
        <button
          className={ styles.buttons }
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => {
            const { history } = props;
            history.push('/explore/foods/nationalities');
          } }
        >
          By Nationality

        </button>
        <button
          className={ styles.buttons }
          type="button"
          data-testid="explore-surprise"
          onClick={ async () => {
            const { history } = props;
            const result = await exploreRandom('https://www.themealdb.com/api/json/v1/1/random.php', 'meals');
            console.log(result);
            history.push(`/foods/${result.meals[0].idMeal}`);
          } }
        >
          Surprise me!

        </button>
      </form>
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  push: propTypes.func,
}.isRequired;
