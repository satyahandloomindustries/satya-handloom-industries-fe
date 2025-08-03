import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import UnderlineStroke from '@/components/UnderlineStroke';

const CollectionLink = ({ label = '' }) => {
  return (
    <Link
      href="/"
      className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-4xl w-full group-hover:justify-center hidden group-hover:flex"
    >
      <span className="text-white">{label}&nbsp;</span>
      <span className="text-black group">
        <div>Collec</div>
        <UnderlineStroke />
      </span>
      <span className="text-white">tion</span>
    </Link>
  );
};

const CarouselHomepage = () => {
  return (
    <div className="flex overflow-x-scroll space-x-2 overflow-y-hidden h-[450] px-4 scrollbar-hide">
      <div className="flex-shrink-0 relative group overflow-hidden w-[400px] h-[450px]">
        <Image
          src="/traditional-macrame-composition-indoors_317x449.jpg"
          className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000"
          alt="assembling-advent3"
          layout="fill"
          objectFit="cover"
        />
        <CollectionLink label="Ethnic" />
      </div>
      <div className="flex-shrink-0 group overflow-hidden relative w-[400px] h-[450px]">
        <Image
          src="/Reviving_the_Beauty_of_Traditional_Practices_317x449.jpeg"
          className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000"
          alt="assembling-advent2"
          objectFit="cover"
          layout="fill"
        />
        <CollectionLink label="Artistic" />
      </div>
      <div className="flex-shrink-0 group overflow-hidden relative w-[400px] h-[450px] ">
        <Image
          src="/young-woman-using-macrame-technique.jpg"
          className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000"
          alt="assembling-advent4"
          objectFit="cover"
          layout="fill"
        />
        <CollectionLink label="Vibrant" />
      </div>

      <div className="flex-shrink-0 group overflow-hidden relative w-[400px] h-[450px]">
        <Image
          src="/hands-assembling-advent-wreath_317x449.jpg"
          alt="assembling-advent1"
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000"
        />
        <CollectionLink label="Timeless" />
      </div>
    </div>
  );
};

export default CarouselHomepage;
