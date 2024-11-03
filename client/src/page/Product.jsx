import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import BannerProduct from '../components/Banner/BannerProduct'
import SelectProduct from '../components/Product/SelectProduct'
import ShowProduct from '../components/Product/ShowProduct'
import Footer from '../components/Footer/Footer'

import '../assets/css/Product.css'
function Product() {
  return (
    <>
        <NavBar />
        <BannerProduct />
        <SelectProduct />
        <ShowProduct />
        <Footer />
    </>
  )
}

export default Product