import ShopHeader from '@/components/ShopHeader';
import React from 'react';
import ContactUsForm from './components/ContactUsForm';
import ContactDetails from './components/ContactDetails';
import ContactUsFooter from '@/components/ContactUsFooter';

const ContactUs = () => {
  return (
    <div>
      <ShopHeader />
      <div className="grid grid-cols-2 gap-x-4">
        <ContactUsForm></ContactUsForm>
        <ContactDetails />
      </div>
      <ContactUsFooter />
    </div>
  );
};

export default ContactUs;
