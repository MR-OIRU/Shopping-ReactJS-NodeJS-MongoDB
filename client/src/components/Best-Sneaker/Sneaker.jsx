import React, { useEffect, useState } from 'react';
import {Container} from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';

import 'swiper/css';
import '../../assets/css/Sneaker.css';

const Sneaker = () => {
    const url = import.meta.env.VITE_API_URL;
    const [data,setData] = useState([]);
    useEffect(() =>{
        axios.get(`${url}`).then((res) => {
            setData(res.data)
        }).catch((err) => console.log(err))
    },[]);
  return (
    <div className="custom-best">
    <Container>
    <div className="header">
            <h1>Top 10 Best Sneaker</h1>
        </div>
        <div className="best-sneaker">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  
                }}
                modules={[Autoplay]}
                breakpoints={{
                    768: {
                        slidesPerView: 3
                    }
                }}
            >
            {
                data.map((item,index) =>(
                    <SwiperSlide key={index}>
                        <div className="sneaker mt-5">
                            <img src={`/image/product/${item.ProductImage}`} alt=""/>
                            <div className="brand mt-5">{item.brand.length > 0 
                                                        ? item.brand[0].BrandName.charAt(0).toUpperCase() + item.brand[0].BrandName.slice(1).toLowerCase()
                                                        : "Unknown Brand"}</div>
                            <div className="name mt-3">{item.ProductName}</div>
                            <div className="price mt-3">฿ {Number(item.SellPrice).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
                        </div>
                </SwiperSlide>
                ))
            }
            </Swiper>
        </div>
    </Container>
    </div>
  )
}

export default Sneaker