import React, { useEffect, useState } from 'react';
import {Container} from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import '../../assets/css/Sneaker.css';

const Sneaker = () => {
    const [data,setData] = useState([]);
    useEffect(() =>{
        fetch('/public/json/product.json')
        .then(response => response.json())
        .then(data => setData(data.allProduct));
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
                  delay: 2500,
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
                data.map((product) =>(
                    <SwiperSlide key={product.id}>
                    <div className="sneaker mt-5">
                        <img src={`/public/${product.image}`} alt=""/>
                        <div className="brand mt-5">{product.brand}</div>
                        <div className="name mt-3">{product.name}</div>
                        <div className="price mt-3">฿ {Number(product.price).toLocaleString()}.00</div>
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