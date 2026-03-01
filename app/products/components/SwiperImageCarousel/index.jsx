'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import Image from 'next/image';

const images = [
  '/traditional-macrame-composition-indoors_317x449.jpg',
  '/Reviving_the_Beauty_of_Traditional_Practices_317x449.jpeg',
  '/young-woman-using-macrame-technique.jpg',
  '/Reviving_the_Beauty_of_Traditional_Practices_317x449.jpeg',
];

export default function SwiperImageCarousel({ images = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track main Swiper active slide

  console.log(images , "images");

  return (
    <div className="w-[400px] mr-auto overflow-hidden">
      {/* Main Swiper */}
      <Swiper
        modules={[Thumbs]}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="rounded-xl overflow-hidden cursor-pointer"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000 h-[400px] rounded"
              alt={`slide-${idx}`}
              width={400}
              height={400}
              style={{ objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={8}
        spaceBetween={5}
        watchSlidesProgress
        slideToClickedSlide
        centeredSlides={false}
        className="mt-4"
      >
        {images.map((img, idx) => (
          <SwiperSlide
            key={idx}
            className={`cursor-pointer !flex items-center justify-center border-2 rounded 
              ${activeIndex === idx ? 'border-blue-500' : 'border-transparent'}`}
          >
            <Image
              src={img}
              className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000 h-[40px] rounded"
              alt={`thumb-${idx}`}
              width={40}
              height={40}
              style={{ objectFit: 'cover' , width: '100%' , height: '100%' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
