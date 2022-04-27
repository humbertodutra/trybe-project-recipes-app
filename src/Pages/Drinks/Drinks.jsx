import React, { useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';
import Footer from '../../Components/Footer/Footer';

export default function Drinks(props) {
  const { searchOn } = useContext(MyContext);
  useEffect(() => {
    searchOn();
  }, [searchOn]);

  return (
    <div>
      <Header { ...props } title="Drinks" />
      <Footer />
    </div>
  );
}
