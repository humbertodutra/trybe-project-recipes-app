import React, { useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';

export default function Foods(props) {
  const { searchOn } = useContext(MyContext);
  useEffect(() => {
    searchOn();
  }, [searchOn]);

  return (
    <div>
      <Header { ...props } title="Foods" />
    </div>
  );
}
