import React from 'react';
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Banner from "../components/Banner/Banner";
import Sneaker from "../components/Best-Sneaker/Sneaker";
function Home() {

  return (
    <>
        <NavBar />
        <Banner />
        <Sneaker />
        <Footer />
    </>
  )
}

export default Home