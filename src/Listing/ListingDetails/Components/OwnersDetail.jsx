import React from 'react'

function OwnersDetail({ carDetail }) {
    return (
        <div className='p10 border rounded-xl shadow-md mt-7 '>
            <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full m-2' alt="" />
        </div>
    )
}

export default OwnersDetail