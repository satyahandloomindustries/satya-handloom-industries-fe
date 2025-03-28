'use client';

import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

export default function Carousel({ children }) {
  return (
    <div className="pl-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={4}
        autoplay={{ delay: 3000 }}
        className="w-full"
      >
        {children}
      </Swiper>
    </div>
  );
}
