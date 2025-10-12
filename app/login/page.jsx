
import { dancingScript } from "@/utls"
import clsx from "clsx"
import Otp from "./components/Otp"
const Login = () => {


    return <div className="items-center justify-center flex-1 flex h-[calc(100%-80px)] bg-shi_brown">
        <div className="w-[60%] h-[80%] grid grid-cols-[1fr_1fr]">

            <div className="items-center justify-start flex flex-col"
            style={{backgroundColor: "rgb(145, 110, 40)"}}
            >
                <h1 className="text-black  text-2xl mt-20 text-start"><span className="text-xl font-semibold">Welcome to,</span><br></br> Satya Handloom Industries</h1>

                <ul className="list-disc">
                    <li className="mt-8 text-[#fff] text-md pl-4">Explore our handcrafted collection of bedsheets, <br/> curtains, and more</li>
                    <li className="mt-8 text-[#fff] text-md pl-4">Discover the beauty of handmade living</li>
                    <li className="mt-8 text-[#fff] text-md pl-4">Deliver affordable, high-value handloom products <br/> that meet today’s lifestyle and hospitality standards.</li>
                </ul>
            </div>
            <div className="items-center justify-center flex bg-white flex-col">
                <div className={clsx(dancingScript.className , "text-4xl")}>
                    Login
                </div>

                <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Contact info</label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            placeholder="Enter your mobile number"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <Otp/>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>

        </div>


    </div>
}

export default Login