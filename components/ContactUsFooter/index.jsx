import React from 'react';
import ShiLogo from '../ShiLogo';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import IconLabelValue from '../IconLabelValue';
import LabelValue from '../LabelValue';
import Link from 'next/link';
import SocialIconDisplay from '../SocialIconDisplay';

const contactUs = [
  {
    Icon: HomeOutlinedIcon,
    label: '4710-4890 Breckinridge USA',
  },
  {
    Icon: MailOutlinedIcon,
    label: 'demo@yourdomain.com',
  },
  {
    Icon: PhoneOutlinedIcon,
    label: '(012) 800 456 789-987',
  },
];

const information = [
  {
    label: 'About us',
    value: () => (
      <Link className="text-shi_brown " href="/">
        Delivery information
      </Link>
    ),
  },
];
const ContactUsFooter = () => {
  return (
    <footer className="bg-gray-100 py-20 px-20 mt-10">
      <div className="grid grid-cols-[1.5fr_repeat(3,max-content)] gap-x-4">
        <div className="mt-2">
          <ShiLogo />
          <p className="text-gray-600 text-sm ml-1 mt-2">
            Empowering businesses with premium, sustainable handloom textiles,
            offering high-quality, customizable products for wholesale and bulk
            distribution
          </p>
        </div>

        <IconLabelValue title="Contact Us" iconLabelSet={contactUs} />

        <LabelValue title="Information" arr={information} />

        <SocialIconDisplay title="Follow Us" />
      </div>
    </footer>
  );
};

export default ContactUsFooter;
