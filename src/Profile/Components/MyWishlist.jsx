import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import CarItem from '@/components/CarItem';
import { toast } from 'sonner';
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

function MyWishlist() {
    const { user } = useUser(); // ✅ Get logged-in user
    const [wishlist, setWishlist] = useState([]);

    // ✅ Fetch Wishlist Items on Load
    useEffect(() => {
        if (user) {
            fetchWishlist();
        }
    }, [user]);

    const fetchWishlist = async () => {
        try {
            const response = await fetch(`${API_URL}/wishlist?userEmail=${encodeURIComponent(user?.primaryEmailAddress?.emailAddress)}`);
            if (response.ok) {
                const data = await response.json();
                setWishlist(data);
            } else {
                console.error('Failed to fetch wishlist');
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    // ✅ Remove from Wishlist
    const removeFromWishlist = async (carId) => {
        try {
            const response = await fetch(`${API_URL}/wishlist/${carId}?userEmail=${encodeURIComponent(user?.primaryEmailAddress?.emailAddress)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Removed from wishlist');
                fetchWishlist(); // Refresh Wishlist
            } else {
                toast.error('Failed to remove from wishlist');
            }
        } catch (error) {
            console.error('Error removing wishlist item:', error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className='p-3 md:px-1 bg-slate-800 text-white'>
            <h2 className='font-bold text-4xl'>My Wishlist</h2>

            {/* Wishlist Items */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7' style={{minHeight:'calc(50vh)'}} >
                {wishlist.length > 0 ? (
                    wishlist.map((item, index) => (
                        <div key={index}>
                            <CarItem car={item.carListing} />
                            <div className='mt-2 p-2 bg-slate-800 rounded-lg flex justify-between gap-3'>
                                {/* Remove from Wishlist */}
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <button className="bg-red-600 p-2 rounded text-white flex items-center gap-2">
                                            <FaRegTrashAlt /> Remove
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-slate-900">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription className="text-white">
                                                This action cannot be undone. This will remove the car from your wishlist.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-red-600"
                                                onClick={() => removeFromWishlist(item.carListing.id)}
                                            >
                                                Remove
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className='col-span-4 text-center text-gray-400 mt-10'>Your wishlist is empty.</h2>
                )}
            </div>
        </div>
    );
}

export default MyWishlist;
