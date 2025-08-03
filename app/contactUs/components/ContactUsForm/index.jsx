'use client';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import useToast from '@/store/useToast';
import { toastTypes } from '@/utls';

const ContactUsForm = () => {
  const form = useRef();
  const { addToast } = useToast();
  const service_id = 'service_w89xl9f';
  const template_id = 'template_7154r0q';
  const public_key = 'Fx45D07KIG9rWyylp';

  const sendEmail = async (e) => {
    e.preventDefault();

    emailjs.sendForm(service_id, template_id, form.current, public_key).then(
      () => {
        form.current.reset();
        addToast('Message sent successfully!', toastTypes.SUCCESS);
      },
      (error) => {
        console.log('Email send error:', error.text);
        addToast('Failed to send message.', toastTypes.ERROR);
      }
    );
  };

  return (
    <div className="flex flex-col items-start justify-center h-full p-6">
      <h1 className="text-xl font-bold mb-4">Tell Us Your Project</h1>
      <form className="w-full max-w-lg" ref={form} onSubmit={sendEmail}>
        <div className="grid grid-cols-2 gap-8">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name*"
            className="appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
          />

          <input
            type="phone"
            id="phone"
            name="phone"
            placeholder="Phone*"
            className=" appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email*"
            className=" appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
          />

          <input
            type="text"
            id="subject"
            placeholder="Subject*"
            name="subject"
            className=" appearance-none w-full p-3 text-sm text-gray-700  bg-gray-100 leading-tight focus:outline-none focus:-outline"
          />
        </div>

        <div className="my-4">
          <textarea
            id="message"
            name="message"
            placeholder="Message*"
            rows={6}
            className=" appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-shi_brown text-white  py-3 px-6 font-thin text-sm focus:outline-none focus:-outline"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
