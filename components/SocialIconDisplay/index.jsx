'use Client';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const socialIcon = [FaTwitter, FaFacebook, FaInstagram];
const SocialIconDisplay = ({ title = '' }) => {
  return (
    <div>
      <div className="text-base font-bold">{title}</div>
      <div
        className="grid grid-cols-3 mt-6 gap-x-4"
        style={{ gridTemplateColumns: `repeat(${socialIcon.length}, 1fr)` }}
      >
        {socialIcon.map((Item, index) => (
          <Link
            key={index}
            className="border border-gray-400 p-4 rounded-full hover:bg-shi_brown hover:text-white"
            href="/"
          >
            <Item className="text-2xl" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialIconDisplay;
