import ShopHeader from '@/components/ShopHeader';
import React from 'react';
import ContactUsForm from './components/ContactUsForm';
import ContactDetails from './components/ContactDetails';
import ContactUsFooter from '@/components/ContactUsFooter';
import FallingLeaves from '@/components/FallingLeaves';
import styles from './index.module.css';
import clsx from 'clsx';
import ToastContainer from '@/components/ToastContainer';

const ContactUs = () => {
  return (
    <div>
      <ShopHeader />
      <div className={clsx('relative', styles.margin)}>
        <FallingLeaves />
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <ContactUsForm></ContactUsForm>
        <ContactDetails />
      </div>
      <ContactUsFooter />
    </div>
  );
};

export default ContactUs;
