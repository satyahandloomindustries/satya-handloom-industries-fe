// 'use client';

// import React, { useRef, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Thumbs, Controller } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import Image from 'next/image';



//         const a = ['/traditional-macrame-composition-indoors_317x449.jpg', "/Reviving_the_Beauty_of_Traditional_Practices_317x449.jpeg", "/young-woman-using-macrame-technique.jpg", "/Reviving_the_Beauty_of_Traditional_Practices_317x449.jpeg"]
// export default function SwiperImageCarousel() {
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [mainSwiper, setMainSwiper] = useState(null);
//     const mainRef = useRef(null);
//     const thumbnailRef = useRef(null); 
    
//     return (
//         <div className="w-[400] mr-auto overflow-hidden">
//             <Swiper
//                 modules={[Thumbs, Controller]}
//                 spaceBetween={10}
//                 controller={{ control: thumbnailRef.current }}
//                 onSwiper={(swiper)=>{
//                     console.log(swiper);
                    
//                     setMainSwiper(swiper)
//                     mainRef.current = swiper;
//                 }}
//                 className="rounded-xl overflow-hidden"
//             >
//                 {a.map((n , i) => (
//                     <SwiperSlide key={i}>
//                         <Image
//                             src={n}
//                             className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000 h-[400px] rounded"
//                             alt="assembling-advent3"
//                             objectFit="cover"
//                             width={400}
//                             height={180}
                        
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>

//             <Swiper
//                 modules={[Controller, Thumbs]}
//                 onSwiper={(swiper) => {
//                     swiper.el.querySelector('.swiper-wrapper')?.classList.add('flex');
//                     swiper.el.querySelector('.swiper-wrapper')?.classList.add('justify-center');
//                     setThumbsSwiper(swiper)
//                     thumbnailRef.current = swiper
//                   }}
//                 controller={{ control: mainRef.current }}
//                 watchSlidesProgress
//                 slidesPerView={4}
//                 spaceBetween={2}
//                 slideToClickedSlide 
//                 className="mt-4"
//             >
//                 {a.map((n , i) => (
//                     <SwiperSlide key={i} className="cursor-pointer !w-fit !mr-3 !flex items-center justify-center">
//                         <Image
//                             src={n}
//                             className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000 h-[40px] rounded"
//                             alt="assembling-advent3"
//                             objectFit="cover"
//                             width={40}
//                             height={40}
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// }


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
  '/Reviving_the_Beauty_of_Traditional_Practices_317x449.jpeg'
];

export default function SwiperImageCarousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track main Swiper active slide

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
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={5}
        watchSlidesProgress
        slideToClickedSlide
        className="mt-4"
      >
        {images.map((img, idx) => (
          <SwiperSlide
            key={idx}
            className={`cursor-pointer !w-fit !mr-3 !flex items-center justify-center border-2 rounded 
              ${activeIndex === idx ? 'border-blue-500' : 'border-transparent'}`}
          >
            <Image
              src={img}
              className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000 h-[40px] rounded"
              alt={`thumb-${idx}`}
              width={40}
              height={40}
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
