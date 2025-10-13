import { create } from 'zustand';

const useUser = create((set, get) => ({
    username: "",
    phone:"",
    phoneWithCountryCode:"",
    isAuthenticated: false, 
    setUsername : (username = "")=>{
        set({username})
    },
    setPhone: (phone = "" , countryCode = "+91")=>{
        set({phone , phoneWithCountryCode: countryCode.concat(phone)})
    }
}));

export default useUser;
