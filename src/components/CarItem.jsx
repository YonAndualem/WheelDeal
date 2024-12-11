import React from 'react'
import { Separator } from './ui/separator'
import { LuFuel } from "react-icons/lu";
import { MdOutlineSpeed } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { TbAutomaticGearbox } from "react-icons/tb";
import { GiElectric } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";

function CarItem({ car }) {
    return (
        <div className='rounded-xl bg-white border hover:shadow-md cursor-pointer'>
            <h2 className='absolute m-2 bg-red-500 px-2 rounded-full text-sm text-white'>NEW</h2>
            <img src={car.image} width={'100%'} height={200} alt={car.name} className='rounded-t-xl' />

            <div className='p-4'>
                <h2 className='font-bold text-black text-lg mb-2'>{car.name}</h2>
                <Separator />
                <div className='grid grid-cols-3 mt-5'>
                    <div className='flex flex-col items-center'>
                        {car.fuelType === 'Gasoline' || car.fuelType === 'Diesel' ? (
                            <LuFuel className='text-lg mb-2' />
                        ) : car.fuelType === 'Hybrid' ? (
                            <div className='flex space-x-2 mb-2'>
                                <LuFuel className='text-lg' />
                                <GiElectric className='text-lg' />
                            </div>
                        ) : (
                            <GiElectric className='text-lg mb-2' />
                        )}
                        <h2>{car.fuelType}</h2>
                    </div>
                    <div className='flex flex-col items-center'>
                        <MdOutlineSpeed className='text-lg mb-2' />
                        <h2>{car.miles} Miles</h2>
                    </div>
                    <div className='flex flex-col items-center'>
                        {car.gearType === 'Automatic' ? <TbAutomaticGearbox className='text-lg mb-2' /> : <TbManualGearbox className='text-lg mb-2' />}
                        <h2>{car.gearType}</h2>
                    </div>
                </div>
                <Separator className="my-2" />
                <div className='flex items-center justify-between'>
                    <h2 className='font-bold text-xl'>${car.price}</h2>
                    <h2 className='text-primary text-sm flex gap-2 items-center'>
                        View Details
                        <TbListDetails />
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default CarItem