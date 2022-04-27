import React, { useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';

export default function Explore(props) {
  const { searchOff } = useContext(MyContext);
  useEffect(() => {
    searchOff();
  }, [searchOff]);

  return (
    <div>
      <Header { ...props } title="Explore" />
    </div>
  );
}
