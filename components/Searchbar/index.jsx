"use client"
import React, { useEffect, useRef , useTransition } from 'react';
import { CiSearch } from "react-icons/ci";
import VoiceMic from '../VoiceMic';
import useVoiceSearch from '@/store/useVoiceSearch';
const Searchbar = ({ searchIconVisible = true, voiceMicVisible = true , onSearchComplete=()=>{} }) => {
    const { query = '', handleChange = () => { }, handleCursorPosition, cursorAt } = useVoiceSearch()
    const inputRef = useRef();
    const [_isPending, startTransition]  = useTransition()

    useEffect(()=>{        
        startTransition(()=> onSearchComplete())
    } , [query])
    
    return <div className='relative w-full'>
        <input ref={inputRef} value={query} onChange={handleChange} onKeyDown={() => handleCursorPosition(inputRef.current.selectionStart ?? cursorAt)} onClick={() => handleCursorPosition(inputRef.current.selectionStart ?? cursorAt)} id="search" name="search" placeholder='Discover in thread' className="border rounded mt-4 p-1 text-shi_brown focus:outline-none cursor-default w-full px-8 placeholder:text-sm placeholder:italic  placeholder:tracking-wider placeholder:text-gray-400" />
        {searchIconVisible && <CiSearch className='absolute left-2 top-1/2 text-black'
        />
        }
        {voiceMicVisible && <VoiceMic classname='absolute right-2 top-1/2 text-red' />}
    </div>
}

export default Searchbar;