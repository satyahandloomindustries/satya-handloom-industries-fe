import React from 'react';
import ContactUsForm from './components/ContactUsForm';
import ContactDetails from './components/ContactDetails';
import ContactUsFooter from '@/components/ContactUsFooter';
import FallingLeaves from '@/components/FallingLeaves';
import styles from './index.module.css';
import clsx from 'clsx';

const ContactUs = () => {
  return (
    <div>
      <div className={clsx('relative', styles.padding)}>
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
