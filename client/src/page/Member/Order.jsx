import React,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import NavbarMember from '../../components/Member/NavbarMember';
import OrderData from '../../components/Member/OrderData';

import axios from 'axios'

import '../../assets/css/Member/Member.css'
function Order() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  useEffect(()=>{
    axios.get(`${url}member/order`).then((res) => {
      if(res.data === ''){
        navigate('/login')
      }else if(res.data.Role === 'User'){
        navigate('/member/order')
      }else{
        navigate('/admin')
      }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  },[]);
  return (
    <>
      <div className="LayoutMember">
        <NavbarMember/>
        <OrderData/>
      </div>
    </>
  )
}

export default Order