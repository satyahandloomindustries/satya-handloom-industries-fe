"use client"
import axios from "axios";
import Otp from "../Otp";
import useOtp from "@/hooks/useOtp";
import useUser from "@/store/useUser";
import useFormValidation from "@/hooks/useFormValidation";
import * as Yup from "yup";
import ErrorMessage from "@/app/contactUs/components/ErrorMessage";
import { verifyDigits } from "@/utls";
import useToast from "@/store/useToast";
import useFormResetOnBlur from "@/hooks/useFormResetOnBlur";


const Authenticate = () => {

    const { setInputs, inputs, otpValue } = useOtp();
    const { username, phone, setUsername, setPhone } = useUser()
    const { validation, error, noError, validateAt , resetError} = useFormValidation({
        username: Yup.string().required('Username is required'),
        phone: Yup.string()
            .required('Phone is required')
            .matches(/^[0-9]{10}$/, '10 digit phone number missing'),
    });

    const {showErrorToast} = useToast()

    const formRef = useFormResetOnBlur(resetError);

    const handleSendOtp = async (event) => {
        event.preventDefault()
        const {invalid} = await validation({username , phone}) 
        
        if(invalid){
            showErrorToast("Please fill the mandatory fields")
            return
        }
        const response = await axios.post('/api/send-otp', { otpValue, username, phone }, {
            headers: {
                Authorization: "Bearer mytoken",
                "Content-Type": "application/json"
            }
        })

    }

    const handleValidateAt = async (event , onChange = ()=>{})=>{
        const {name , value} = event.target;
        await validateAt(name , value);
        onChange(value)
    }
    const handlePhoneChange = (event) => {
        if(!verifyDigits(event.target.value)) return  
        handleValidateAt(event , setPhone)
    }

    const handleUsernameChange = (event)=>{
        handleValidateAt(event , setUsername)
    }

    return <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" ref={formRef}>

        <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
                onChange={handleUsernameChange}
                type="text"
                value={username}
                id="username"
                name="username"
                placeholder="Enter your username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <ErrorMessage message={error?.username} />
        </div>
        <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Contact info</label>
            <input
                onChange={handlePhoneChange}
                id="phone"
                type="tel"
                name="phone"
                value={phone}
                placeholder="Enter your phone number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <ErrorMessage message={error?.phone} />

        </div>

        <Otp inputs={inputs} setInputs={setInputs} />

        <button
            type="submit"
            onClick={handleSendOtp}
            disabled={!noError}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
            Login
        </button>
    </form>
}

export default Authenticate