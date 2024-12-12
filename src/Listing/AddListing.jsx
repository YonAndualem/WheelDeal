import Header from '@/components/Header'
import React from 'react'
import CarDetails from '../components/Shared/CarDetails.json'
import InputField from './Components/InputField'
import DropDown from './Components/DropDown'
import TextArea from './Components/TextArea'

function AddListing() {
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
                                    <label className='text-sm'>{item?.label} {item.required&& <span className='text-red-500'>*</span>}</label>
                                    {item.fieldType == 'text' || item.fieldType == 'number' ? <InputField item={item} />
                                    : item.fieldType=='dropdown'?<DropDown item={item} />
                                    : item.fieldType=='textarea'? <TextArea item={item}/>
                                    :null}
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddListing