import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import NationalitesComponent from '../../Components/Nationalites/NationalitesComponent';

export default function ExploreFoodsNationalities(props) {
  return (
    <div>
      <Header { ...props } title="Explore Nationalities" />
      <NationalitesComponent />
      <Footer />
    </div>
  );
}
