'use client';
import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';
import { FaTimes } from 'react-icons/fa';
import useToast from '@/store/useToast';

const ToastContainer = () => {
  const { toasts, removeToast , pauseToast , resumeToast} = useToast();

  return toasts.map(({ message, id }, index) => (
    <div
      className={clsx(
        'fixed right-10 z-50 w-80 border bg-white cursor-pointer',
        styles.animate
      )}
      style={{ top: `${30 + index * 50}px` }}
      key={id}
      onMouseEnter={pauseToast.bind(null , index)}
      onMouseLeave={resumeToast.bind(null , index)}
    >
      <div>
        <Image
          width={40}
          height={10}
          className="h-full absolute top-0 left-0 object-cover opacity-20 rotate-180 w-auto"
          src="/images/greyishPattern.jpeg"
          alt="whatever"
        />
        <div className="pl-4 pr-1 py-2 text-base">{message}</div>
        <div className="w-full h-1" style={{ backgroundColor: 'purple' }} />
      </div>

      <button
        className="absolute -top-1 -right-1 bg-white rounded-full border flex items-center justify-center p-1 cursor-pointer"
        onClick={removeToast.bind(null, id)}
      >
        <FaTimes size={12} color="black" />
      </button>
    </div>
  ));
};

export default ToastContainer;
