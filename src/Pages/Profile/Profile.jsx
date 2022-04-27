import React, { useContext, useEffect } from 'react';
import MyContext from '../../context/MyContext';
import Header from '../../Components/Header';

export default function Profile(props) {
  const { searchOff } = useContext(MyContext);
  useEffect(() => {
    searchOff();
  }, [searchOff]);
  return (
    <div>
      <Header { ...props } title="Profile" />
    </div>
  );
}
