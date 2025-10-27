"use client"
import { useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";


const PlaceOrderButton = () => {

    const handlePlaceYourOrder = ()=>{
    }

    return <button onClick={handlePlaceYourOrder} className={`tracking-wider flex items-center justify-center outline-none px-3 py-2 bg-shi_brown rounded mr-2`}>
        <CiShoppingCart className='text-white' />
        <div className='text-white text-sm ml-2'>Place your order</div>
    </button>
}

export default PlaceOrderButton