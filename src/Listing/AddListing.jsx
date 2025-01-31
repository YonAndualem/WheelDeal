import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import CarDetails from '../components/Shared/CarDetails.json'
import Features from '../components/Shared/Features.json'
import InputField from './Components/InputField'
import DropDown from './Components/DropDown'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import TextAreaField from './Components/TextAreaField'
import IconField from './Components/IconField'
import UploadImages from './Components/UploadImages'
import { TbLoader2 } from "react-icons/tb";
import { toast } from 'sonner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment'
import Footer from '@/components/Footer'

// 🔹 Load API URL from .env.local file
const API_URL = import.meta.env.VITE_API_URL;

function AddListing() {
    const [formData, setFormData] = useState({});
    const [featuresData, setFeaturesData] = useState({});
    const [triggerUploadImages, setTriggerUploadImages] = useState();
    const [loader, setLoader] = useState(false);
    const [searchParams] = useSearchParams();
    const [carInfo, setCarInfo] = useState();
    const navigate = useNavigate();
    const { user } = useUser();

    const mode = searchParams.get('mode');
    const recordId = searchParams.get('id');

    useEffect(() => {
        if (mode === 'edit') {
            getListingDetails();
        }
    }, []);

    // ✅ Fetch car listing details from Spring Boot API
    const getListingDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/cars/${recordId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch listing details");
            }
            const data = await response.json();
            setCarInfo(data);
            setFormData(data);
            setFeaturesData(data.features || {});
        } catch (error) {
            console.error("Error fetching listing details:", error);
        }
    };

    // ✅ Handle input changes
    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(formData);
    };

    // ✅ Handle features changes
    const handleFeaturesChange = (name, value) => {
        setFeaturesData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(featuresData);
    };

    // ✅ Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        toast('Please wait while we are processing your listing');

        // Prepare data to send
        const listingData = {
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moment().format('DD/MM/YYYY')
        };

        try {
            let response;
            if (mode === 'edit') {
                // ✅ Update existing listing
                response = await fetch(`${API_URL}/cars/${recordId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(listingData)
                });
            } else {
                // ✅ Create new listing
                response = await fetch(`${API_URL}/cars`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(listingData)
                });
            }

            if (!response.ok) {
                throw new Error("Failed to submit listing");
            }

            const result = await response.json();
            setTriggerUploadImages(result.id); // ✅ Trigger image upload
            toast(mode === 'edit' ? 'Listing updated successfully' : 'Listing added successfully');
            navigate('/profile');
        } catch (error) {
            toast('Error while processing the listing');
            console.error("Error:", error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className='bg-slate-800 text-white'>
            <Header />
            <div className='px-10 md:px-20 my-10'>
                <h2 className='font-bold text-4xl'>{mode === 'edit' ? 'Edit Listing' : 'Add a New Listing'}</h2>
                <form className='p-10 border rounded-xl mt-10' onSubmit={onSubmit}>
                    {/* Car Details */}
                    <div>
                        <h2 className='font-medium text-xl mb-6'>Car Details</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {CarDetails.CarDetails.map((item, index) => (
                                <div key={index}>
                                    <label className='text-sm flex gap-2 items-center mb-1'>
                                        <IconField icon={item.icon} />
                                        {item?.label} {item.required && <span className='text-red-500'>*</span>}
                                    </label>
                                    {item.fieldType === 'text' || item.fieldType === 'number' ? (
                                        <InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                                    ) : item.fieldType === 'dropdown' ? (
                                        <DropDown item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                                    ) : item.fieldType === 'textarea' ? (
                                        <TextAreaField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Features List */}
                    <div>
                        <h2 className='font-medium text-xl my-6'>Features</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                            {Features.features.map((item, index) => (
                                <div key={index} className='flex gap-2 items-center'>
                                    <Checkbox onCheckedChange={(value) => handleFeaturesChange(item.name, value)}
                                        checked={featuresData?.[item.name] || false} />
                                    <h2>{item.label}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Upload Car Images */}
                    <UploadImages
                        triggerUploadImages={triggerUploadImages}
                        carInfo={carInfo}
                        mode={mode}
                        setLoader={(v) => { setLoader(v); navigate('/profile'); }}
                    />

                    {/* Submit Button */}
                    <div className='mt-10 flex justify-end'>
                        <Button type="submit" disabled={loader} className="bg-slate-700">
                            {!loader ? 'Submit' : <TbLoader2 className='animate-spin text-lg' />}
                        </Button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddListing;
