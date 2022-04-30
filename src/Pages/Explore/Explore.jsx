import React from 'react';
import propTypes from 'prop-types';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header';

export default function Explore(props) {
  return (
    <div>
      <Header { ...props } title="Explore" dontShowSearchIcon />
      <form>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => {
            const { history } = props;
            history.push('/explore/foods');
          } }
        >
          Explore Foods

        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => {
            const { history } = props;
            history.push('/explore/drinks');
          } }
        >
          Explore Drinks

        </button>
      </form>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  push: propTypes.func,
}.isRequired;
