import { toastTypes } from '@/utls';
import { create } from 'zustand';
import { nanoid } from 'nanoid';

const useToast = create((set, get) => ({
  toasts: [],
  removeToast: (idToRemove) => {
    const prevToasts = get().toasts;
    const updatedToasts = prevToasts.filter(({ id, timeoutId }) => {
      if (id === idToRemove) {
        clearTimeout(timeoutId);
      }
      return id !== idToRemove;
    });
    set({ toasts: updatedToasts });
  },
  pauseToast: (index) => {
    const toasts = get().toasts;
    const updatedToasts = [...toasts];
    const toast = { ...updatedToasts[index] };
    const { timeoutId, startTime } = toast;
  
    const elapsed = performance.now() - startTime;
    const remainingTime = toast.remainingTime - elapsed;
  
    clearTimeout(timeoutId);
  
    toast.remainingTime = remainingTime;
    toast.startTime = null; // optional, prevents re-pause issues
    updatedToasts[index] = toast;
  
    set({ toasts: updatedToasts });
  },
  
  resumeToast: (index) => {
    const toasts = get().toasts;
    const updatedToasts = [...toasts];
    const toast = { ...updatedToasts[index] };
    const { remainingTime, id } = toast;
  
    const newTimeoutId = setTimeout(() => get().removeToast(id), remainingTime);
    
    toast.timeoutId = newTimeoutId;
    toast.startTime = performance.now();
    updatedToasts[index] = toast;
  
    set({ toasts: updatedToasts });
  },
  
  addToast: (message, type) => {
    const prevToasts = get().toasts;
    const id = nanoid(10);
    const timeoutId = setTimeout(get().removeToast.bind(null, id), 5000);
    const startTime = performance.now()
    const remainingTime = 5000;
    const updatedToasts = [...prevToasts, { id, message, type, timeoutId , remainingTime  , startTime}];
    set({ toasts: updatedToasts });
  },
  showSuccessToast: (message) => {
    get().addToast(message, toastTypes.SUCCESS);
  },

  showErrorToast: (message) => {
    get().addToast(message, toastTypes.ERROR);
  },
}));

export default useToast;
