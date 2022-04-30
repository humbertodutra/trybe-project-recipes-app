import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';

export default function Explore(props) {
  const { searchOff } = useContext(MyContext);
  useEffect(() => {
    searchOff();
  }, [searchOff]);

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
