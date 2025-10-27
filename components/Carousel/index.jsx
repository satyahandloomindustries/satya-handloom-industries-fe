'use client';

import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import clsx from 'clsx';

export default function Carousel({ children , className='' }) {
  return (
    <div className="pl-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={4}
        autoplay={{ delay: 3000 }}
        className={clsx("w-full" , className)}
      >
        {children}
      </Swiper>
    </div>
  );
}
