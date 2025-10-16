

import Authenticate from "./components/Authenticate"
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

                <Authenticate/>
            </div>

        </div>


    </div>
}

export default Login