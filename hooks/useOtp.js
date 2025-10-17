import { useEffect, useMemo, useState } from "react";

const useOtp = ({length = 4} = {})=>{
    const [openOtp, setOtp] = useState(false);
    const [inputs , setInputs] = useState(new Array(length).fill(""));
    const resetOtpInputFields = ()=> setInputs(new Array(length).fill(""))
    const isOtpFilled = useMemo(()=>{
        return inputs.length === length
    } , [inputs])

    useEffect(()=>{        
        if(!openOtp) resetOtpInputFields()
    } , [openOtp])

    return {length , setInputs , inputs , otpValue: inputs.join("") , resetOtpInputFields , isOtpFilled , openOtp , setOtp}
    
}

export default useOtp