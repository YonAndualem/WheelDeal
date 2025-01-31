import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineNoteAdd } from "react-icons/md";
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { toast, Toaster } from 'sonner'; // 🔹 Import Sonner's toast and Toaster
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
} from "@/components/ui/alert-dialog";

const API_URL = import.meta.env.VITE_API_URL;

function MyListing() {
    const { user } = useUser();
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        if (user) {
            getUserCarListing();
        }
    }, [user]);

    const getUserCarListing = async () => {
        try {
            const response = await fetch(`${API_URL}/cars/user/${user.primaryEmailAddress.emailAddress}`);
            if (!response.ok) {
                throw new Error("Failed to fetch user's car listings");
            }
            const data = await response.json();
            setCarList(data);
        } catch (error) {
            console.error("Error fetching car listings:", error);
            toast.error("Failed to load listings. Please try again."); // 🔹 Show error toast
        }
    };

    const deleteCarListing = async (carId) => {
        try {
            // 🔹 First, delete associated car images
            await fetch(`${API_URL}/car-images/${carId}`, {
                method: "DELETE",
            });

            // 🔹 Then delete the car listing
            const response = await fetch(`${API_URL}/cars/${carId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete car listing");
            }

            console.log('Deleted car listing and associated images successfully');
            toast.success("Listing deleted successfully!"); // 🔹 Success toast

            // Refresh car listings after deletion
            getUserCarListing();
        } catch (error) {
            console.error("Error deleting car listing:", error);
            toast.error("Error deleting listing. Please try again."); // 🔹 Error toast
        }
    };

    return (
        <div className='mt-6'>
            {/* Toaster for Sonner notifications */}
            {/* <Toaster position="top-right" expand /> */}

            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listings</h2>
                <Link to='/add-listing'>
                    <Button className="bg-slate-700">
                        <MdOutlineNoteAdd /> Post a New Listing
                    </Button>
                </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7' style={{ minHeight: 'calc(50vh)' }}>
                {carList.map((item, index) => (
                    <div key={index}>
                        <CarItem car={item} />
                        <div className='mt-2 p-2 bg-slate-800 rounded-lg flex justify-between gap-3'>
                            <Link
                                to={`/add-listing?mode=edit&id=${item.id}`}
                                className='w-full'
                                onClick={() => toast("Edit mode activated!")} // 🔹 Info toast for edit
                            >
                                <Button variant="outline-none" className='w-full bg-slate-900'>Edit</Button>
                            </Link>

                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button variant="destructive"><FaRegTrashAlt /></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-slate-900">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-white">
                                            This action cannot be undone. This will permanently delete your listing
                                            and remove your car data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bg-red-600"
                                            onClick={() => deleteCarListing(item.id)}
                                        >Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyListing;
