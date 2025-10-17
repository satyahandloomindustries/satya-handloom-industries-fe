import { create } from 'zustand';

const useUser = create((set, get) => ({
    username: "",
    phone:"",
    phoneWithCountryCode:"",
    isAuthenticated: false, 
    email: "",
    setUsername : (username = "")=>{
        set({username})
    },
    setPhone: (phone = "" , countryCode = "+91")=>{
        set({phone , phoneWithCountryCode: countryCode.concat(phone)})
    },
    setEmail: (email = "")=>{
        set({email})
    },
    resetUser:()=>{
        set({username: "" , phone:"" , phoneWithCountryCode: "" , isAuthenticated:false , email: "" })
    } 
}));

export default useUser;
