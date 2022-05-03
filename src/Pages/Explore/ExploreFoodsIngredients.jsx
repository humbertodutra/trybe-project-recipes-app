import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer/Footer';
import MyContext from '../../context/MyContext';
import CardIngredient from '../../Components/CardIngredient/CardIngredient';

export default function ExploreFoodsIngredients(props) {
  const { fetchIngredients } = useContext(MyContext);
  const [arrIgredients, setArrIgredients] = useState([]);

  useEffect(() => {
    const addIngredients = async () => {
      const returnIngredients = await fetchIngredients();
      setArrIgredients(returnIngredients);
    };
    addIngredients();
  }, []);

  useEffect(() => {
    console.log(arrIgredients);
  }, [arrIgredients]);

  return (
    <div>
      <Header { ...props } title="Explore Ingredients" dontShowSearchIcon />
      {arrIgredients.length !== 0 && arrIgredients.map(
        ({ strIngredient, idIngredient }) => (
          <CardIngredient key={ idIngredient } strIngredient={ strIngredient } />
        ),
      )}
      <Footer />
    </div>
  );
}
