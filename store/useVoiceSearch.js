import { create } from 'zustand';
import useToast from './useToast';
import { removeWhiteSpaces } from '@/utls';


const handleVoiceSearch = (set, get, showErrorToast = () => { }) => {

  if (get().listening) return

  const SpeechRecognition =
    window?.SpeechRecognition || window?.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    showErrorToast("Your browser does not support voice search");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.start();
  set({ listening: true });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    
    const prevQuery = get().query
    if (event.results[0].isFinal) {
      const initialString = prevQuery.substring(0, get().cursorAt)
      const newQuery = initialString + ' ' + transcript + ' '+ prevQuery.substring(get().cursorAt, prevQuery.length)
      set({ query: newQuery  , cursorAt: initialString.length + transcript.length + 2 });
    }
  };

  recognition.onerror = () => {
    set({ listening: false });
  };

  recognition.onend = () => {
    set({ listening: false });
  };
};




const useVoiceSearch = create((set, get) => ({
  listening: false,
  query: '',
  cursorAt: 0,
  handleVoiceSearch: () => {
    const { showErrorToast } = useToast.getState()
    handleVoiceSearch(set, get, showErrorToast)
  },
  handleChange: (event) => {
    set({ query: event?.target?.value ?? get().query })
  },
  handleCursorPosition: (cursorAt) => set({ cursorAt })
}));


export default useVoiceSearch;