import Service from '@/components/Shared/Service'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import React from 'react'

function OwnersDetail({ carDetail }) {
    const { user } = useUser();
    const onMessageOwnerButtonClick = async () => {
        try {
            const userId = user.primaryEmailAddress?.emailAddress.split('@')[0];
            await Service.CreateSendBirdUser(userId, user?.fullName, user?.imageUrl)
            .then((resp) => {
                console.log(resp)
            })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='p-10 border rounded-xl shadow-md mt-5'>
            <h2 className='font-medium text-2xl mb-3'>Dealer Details</h2>
            <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full' alt="" />
            <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
            <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>
            
            <Button className='w-full mt-6'
            onClick = {onMessageOwnerButtonClick}>Message Owner</Button>
        </div>
    )
}

export default OwnersDetail