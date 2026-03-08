import ApiService from '@/services/ApiService';
import { create } from 'zustand';

const useUser = create((set, get) => ({
  username: '',
  phone: '',
  phoneWithCountryCode: '',
  isAuthenticated: false,
  email: '',
  setUsername: (username = '') => {
    set({ username });
  },
  setPhone: (phone = '', countryCode = '+91') => {
    set({ phone, phoneWithCountryCode: countryCode.concat(phone) });
  },
  setEmail: (email = '') => {
    set({ email });
  },
  resetUser: () => {
    set({
      username: '',
      phone: '',
      phoneWithCountryCode: '',
      isAuthenticated: false,
      email: '',
    });
  },
  fetchUser: async () => {
    try {
        const { user } = await ApiService.get('/api/user');

        const {email , username , phone} = user;        

        get().setPhone(phone);
        set({
          username,
          email,
          isAuthenticated: !!user
        })
    } catch (err) {
      console.log(err.message);
    }
  },
}));

export default useUser;
