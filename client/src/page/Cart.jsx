import React,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useUsername } from '../components/CartContext';
import NavBar from '../components/NavBar/NavBar'
import BannerCart from '../components/Banner/BannerCart'
import CartData from '../components/Cart/CartData'
import Footer from '../components/Footer/Footer'

import axios from 'axios'

import '../assets/css/Cart.css'

function Cart() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const { setUsername } = useUsername();
  useEffect(()=>{
    axios.get(`${url}cart`).then((res) => {
      setUsername(res.data.Username)
      if(res.data === ''){
        navigate('/login')
      }else if(res.data.Role === 'Admin'){
        navigate('/admin')
      }else{
        navigate('/cart')
      }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  },[]);
  return (
    <>  
        <NavBar/>
        <BannerCart/>
        <CartData/>
        <Footer/>
    </>
  )
}

export default Cart