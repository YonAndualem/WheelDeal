import CarSpecification from '@/components/Shared/CarSpecification'
import IconField from '@/Listing/Components/IconField'
import React from 'react'

function Specification({carDetail}) {
    console.log(carDetail)
  return (
    <div className='p-10 rounded-xl border shadow-md mt-7 pt-4'>
        <h2 className='font-medium text-2xl pb-3'>Specifications</h2>
        {CarSpecification.map((item, index)=>(
            <div key={index} className='mt-5 flex items-center justify-between'>
                <h2 className='flex gap-3'><IconField icon={item.icon} /> {item.label}</h2>
                <h2>{carDetail ? carDetail[item.name] || 'N/A' : 'N/A'}</h2>
            </div>
        ))}
    </div>
  )
}

export default Specification