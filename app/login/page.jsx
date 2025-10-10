
import { dancingScript } from "@/utls"
import clsx from "clsx"
const Login = () => {

    return <div className="items-center justify-center flex-1 flex h-[calc(100%-80px)] opacity-80 bg-orange-800 opacity-50">
        <div className="w-[60%] h-[80%] grid grid-cols-[1fr_1fr]">

            <div className="bg-shi_brown items-center justify-start flex flex-col"
            >
                <h1 className="text-[#000] text-bold text-2xl mt-20 text-start">Welcome to,<br></br> Satya Handloom Industries</h1>

                <ul className="list-disc">
                    <li className="mt-8 text-[#fff] text-md pl-4">Explore our handcrafted collection of bedsheets, <br/> curtains, and more</li>
                    <li className="mt-8 text-[#fff] text-md pl-4">Discover the beauty of handmade living</li>
                </ul>
            </div>
            <div className="items-center justify-center flex bg-white flex-col">
                <div className={clsx(dancingScript.className , "text-4xl")}>
                    Login
                </div>

                <form class="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">

                    <div class="mb-4">
                        <label htmlFor="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div class="mb-6">
                        <label htmlFor="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>

        </div>

    </div>
}

export default Login