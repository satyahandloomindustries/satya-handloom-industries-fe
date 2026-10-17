import Image from 'next/image';
import React from 'react';
// import Tag from '../Tag';

const ProductCard = ({
  name,
  source,
  onClick = () => {},
  imageClassName = 'h-[263px] w-[263px]',
}) => {
  return (
    <div className="flex w-full cursor-pointer flex-col" onClick={onClick}>
      <div className={`relative overflow-hidden bg-[#f7f3ec] ${imageClassName}`}>
        {source ? (
          <Image
            src={source}
            alt={name || 'product'}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition duration-300 hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <p className="mt-3 text-sm text-[#2a2118]">{name}</p>
    </div>
  );
};

export default ProductCard;
