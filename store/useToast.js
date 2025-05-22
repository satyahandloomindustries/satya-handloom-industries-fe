import { toastTypes } from '@/utls';
import { create } from 'zustand';

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
  addToast: (message, type) => {
    const prevToasts = get().toasts;
    const id = Date.now();
    const timeoutId = setTimeout(get().removeToast.bind(null, id), 5000);
    const updatedToasts = [...prevToasts, { id, message, type, timeoutId }];
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
