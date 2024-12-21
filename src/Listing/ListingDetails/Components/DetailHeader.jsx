import React from 'react'
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlineSpeed } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { TbAutomaticGearbox } from "react-icons/tb";
import { GiElectric } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
function DetailHeader({ carDetail }) {
    return (
        <div>
            <h2 className='font-bold text-3xl'>{carDetail?.listingTitle}</h2>
            <p className='text-sm'>{carDetail?.tagLine}</p>

            <div className='flex gap-2 mt-3'>
                <div className='flex items-center gap-5 mt-5 bg-blue-50 rounded-full p-1 px-3'>
                    <IoCalendarNumberOutline className='h-7 w-7 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetail?.year}</h2>
                </div>
                <div className='flex items-center gap-5 mt-5 bg-blue-50 rounded-full p-1 px-3'>
                    <MdOutlineSpeed className='h-7 w-7 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetail?.mileage} KM's</h2>
                </div>
                <div className='flex items-center gap-5 mt-5 bg-blue-50 rounded-full p-1 px-3'>
                    {carDetail?.transmission === 'Automatic' ? <TbAutomaticGearbox className='h-7 w-7 text-primary' /> : <TbManualGearbox className='h-7 w-7 text-primary' />}
                    <h2 className='text-primary text-sm'>{carDetail?.transmission}</h2>
                </div>
                <div className='flex items-center gap-5 mt-5 bg-blue-50 rounded-full p-1 px-3'>
                    {carDetail?.fuelType === 'Gasoline' || carDetail?.fuelType === 'Diesel' ? (
                        <LuFuel className='h-7 w-7 text-primary' />
                    ) : carDetail?.fuelType === 'Hybrid' ? (
                        <div className='flex space-x-1'>
                            <LuFuel className='h-5 w-5 text-primary' />
                            <GiElectric className='h-5 w-5 text-primary' />
                        </div>
                    ) : (
                        <GiElectric className='h-7 w-7 text-primary' />
                    )}
                    <h2 className='text-primary text-sm'>{carDetail?.fuelType}</h2>
                </div>
            </div>
        </div>
    )
}

export default DetailHeader