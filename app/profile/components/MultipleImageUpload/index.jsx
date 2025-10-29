"use client"
const MultipleImageUpload = ()=>{
    const handleFilesChange = (event)=>{
        console.log(event?.target?.files);
    }

    return <input type="file" multiple onChange={handleFilesChange} accept="image/*"/>

}

export default MultipleImageUpload