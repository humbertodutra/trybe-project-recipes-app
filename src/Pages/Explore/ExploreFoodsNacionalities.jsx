import React, { useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';

export default function ExploreFoodsNationalities() {
  const { searchOn } = useContext(MyContext);
  useEffect(() => {
    searchOn();
  }, [searchOn]);

  return (
    <div>
      <Header title="Explore Nationalities" />
    </div>
  );
}
