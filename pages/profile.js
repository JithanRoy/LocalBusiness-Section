import React from 'react';
import MyProfile from '../components/common/MyProfile/MyProfile';
import Footer from '../components/Layout/Footer/Footer';
import Navbar from '../components/Layout/Navbar/Navbar';

const profile = () => {
  return (
    <div>
      <Navbar />
      <MyProfile />
      <Footer />
    </div>
  );
};

export default profile;
