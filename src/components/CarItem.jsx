import React from 'react'
import { Separator } from './ui/separator'
import { LuFuel } from "react-icons/lu";
import { MdOutlineSpeed } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { TbAutomaticGearbox } from "react-icons/tb";
import { GiElectric } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";
import { Link } from 'react-router-dom';

function CarItem({ car }) {

    return (
        <Link to={'/listing-details/' + car?.id} >
            <div className='rounded-xl bg-slate-900 border hover:shadow-md cursor-pointer'>
                {new Date() - new Date(car?.timestamp) < 30 * 24 * 60 * 60 * 1000 && (
                    <h2 className='absolute m-2 bg-green-600 px-2 rounded-full text-sm text-white'>NEW</h2>
                )}
                <img src={car?.images[0]?.imageUrl} width={'100%'} height={200} alt={car.name} className='rounded-t-xl h-[180px] object-cover ' />

                <div className='p-4'>
                    <h2 className='font-bold text-white text-lg mb-2'>{car?.listingTitle}</h2>
                    <Separator />
                    <div className='grid grid-cols-3 mt-5'>
                        <div className='flex flex-col items-center'>
                            {car?.fuelType === 'Gasoline' || car?.fuelType === 'Diesel' ? (
                                <LuFuel className='text-lg mb-2' />
                            ) : car?.fuelType === 'Hybrid' ? (
                                <div className='flex space-x-2 mb-2'>
                                    <LuFuel className='text-lg' />
                                    <GiElectric className='text-lg' />
                                </div>
                            ) : (
                                <GiElectric className='text-lg mb-2' />
                            )}
                            <h2>{car?.fuelType}</h2>
                        </div>
                        <div className='flex flex-col items-center'>
                            <MdOutlineSpeed className='text-lg mb-2' />
                            <h2>{car?.mileage} Miles</h2>
                        </div>
                        <div className='flex flex-col items-center'>
                            {car?.transmission === 'Automatic' ? <TbAutomaticGearbox className='text-lg mb-2' /> : <TbManualGearbox className='text-lg mb-2' />}
                            <h2>{car?.transmission}</h2>
                        </div>
                    </div>
                    <Separator className="my-2" />
                    <div className='flex items-center justify-between'>
                        <h2 className='font-bold text-xl'>${car?.sellingPrice}</h2>
                        <h2 className='text-primary text-sm flex gap-2 items-center'>
                            View Details
                            <TbListDetails />
                        </h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CarItem