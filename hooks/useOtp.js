import { useState } from "react";

const useOtp = ({length = 4} = {})=>{
    const [inputs , setInputs] = useState(new Array(length).fill(""));
    const resetOtp = ()=> setInputs(new Array(length).fill(""))

    return {length , setInputs , inputs , otpValue: inputs.join("")}
    
}

export default useOtp