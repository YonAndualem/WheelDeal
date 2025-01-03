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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
        setCarList(resp);
    }

    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listing</h2>
                <Link to='/add-listing'>
                    <Button className="bg-slate-700">
                        <MdOutlineNoteAdd /> Post a new Listing
                    </Button>
                </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                {carList.map((item, index) => (
                    <div key={index}>
                        <CarItem car={item} />
                        <div className='mt-2 p-2 bg-slate-800 rounded-lg flex justify-between gap-3'>
                            <Link to={'/add-listing?mode=edit&id=' + item.id} className='w-full'>
                                <Button variant="outline-none" className='w-full bg-slate-900'>Edit</Button>
                            </Link>

                            <AlertDialog>
                                <AlertDialogTrigger>
                                    
                                        <Button variant="destructive"><FaRegTrashAlt /></Button>
                                    
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-slate-900">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-white">
                                            This action cannot be undone. This will permanently delete your listing
                                            and remove your car data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600"
                                            onClick={async () => {
                                                try {
                                                    // First, delete associated car images
                                                    await db.delete(CarImages).where(eq(CarImages.carListingId, item.id));

                                                    // Then delete the car listing
                                                    await db.delete(carListing).where(eq(carListing.id, item.id));

                                                    console.log('Deleted car listing and associated images manually');

                                                    // Refresh the car listing after deletion
                                                    getUserCarListing();
                                                } catch (error) {
                                                    console.error('Error deleting car listing:', error);
                                                }
                                            }}

                                        >Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyListing