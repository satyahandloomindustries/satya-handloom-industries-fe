'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from 'next/image';

export default function SwiperImageCarousel() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);

    return (
        <div className="w-[400] mr-auto overflow-hidden">
            <Swiper
                modules={[Thumbs, Controller]}
                spaceBetween={10}
                controller={{ control: thumbsSwiper }}
                onSwiper={setMainSwiper}
                className="rounded-xl overflow-hidden"
            >
                {[1, 2, 3, 4].map((n) => (
                    <SwiperSlide key={n}>
                        <Image
                            src="/traditional-macrame-composition-indoors_317x449.jpg"
                            className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000 h-[400px] rounded"
                            alt="assembling-advent3"
                            objectFit="cover"
                            width={400}
                            height={180}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                modules={[Controller, Thumbs]}
                onSwiper={(swiper) => {
                    // Add a class to the internal wrapper
                    swiper.el.querySelector('.swiper-wrapper')?.classList.add('flex');
                    swiper.el.querySelector('.swiper-wrapper')?.classList.add('justify-center');
                    setThumbsSwiper(swiper)
                  }}
                controller={{ control: mainSwiper }}
                watchSlidesProgress
                slidesPerView={4}
                spaceBetween={2}

                className="mt-4"
            >
                {[1, 2, 3, 4].map((n) => (
                    <SwiperSlide key={n} className="cursor-pointer !w-fit !mr-3 !flex items-center justify-center">
                        <Image
                            src="/traditional-macrame-composition-indoors_317x449.jpg"
                            className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000 h-[40px] rounded"
                            alt="assembling-advent3"
                            objectFit="cover"
                            width={40}
                            height={40}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
