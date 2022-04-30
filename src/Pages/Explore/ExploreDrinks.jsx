import React, { useContext, useEffect } from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';

export default function ExploreDrinks(props) {
  const { searchOff } = useContext(MyContext);
  useEffect(() => {
    searchOff();
  }, [searchOff]);
  return (
    <div>
      <Header { ...props } title="Explore Drinks" dontShowSearchIcon />
      <Footer />
    </div>
  );
}
