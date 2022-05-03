import React, { useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer/Footer';
import MyContext from '../../context/MyContext';

export default function ExploreFoodsIngredients(props) {
  const { fetchIngredients, fetchPhotoIngredient } = useContext(MyContext);

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <Header { ...props } title="Explore Ingredients" dontShowSearchIcon />
      {/* <CardIngredient /> */}
      <Footer />
    </div>
  );
}
