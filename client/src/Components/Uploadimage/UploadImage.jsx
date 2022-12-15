import React, { useState } from 'react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import { getAuth } from "firebase/auth";
  import { v4 as uuidv4 } from "uuid";
  import { addDoc, collection, serverTimestamp } from "firebase/firestore";
 
  import { useNavigate } from "react-router-dom";
  import { db } from "../../firebase"
  

  const UploadImage = () => {
	const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    images: {},
  });
  const {
    images,
  } = formData;
  
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    if (images.length > 6) {
      setLoading(false);
      alert("maximum 6 images are allowed");
      return;
    }

    const data = new FormData();
    [...images].map((image) => {
      console.log(image) 
      data.append(`file`, image);
      
  })

    axios.post('/upload', data).then(()=>{
      setLoading(false);
      alert("Listing created");
    })
      

   
   
  }

	return (
        <div>
			<h1>uploadImage</h1>
        
         
         <form onSubmit={onSubmit}>
           
           <div >
             <p >
               The first image will be the cover (max 6)
             </p>
             <label for="formFileMultiple" class="form-label">Upload Images</label>
             <input
               type="file"
               id="images"
               onChange={onChange}
               accept=".jpg,.png,.jpeg,.webp"
               multiple
               required
               className="form-control"
             />
           </div>
           <br/>
           <button
             type="submit"
             className="btn btn-success"
           >
             Create Listing
           </button>
         </form>
         
       
       </div>
    )
};

export default UploadImage;