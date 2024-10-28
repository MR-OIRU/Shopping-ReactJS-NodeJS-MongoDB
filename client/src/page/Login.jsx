import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Form_Login from '../components/Login/Form_Login';
import BannerLogin from '../components/Banner/BannerLogin';

import axios from 'axios'

function Login() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  useEffect(()=>{
    axios.get(`${url}login`).then((res) => {
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
        <BannerLogin/>
        <Form_Login />
        <Footer />
      </div>
    );
}

export default Login