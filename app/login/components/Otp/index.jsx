"use client"
import { useEffect, useRef, useState } from "react"

const Otp = ({ numberOfBoxes = 4 }) => {

    const [inputs, setInputs] = useState(new Array(numberOfBoxes).fill(""))

    const refs = useRef([]);

    useEffect(()=>{
        handleOtpFocus(0)
    } , [])

    useEffect(()=>{
    },[inputs])

    const handleOtpFocus = (i)=>{
        if(i >=0 && i <= numberOfBoxes - 1){
            refs.current[i]?.focus()
            refs.current[i]?.setSelectionRange(1,1)

        }
    }
    const handleChange = (event , index)=>{
        
        const newInputs = [...inputs];
        const otpValue = event.target.value.slice(-1);
        newInputs[index] = otpValue;
        setInputs(newInputs)

        // Move to next input Box
        if(otpValue){          
            handleOtpFocus(index+1)
        }

    }

    const handleKeyDown = (event , index)=>{

        const next = index + 1 >= numberOfBoxes  ? 0 : index + 1;
        const prev = index - 1 < 0 ? numberOfBoxes - 1 : index - 1;
        
        
        switch(event.key){
            case "ArrowRight": {
                if(inputs[index])
                    handleOtpFocus(next)
                break;
            }
            case "ArrowLeft": {
                if(inputs[index])
                    handleOtpFocus(prev);
                break;
            }

            case "Backspace": {
                
                if(!inputs[index])
                    refs.current[prev]?.focus()
            }
        }

    }

    return <div className="flex items-center justify-center">
        <div className="grid gap-x-4 grid-cols-[repeat(4,50px)] place-items-center">
            {inputs.map((i, index) =>

                <input type="text" ref={(i)=> refs.current.push(i)} value={i} className="border border-gray-300  w-12 h-12 text-center" key={index} onChange={(event)=>handleChange(event ,  index)} onKeyDown={(event)=>handleKeyDown(event , index)}/>
            )}
        </div>
    </div>
}

export default Otp