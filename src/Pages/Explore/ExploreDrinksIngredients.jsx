import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header';

export default function ExploreDrinksIngredients(props) {
  return (
    <div>
      <Header { ...props } title="Explore Ingredients" dontShowSearchIcon />
      <Footer />
    </div>
  );
}
