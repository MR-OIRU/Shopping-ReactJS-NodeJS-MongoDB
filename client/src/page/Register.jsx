import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Form_Register from '../components/Register/Form_Register';
import BannerRegister from '../components/Banner/BannerRegister';

import axios from 'axios'

function Register() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  
  useEffect(()=>{
    axios.get(`${url}register`).then((res) => {
        if(res.data.message === 'Role : User'){
          navigate('/member')
        }else{
          navigate('/admin')
        }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  },[]);
  return (
    <div>
      <NavBar />
      <BannerRegister/>
      <Form_Register />
      <Footer />
    </div>
  )
}

export default Register