import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react'; // ✅ Import Clerk to get logged-in user

const API_URL = import.meta.env.VITE_API_URL;

function Pricing({ carDetail }) {
  const { user } = useUser(); // ✅ Get logged-in user from Clerk
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (carDetail?.createdBy && user?.primaryEmailAddress?.emailAddress) {
      console.log("Car Created By:", carDetail.createdBy);
      console.log("Logged-in User Email:", user.primaryEmailAddress.emailAddress);

      // ✅ Convert both to lowercase for accurate comparison
      setIsOwner(carDetail.createdBy.toLowerCase() === user.primaryEmailAddress.emailAddress.toLowerCase());
    }
  }, [carDetail, user]);

  const toggleWishlist = async () => {
    try {
      if (isInWishlist) {
        // ✅ Remove from wishlist
        const response = await fetch(`${API_URL}/wishlist/${carDetail?.id}?userEmail=${encodeURIComponent(user.primaryEmailAddress.emailAddress)}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Removed from wishlist');
          setIsInWishlist(false);
        } else {
          toast.error('Failed to remove from wishlist');
        }
      } else {
        // ✅ Add to wishlist
        const response = await fetch(`${API_URL}/wishlist/${carDetail?.id}?userEmail=${encodeURIComponent(user.primaryEmailAddress.emailAddress)}`, {
          method: 'POST',
        });

        if (response.ok) {
          toast.success('Added to wishlist');
          setIsInWishlist(true);
        } else {
          toast.error('Failed to add to wishlist');
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="p-10 rounded-xl border shadow-md">
      <h2>Offer Price</h2>
      <h2 className="font-bold text-4xl">${carDetail?.sellingPrice ?? 'N/A'}</h2>

      {/* ✅ Button Layout - Full Width if Owner, Side by Side Otherwise */}
      <div className={`flex ${isOwner ? 'justify-center' : 'justify-between'} gap-4 mt-7`}>
        <Button className={`w-${isOwner ? 'full' : '1/2'} bg-slate-700 flex items-center justify-center`} size="lg">
          <MdOutlineLocalOffer className="text-lg mr-2" /> Make an Offer!
        </Button>

        {/* ✅ Show Wishlist Button only if the user is NOT the owner */}
        {!isOwner && (
          <Button
            className="w-1/2 bg-slate-700 flex items-center justify-center"
            size="lg"
            onClick={toggleWishlist}
          >
            {isInWishlist ? (
              <>
                <AiFillHeart className="text-lg mr-2 text-red-600" /> Remove
              </>
            ) : (
              <>
                <AiOutlineHeart className="text-lg mr-2" /> Wishlist
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Pricing;
