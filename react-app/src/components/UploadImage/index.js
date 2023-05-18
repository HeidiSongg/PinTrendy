import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const UploadImage = ({updateImage}) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    // const [image, setImage] = useState(null);
    // const [imageLoading, setImageLoading] = useState(false);
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("image", image);
        
    //     // aws uploads can be a bit slow—displaying
    //     // some sort of loading message is a good idea
        
    //     setImageLoading(true); 
    //     const res = await fetch('/api/images', {
    //         method: "POST",
    //         body: formData,
    //     });
    //     if (res.ok) {
    //         const image_url = await res.json();
    //         setImageLoading(false);
    //         history.push("/images");
    //     }
    //     else {
    //         setImageLoading(false);
    //         console.log("error")
    //     }
    // }
    
    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    // }
    
    return (

            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
    )
}

export default UploadImage;