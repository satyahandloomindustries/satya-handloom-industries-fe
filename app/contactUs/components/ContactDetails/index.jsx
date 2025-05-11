import { contactUs } from '@/components/ContactUsFooter';
import Divider from '@/components/Divider';
import IconLabelValue from '@/components/IconLabelValue';
import React from 'react';

const ContactList = () => {
  const newContactUs = contactUs.map((item, index) => {
    if (index !== contactUs.length - 1) {
      return {
        ...item,
        Component: () => <Divider className="mt-2 w-full" />,
      };
    }
    return item;
  });
  return <IconLabelValue iconLabelSet={newContactUs} />;
};
const ContactDetails = () => {
  return (
    <div className="pr-4">
      <h1 className="text-xl font-bold pt-6 mb-4">Contact Us</h1>
      <div className="flex flex-col items-start justify-center">
        <p className="text-sm font-thin mb-4 text-gray-500">
          Claritas est etiam processus dynamicus, qui sequitur mutationem
          consuetudium lectorum. Mirum est notare quam littera gothica, quam
          nunc putamus parum claram anteposuerit litterarum formas human.
        </p>

        <ContactList />
      </div>
    </div>
  );
};

export default ContactDetails;
