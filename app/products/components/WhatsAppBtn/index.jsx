"use client"
import { useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa6";


const WhatsAppBtn = () => {

    const handleWhatsAppConnect = ()=>{
    }

    return <button onClick={handleWhatsAppConnect} className={`tracking-wider rounded flex items-center hover:bg-green-100 justify-center outline-none px-3 py-2 border border-green-500`}>
        <FaWhatsapp className='text-green-500' />
        <div className='text-sm ml-2 text-green-700'>Connect with us</div>
    </button>
}

export default WhatsAppBtn