'use client';
import React from 'react';
import Carousel from '../Carousel';
import { SwiperSlide } from 'swiper/react';
import ProductCard from '../ProductCard';

const ProductCarousel = () => {
  return (
    <Carousel>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <SwiperSlide key={i}>
          <ProductCard
            name="Product card"
            source="/hands-assembling-advent-wreath_317x449.jpg"
          />
        </SwiperSlide>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
