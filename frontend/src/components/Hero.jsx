import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { slider1, slider2, slider3 } from '../assets';

const images = [slider1, slider2, slider3];

function Hero() {
  return (
    <div className="relative w-full h-auto sm:h-[500px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden bg-gradient-to-r from-[#F5F9FA] to-[#E3EDF2]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hero;