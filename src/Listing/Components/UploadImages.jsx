import React, { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { v2 as cloudinary } from 'cloudinary';
function UploadImages() {

    const [selectedFileList, setSelectedFileList] = useState([]);

    cloudinary.config({
        cloud_name: import.meta.env.VITE_CLOUDINARY_NAME,
        api_key: import.meta.env.VITE_CLOUDINARY_KEY, 
        api_secret: import.meta.env.VITE_CLOUDINARY_SECRET
    });

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'auto'); // Replace with your upload preset

        try {
            // * if this doesn't work pass the file's path to the upload method
            const response = await cloudinary.uploader.upload(file, {
                upload_preset: 'auto'
            });
            return response.secure_url; // Return the URL of the uploaded image
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const onFileSelected = (event) =>{
        const files = event.target.files;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            uploadToCloudinary(file); // Upload the image to Cloudinary one by one
            setSelectedFileList((prev) => [...prev, file]);
        }
    }

    const onImageRemove = (image, index) =>{
        const result = selectedFileList.filter((item)=> item != image);
        setSelectedFileList(result);
    }
  return (
    <div>
        <h2 className='font-medium text-xl my-3'>Upload Images</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>

            {selectedFileList.map((image, index)=>(
                <div key={index}>
                    <IoMdCloseCircle className='absolute m-2 text-lg text-red-600'
                    onClick={()=>onImageRemove(image, index)}/>
                    <img src={URL.createObjectURL(image)} className='w-full h-{130px} object-cover rounded-xl' />
                </div>
            ))}
            <label htmlFor="upload-images">
                <div className='border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md'>
                    <h2 className='text-lg text-center text-primary'>+</h2>
                </div>
            </label>
            
            
            <input type="file" multiple={true} id="upload-images" onChange={onFileSelected} className='opacity-0
            '/>
        </div>
    </div>
  )
}

export default UploadImages