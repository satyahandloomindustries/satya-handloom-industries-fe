"use client"
import axios from "axios";
import Otp from "../Otp";
import useOtp from "@/hooks/useOtp";
import useUser from "@/store/useUser";

const Authenticate = () => {

    const { setInputs, inputs, otpValue } = useOtp();
    const {username , phone , setUsername , setPhone} = useUser()
    const handleSendOtp = async (event) => {
        event.preventDefault()
        const response = await axios.post('/api/send-otp', { otpValue , username , phone }, {
            headers: {
                Authorization: "Bearer mytoken",
                "Content-Type": "application/json"
            }
        })
        console.log(response);

    }
    return <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">

        <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
                onChange={(event)=> setUsername(event.target.value)}
                type="text"
                value = {username}
                id="username"
                name="username"
                placeholder="Enter your username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Contact info</label>
            <input
                onChange = {(event)=> setPhone(event.target.value)}
                type="text"
                id="mobile"
                name="mobile"
                value = {phone}
                placeholder="Enter your mobile number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>

        <Otp inputs={inputs} setInputs={setInputs} />

        <button
            type="submit"
            onClick={handleSendOtp}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
            Login
        </button>
    </form>
}

export default Authenticate