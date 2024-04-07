import { useEffect, useRef } from "react"


const UploadImage = () => {

    const cloudinaryRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current= window.cloudinary
    }, [])


    return (
        <div>UploadImage</div>
    )
}

export default UploadImage