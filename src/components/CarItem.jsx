import React from 'react'
import { Separator } from './ui/separator'
import { LuFuel } from "react-icons/lu";
import { MdOutlineSpeed } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { TbAutomaticGearbox } from "react-icons/tb";
import { GiElectric } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CarItem({ car }) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car?.images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [car?.images.length]);

    return (
        <Link to={'/listing-details/' + car?.id} >
            <div className='rounded-xl bg-slate-900 border hover:shadow-md cursor-pointer'>
                
                    <h2 className='absolute m-2 bg-green-600 px-2 rounded-full text-sm text-white'>NEW</h2>
                
                <img
                    src={car?.images[currentImageIndex]?.imageUrl}
                    width={'100%'}
                    height={200}
                    alt={car.name}
                    className='rounded-t-xl h-[180px] object-cover'
                />

                <div className='p-4 text-white'>
                    <h2 className='font-bold text-white text-lg mb-2'>{car?.listingTitle}</h2>
                    <Separator />
                    <div className='grid grid-cols-3 mt-5 '>
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