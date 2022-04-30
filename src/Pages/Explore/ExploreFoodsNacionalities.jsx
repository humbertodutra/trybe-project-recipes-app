import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header';

export default function ExploreFoodsNationalities(props) {
  return (
    <div>
      <Header { ...props } title="Explore Nationalities" />
      <Footer />
    </div>
  );
}
