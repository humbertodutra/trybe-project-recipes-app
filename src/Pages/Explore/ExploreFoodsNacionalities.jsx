import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header';
import NationalitesComponent from '../../Components/Nationalites/NationalitesComponent';

export default function ExploreFoodsNationalities(props) {
  return (
    <div>
      <Header { ...props } title="Explore Nationalities" />
      <p> oiiii </p>
      <NationalitesComponent />
      <Footer />
    </div>
  );
}
