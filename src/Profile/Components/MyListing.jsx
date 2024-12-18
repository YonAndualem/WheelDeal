import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineNoteAdd } from "react-icons/md";
import { Button } from '@/components/ui/button'
import { CarImages, carListing } from '../../../Configs/schema';
import { eq, desc } from 'drizzle-orm';
import { useUser } from '@clerk/clerk-react';
import { db } from '../../../Configs/neon';
import Service from '../../components/Shared/Service';
import CarItem from '@/components/CarItem';
import { FaRegTrashAlt } from "react-icons/fa";

function MyListing() {

    const { user } = useUser();
    const [carList, setCarList] = useState([])
    useEffect(() => {
        user && getUserCarListing()
    }, [user])

    const getUserCarListing=async()=>{
        const result = await db.select().from(carListing)
        .leftJoin(CarImages, eq(carListing.id, CarImages.carListingId))
        .where(eq(carListing.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(carListing.id))

        const resp = Service.FormatResult(result);
        console.log(resp);
        setCarList(resp);
    }

    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listing</h2>
                <Link to='/add-listing'>
                    <Button>
                        <MdOutlineNoteAdd /> Post a new Listing
                    </Button>
                </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                {carList.map((item, index) => (
                    <div key={index}>
                        <CarItem car={item} />
                        <div className='p-2 bg-gray-50 rounded-lg flex justify-between gap-3'>
                            <Button variant="outline" className='w-full'>Edit</Button>
                            <Button  variant="destructive"><FaRegTrashAlt/></Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyListing