import { Button } from '@/components/ui/button';
import { storage } from './../../../Configs/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from 'sonner'

// 🔹 Load API URL from .env.local file
const API_URL = import.meta.env.VITE_API_URL;



function UploadImages({ triggerUploadImages, setLoader, carInfo, mode }) {

    const [selectedFileList, setSelectedFileList] = useState([]);
    const [editCarImageList, setEditCarImageList] = useState([]);

    useEffect(() => {
        if (mode === 'edit') {
            carInfo?.images?.forEach((image) => {
                setEditCarImageList((prev) => [...prev, image?.imageUrl]);
            });
        }
    }, [carInfo]);

    useEffect(() => {
        if (triggerUploadImages) {
            uploadImagesToServer();
        }
    }, [triggerUploadImages]);

    const onFileSelected = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setSelectedFileList((prev) => [...prev, file]);
        }
    };

    const onImageRemove = (image, index) => {
        const result = selectedFileList.filter((item) => item !== image);
        setSelectedFileList(result);
    };

    const onImageRemoveFromDB = async (image, index) => {
        try {
            const imageId = carInfo?.images[index]?.id;
            const response = await fetch(`${API_URL}/car-images/${imageId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete image from database');
            }

            toast('Image removed successfully');
            const imageList = editCarImageList.filter(item => item !== image);
            setEditCarImageList(imageList);
        } catch (error) {
            console.error('Error deleting image:', error);
            toast('Error removing image');
        }
    };

    const uploadImagesToServer = async () => {
        
        setLoader(true);
        const uploadedImageUrls = [];

        for (const file of selectedFileList) {
            const fileName = Date.now() + '.jpeg';
            const storageRef = ref(storage, 'WheelDeal/' + fileName);
            const metaData = {
                contentType: 'image/jpeg'
            };

            try {
                await uploadBytes(storageRef, file, metaData);
                const downloadURL = await getDownloadURL(storageRef);
                uploadedImageUrls.push(downloadURL);
            } catch (error) {
                console.error('Error uploading to Firebase:', error);
                toast('Error uploading image');
                setLoader(false);
                return;
            }
        }

        // ✅ Send uploaded image URLs to the Spring Boot backend
        try {
            const response = await fetch(`${API_URL}/car-images/${triggerUploadImages}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(uploadedImageUrls)
            });

            if (!response.ok) {
                throw new Error('Failed to save images in the database');
            }

            toast('Images uploaded successfully');
        } catch (error) {
            console.error('Error saving images to the database:', error);
            toast('Error saving images');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div>
            <h2 className='font-medium text-xl my-3'>Upload Images</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
                {mode === 'edit' &&
                    editCarImageList.map((image, index) => (
                        <div key={index}>
                            <IoMdCloseCircle className='absolute m-2 text-lg text-red-600'
                                onClick={() => onImageRemoveFromDB(image, index)} />
                            <img src={image} className='w-full h-{130px} object-cover rounded-xl' />
                        </div>
                    ))
                }
                {selectedFileList.map((image, index) => (
                    <div key={index}>
                        <IoMdCloseCircle className='absolute m-2 text-lg text-red-600'
                            onClick={() => onImageRemove(image, index)} />
                        <img src={URL.createObjectURL(image)} className='w-full h-{130px} object-cover rounded-xl' />
                    </div>
                ))}
                <label htmlFor="upload-images">
                    <div className='border rounded-xl border-dotted border-primary bg-slate-700 p-10 cursor-pointer hover:shadow-md'>
                        <h2 className='text-lg text-center text-primary'>+</h2>
                    </div>
                </label>

                <input type="file" multiple id="upload-images" onChange={onFileSelected} className='opacity-0' />
            </div>
        </div>
    );
}

export default UploadImages;
