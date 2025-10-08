const ErrorMessage = ({message})=>{

    return <p className={`text-xs ml-1 mt-1 text-red-500 transition-opacity duration-500 ease-in-out ${message ? "opacity-100 visible": "opacity-0 invisible"}`}>**&nbsp;{message}</p>

}

export default ErrorMessage