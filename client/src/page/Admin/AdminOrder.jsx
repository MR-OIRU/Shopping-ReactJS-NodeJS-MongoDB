import React,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import NavBarAdmin from '../../components/Admin/NavBarAdmin';
import Order from '../../components/Admin/Order/Order';

import '../../assets/css/Admin/Admin.css'

function AdminOrder() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true

  useEffect(()=>{
      axios.get(`${url}admin/order`).then((res) => {
        if(res.data === ''){
          navigate('/')
        }else if(res.data.Role === 'User'){
          navigate('/member')
        }else{
          navigate('/admin/order')
        }
      }).catch((error) => {
          console.error("Error fetching data:", error);
      });
    },[]);
    
  return (
    <>
      <div className="LayoutAdmin">
        <NavBarAdmin/>
        <Order/>
      </div>
    </>
  );
};

export default AdminOrder;