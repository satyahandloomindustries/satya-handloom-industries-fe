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
import { useState } from "react";
import Loader from "@/components/Loader";
import { dancingScript } from "@/utls"
import clsx from "clsx"
import { AUTH_MODE } from "@/constants";

const Authenticate = () => {

    const [openOtp, setOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false)
    const { setInputs, inputs, otpValue  , isOtpFilled} = useOtp();
    const { username, phone, setUsername, setPhone, email, setEmail } = useUser()
    const { validation, error, noError, validateAt, resetError } = useFormValidation({
        username: Yup.string().required('Username is required'),
        phone: Yup.string()
            .required('Phone is required')
            .matches(/^[0-9]{10}$/, '10 digit phone number missing'),
        email: Yup.string().email('Invalid email').required('Email is required')
    });

    const { showErrorToast, showSuccessToast } = useToast()

    const formRef = useFormResetOnBlur(resetError);

    const handleVerifyOtp = async(event)=>{
        event.preventDefault()
        const { invalid } = await validation({ username, phone, email })

        if(!isOtpFilled || invalid) {
            showErrorToast("Please fill the otp completely")
        }
        try {
            setLoading(true)
            const response = await axios.post('/api/verify-otp', { email , otp: otpValue , username , phone , email}, {
                headers: {
                    Authorization: "Bearer mytoken",
                    "Content-Type": "application/json"
                }
            })

            
            setLoading(false);
        }
        catch(err){
            
            showErrorToast(err?.message ?? "Failed to verify the Otp");
            setLoading(false)
        }

    }
    const handleSendOtp = async (event) => {
        event.preventDefault()
        const { invalid } = await validation({ username, phone, email })

        if (invalid) {
            showErrorToast("Please fill the mandatory fields")
            return
        }
        try {
            setLoading(true)
            const response = await axios.post('/api/send-otp', { otpValue, username, phone, email , mode: AUTH_MODE.signup}, {
                headers: {
                    Authorization: "Bearer mytoken",
                    "Content-Type": "application/json"
                }
            })

            showSuccessToast("Otp has been sent to your email successfully");
            setOtp(true);
        } catch (err) {

            if (err.response) {
                // The request was made and server responded
                const status = err.response.status;
        
                if (status === 404) {
                  showErrorToast("⚠️ User not found. Please sign up to continue");
                } 
                else if (status === 409) {
                  showErrorToast("⚠️ User already exists. Please login to continue");
                } 
                else {
                  showErrorToast("❌ Something went wrong. Please try again.");
                }
              } else {
                // Network error or request not sent
                showErrorToast("⚠️ Network error. Please try again.");
              }
        }finally{
            setLoading(false)
        }

    }

    const handleValidateAt = async (event, onChange = () => { }) => {
        const { name, value } = event.target;
        await validateAt(name, value);
        onChange(value)
    }
    const handlePhoneChange = (event) => {
        if (!verifyDigits(event.target.value)) return
        handleValidateAt(event, setPhone)
    }

    const handleUsernameChange = (event) => {
        handleValidateAt(event, setUsername)
    }

    const handleEmailChange = (event) => {
        handleValidateAt(event, setEmail)
    }

    const inputDisabled = openOtp || loading;

    const buttonLabel = openOtp ? "Verify" : "Send verification code"

    

    return <>
        <div className={clsx(dancingScript.className, "text-4xl")}>
            <span className={`${login ? "text-shi_brown" : ""}`}>
                <button onClick={() => setLogin(true)}>
                    Login
                </button>
            </span> /&nbsp;
            <span className={`${!login ? "text-shi_brown" : ""}`}>
                <button onClick={() => setLogin(false)}>
                    Sign-up</button>
            </span>
        </div>
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" ref={formRef}>
            {!login ? <div className="mb-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    onChange={handleUsernameChange}
                    type="text"
                    value={username}
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${inputDisabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""}`}
                    disabled={inputDisabled}
                />
                <ErrorMessage message={error?.username} />
            </div> : null}
            <div className="mb-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    onChange={handleEmailChange}
                    type="email"
                    value={email}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${inputDisabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white"}`}
                    disabled={inputDisabled}
                />
                <ErrorMessage message={error?.email} />
            </div>
            {!login ? <div className="mb-1">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Contact info</label>
                <input
                    onChange={handlePhoneChange}
                    id="phone"
                    type="tel"
                    name="phone"
                    value={phone}
                    placeholder="Enter your phone number"
                    className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${inputDisabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""}`}
                    disabled={inputDisabled}
                />
                <ErrorMessage message={error?.phone} />

            </div> : null}

            <Otp inputs={inputs} setInputs={setInputs} visible={openOtp} />

            <button
                type="submit"
                onClick={openOtp ? handleVerifyOtp :handleSendOtp}
                disabled={!noError || loading}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition flex items-center justify-center disabled:cursor-not-allowed disabled:bg-indigo-500"
            >
                <Loader loading={loading} text={buttonLabel} />
            </button>
        </form>
    </>
}

export default Authenticate