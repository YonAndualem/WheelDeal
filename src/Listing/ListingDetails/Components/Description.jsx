import React from 'react'

function Description({carDetail}) {
  return (
    <div className='p-10 bg-slate-800 shadow-md mt-6 '>
        <h2 className='my-2 font-medium text-2xl'>Description</h2>
        <p>{carDetail?.listingDescription}</p>
    </div>
  )
}

export default Description