import React,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import NavbarMember from '../../components/Member/NavbarMember';
import ProfileData from '../../components/Member/ProfileData';
import axios from 'axios'

import '../../assets/css/Member/Member.css'

function Member() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true

  useEffect(()=>{
    axios.get(`${url}member`).then((res) => {
      if(res.data === ''){
        navigate('/login')
      }else if(res.data.Role === 'User'){
        navigate('/member')
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
        <ProfileData/>
      </div>
    </>
  );
};

export default Member;