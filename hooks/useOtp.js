import { useMemo, useState } from "react";

const useOtp = ({length = 4} = {})=>{
    const [inputs , setInputs] = useState(new Array(length).fill(""));
    const resetOtp = ()=> setInputs(new Array(length).fill(""))
    const isOtpFilled = useMemo(()=>{
        return inputs.length === length
    } , [inputs])

    return {length , setInputs , inputs , otpValue: inputs.join("") , resetOtp , isOtpFilled}
    
}

export default useOtp