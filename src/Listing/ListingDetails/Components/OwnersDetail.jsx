import { Button } from '@/components/ui/button'
import React from 'react'

function OwnersDetail({ carDetail }) {
    return (
        <div className='p-10 border rounded-xl shadow-md mt-5'>
            <h2 className='font-medium text-2xl mb-3'>Dealer Details</h2>
            <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full' alt="" />
            <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
            <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>
            
            <Button className='w-full mt-6 bg-slate-700'>Message Owner</Button>
        </div>
    )
}

export default OwnersDetail
