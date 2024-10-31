import React,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import NavBarAdmin from '../../components/Admin/NavBarAdmin';
import Member from '../../components/Admin/Member/Member';

import '../../assets/css/Admin/Admin.css'

const AdminMember = () => {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true

  useEffect(()=>{
      axios.get(`${url}admin/member`).then((res) => {
        if(res.data === ''){
          navigate('/')
        }else if(res.data.Role === 'User'){
          navigate('/member')
        }else{
          navigate('/admin/member')
        }
      }).catch((error) => {
          console.error("Error fetching data:", error);
      });
    },[]);
    
  return (
    <>
        <div className="LayoutAdmin">
            <NavBarAdmin/>
            <Member />
        </div>
    </>
  )
}

export default AdminMember