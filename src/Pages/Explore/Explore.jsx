import React from 'react';
import propTypes from 'prop-types';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import styles from './explore.module.css';

export default function Explore(props) {
  return (
    <div>
      <Header { ...props } title="Explore" dontShowSearchIcon />
      <form className={ styles.explore_container }>
        <button
          className={ styles.buttons }
          type="button"
          data-testid="explore-foods"
          onClick={ () => {
            const { history } = props;
            history.push('/explore/foods');
          } }
        >
          <h2>Explore Foods</h2>

        </button>
        <button
          className={ styles.buttons }
          type="button"
          data-testid="explore-drinks"
          onClick={ () => {
            const { history } = props;
            history.push('/explore/drinks');
          } }
        >
          <h2>Explore Drinks</h2>

        </button>
      </form>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  push: propTypes.func,
}.isRequired;
