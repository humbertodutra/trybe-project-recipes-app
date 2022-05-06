import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer/Footer';
import ProfileComponenet from '../../Components/ProfileComponent';

export default function Profile(props) {
  return (
    <div>
      <Header { ...props } title="Profile" dontShowSearchIcon />
      <ProfileComponenet />
      <Footer />
    </div>
  );
}
