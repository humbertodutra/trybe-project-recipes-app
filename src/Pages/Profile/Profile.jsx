import React, { useContext, useEffect } from 'react';
import MyContext from '../../context/MyContext';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer/Footer';

export default function Profile(props) {
  const { searchOff } = useContext(MyContext);
  useEffect(() => {
    searchOff();
  }, [searchOff]);
  return (
    <div>
      <Header { ...props } title="Profile" />
      <Footer />
    </div>
  );
}
