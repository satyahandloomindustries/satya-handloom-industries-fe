import Image from 'next/image';
import React from 'react';
import Tag from '../Tag';

const ProductCard = ({ name, source, onClick = () => {} }) => {
  return (
    <div
      className="relative justify-center  w-fit flex flex-col items-center"
      onClick={onClick}
    >
      <Image
        src={source}
        className="h-[263px] w-[263px] object-cover "
        width={263}
        height={263}
        alt="product-image"
      />
      <p className="text-base mt-8">{name}</p>
      <Tag label="Sale" />
    </div>
  );
};

export default ProductCard;
