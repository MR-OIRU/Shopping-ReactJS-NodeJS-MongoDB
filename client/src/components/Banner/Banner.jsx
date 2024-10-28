import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import '../../assets/css/BannerSwiper.css'


function Banner() {
    return (
      <div className="custom-banner">
        <Swiper
            centeredSlides={true}
            loop={true}
            effect={'fade'}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectFade]}
            className="banner-Swiper"
          >
            <SwiperSlide><img src='/public/image/nike1.jpg' alt=''/></SwiperSlide>
            <SwiperSlide><img src='/public/image/nike2.jpg' alt=''/></SwiperSlide>
            <SwiperSlide><img src='/public/image/converse1.jpg' alt=''/></SwiperSlide>
            <SwiperSlide><img src='/public/image/converse2.jpg' alt=''/></SwiperSlide>
          </Swiper>
      </div>
      );
}

export default Banner