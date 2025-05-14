'use client';
import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

const ToastContainer = () => {
  const [toasts, setToasts] = React.useState([1, 2, 3, 4, 5, 6]);
  return toasts.map((_, index) => (
    <div
      className={clsx(
        'absolute right-10 z-50 w-80 border bg-white',
        styles.animate
      )}
      style={{ top: `${30 + index * 50}px`, animationDelay: `${index * 0.2}s` }}
      key={index}
    >
      <Image
        width={40}
        height={10}
        className="h-full absolute top-0 left-0 object-cover opacity-20 rotate-180"
        src="/images/greyishPattern.jpeg"
        alt="whatever"
      />
      <div className="pl-4 pr-1 py-2 text-base">ToastContainer</div>
      <div className="w-full h-1" style={{ backgroundColor: 'purple' }} />
    </div>
  ));
};

export default ToastContainer;
