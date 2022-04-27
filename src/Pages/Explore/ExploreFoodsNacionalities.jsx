import React, { useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';

export default function ExploreFoodsNationalities(props) {
  const { searchOn } = useContext(MyContext);
  useEffect(() => {
    searchOn();
  }, [searchOn]);

  return (
    <div>
      <Header { ...props } title="Explore Nationalities" />
    </div>
  );
}
