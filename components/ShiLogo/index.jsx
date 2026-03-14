import Image from 'next/image';
import React from 'react';

const ShiLogo = ({width = 60 , height = 60}) => {
  return <Image src="/images/shi_logo.png" width={width} height={height} alt="shi logo"/>;
};

export default ShiLogo;
