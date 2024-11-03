import React,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useUsername } from '../components/CartContext';
import NavBar from '../components/NavBar/NavBar'
import BannerCheckOut from '../components/Banner/BannerCheckOut'
import CheckOutData from '../components/Checkout/CheckOutData'
import Footer from '../components/Footer/Footer'

import axios from 'axios'

import '../assets/css/CheckOut.css'
function CheckOut() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const { setUsername } = useUsername();
  useEffect(()=>{
    axios.get(`${url}cart/checkout`).then((res) => {
      setUsername(res.data.Username)
      if(res.data === ''){
        navigate('/login')
      }else if(res.data.Role === 'Admin'){
        navigate('/admin')
      }else{
        navigate('/cart/checkout')
      }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  },[]);

  return (
    <>  
        <NavBar/>
        <BannerCheckOut/>
        <CheckOutData/>
        <Footer/>
    </>
  )
}

export default CheckOut