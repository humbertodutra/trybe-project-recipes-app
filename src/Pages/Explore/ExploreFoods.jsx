import React, { useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer/Footer';
import MyContext from '../../context/MyContext';

export default function ExploreFoods(props) {
  const { searchOff } = useContext(MyContext);
  useEffect(() => {
    searchOff();
  }, [searchOff]);
  return (
    <div>
      <Header { ...props } title="Explore Foods" dontShowSearchIcon />
      <Footer />
    </div>
  );
}
