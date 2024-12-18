import Header from '@/components/Header'
import React, { useState } from 'react'
import CarDetails from '../components/Shared/CarDetails.json'
import Features from '../components/Shared/Features.json'
import InputField from './Components/InputField'
import DropDown from './Components/DropDown'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { carListing } from '../../Configs/schema'
import { db } from '../../Configs/neon'
import TextAreaField from './Components/TextAreaField'
import IconField from './Components/IconField'
import UploadImages from './Components/UploadImages'
import { TbLoader2 } from "react-icons/tb";
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment'

function AddListing() {

    const [formData, setFormData] = useState ([]);
    const [featuresData, setFeaturesData] = useState ([]);
    const [triggerUploadImages, setTriggerUploadImages] = useState();
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
    //Use this function to handle the change in the form fields
    const handleInputChange = (name, value) =>{
        setFormData((prevData) =>({
            ...prevData,
            [name]:value
        }))
        console.log(formData);
    }
    //Use this function to handle the change in the features
    const handleFeaturesChange = (name, value) =>{
        setFeaturesData((prevData) =>({
            ...prevData,
            [name]:value
        }))
        console.log(featuresData);
    }

    const onSubmit = async (e) =>{
        setLoader(true);
        e.preventDefault();
        console.log(formData);
        toast('Please wait while we are adding the listing');
        try {
        const result =await db.insert(carListing).values({
            //Add the form data and features data here
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            postedOn: moment().format('DD/MM/YYYY')
        }).returning({id:carListing.id});

        if(result){
            console.log('Data Inserted Successfully');
            setTriggerUploadImages(result[0]?.id);
            setLoader(false);
        }} catch (error) {
            console.log("Error",error);
        }
    }

    return (
        <div>
            <Header />
            <div className='px-10 md:px-20 my-10'>
                <h2 className='font-bold text-4xl'>Add a New Listing</h2>
                <form className='p-10 border rounded-xl mt-10'>
                    {/* Car Details */}
                    <div>
                        <h2 className='font-medium text-xl mb-6'>Car Details</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {CarDetails.CarDetails.map((item, index)=>(
                                <div key={index}>
                                    <label className='text-sm flex gap-2 items-center mb-1'>
                                        <IconField icon={item.icon} />
                                        {item?.label} {item.required&& <span className='text-red-500'>*</span>}</label>
                                    {item.fieldType == 'text' || item.fieldType == 'number' ? <InputField item={item} handleInputChange={handleInputChange} />
                                    : item.fieldType=='dropdown'?<DropDown item={item} handleInputChange={handleInputChange}/>
                                    : item.fieldType == 'textarea' ? <TextAreaField item={item} handleInputChange={handleInputChange} />
                                    :null}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <Separator className="my-6"/>

                    {/* features List */}
                    <div>
                        <h2 className='font-medium text-xl my-6'>Features</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                            {Features.features.map((item, index)=>(
                                <div key={index} className='flex gap-2 items-center'>
                                    <Checkbox onCheckedChange={(value)=>handleFeaturesChange(item.name, value)} /> <h2>{item.label}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*Car Images*/}
                    <Separator className="my-6"/>
                    <UploadImages triggerUploadImages={triggerUploadImages} 
                    setLoader={(v) => {setLoader(v);navigate('/profile')}} />

                    {/* */}

                    <div className='mt-10 flex justify-end'>
                        <Button type="button" disabled={loader} onClick={(e)=>onSubmit(e)} >
                            {!loader ? 'Submit' : <TbLoader2 className='animate-spin text-lg' />}
                            </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddListing