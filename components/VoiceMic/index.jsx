"use client"
import React from 'react';
import useVoiceSearch from '@/store/useVoiceSearch';
import { FaMicrophone } from "react-icons/fa";


const VoiceMic = ({classname = ''}) => {
    const {  handleVoiceSearch , listening } = useVoiceSearch()

    return <button onClick={handleVoiceSearch} className={classname}>
        <FaMicrophone  className={`${listening ? "text-red-600 animate-pulse" : "text-black"}`}/>
    </button>;
};

export default VoiceMic;