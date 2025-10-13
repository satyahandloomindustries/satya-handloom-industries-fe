import { useEffect , useRef} from "react";
const useFormResetOnBlur = (resetError= ()=>{})=>{

    const ref = useRef();

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
              resetError(); 
            }
          };
      
          document.addEventListener("mousedown", handleClickOutside);
      
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[])

    return ref
}

export default useFormResetOnBlur