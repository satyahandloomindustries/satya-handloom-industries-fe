import { ClipLoader } from "react-spinners";

const Loader = ({loading = false , size = 20 , text = ""})=>{
    if (!loading) return text

    return <ClipLoader loading={loading} size={size} color="white"/> 

}

export default Loader