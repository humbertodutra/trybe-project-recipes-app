import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer/Footer';

export default function ExploreFoodsIngredients(props) {
  return (
    <div>
      <Header { ...props } title="Explore Ingredients" dontShowSearchIcon />
      <Footer />
    </div>
  );
}
