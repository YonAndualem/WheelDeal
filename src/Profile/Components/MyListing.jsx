import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineNoteAdd } from "react-icons/md";
import { Button } from '@/components/ui/button'
import { CarImages, carListing } from '../../../Configs/schema';
import { eq, desc } from 'drizzle-orm';
import { useUser } from '@clerk/clerk-react';
import { db } from '../../../Configs/neon';
import Service from '../../components/Shared/Service';

function MyListing() {

    const { user } = useUser();
    
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
        </div>
    )
}

export default MyListing