import React from 'react';

const ContactUsForm = () => {
  return (
    <div className="flex flex-col items-start justify-center h-full p-6">
      <h1 className="text-xl font-bold mb-4">Tell Us Your Project</h1>
      <form className="w-full max-w-lg">
        <div className="grid grid-cols-2 gap-8">
          <input
            type="text"
            id="name"
            placeholder="Name*"
            className="appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
          />

          <input
            type="phone"
            id="phone"
            placeholder="Phone*"
            className=" appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
          />

          <input
            type="email"
            id="email"
            placeholder="Email*"
            className=" appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
          />

          <input
            type="text"
            id="subject"
            placeholder="Subject*"
            className=" appearance-none w-full p-3 text-sm text-gray-700  bg-gray-100 leading-tight focus:outline-none focus:-outline"
          />
        </div>

        <div className="my-4">
          <textarea
            id="message"
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
