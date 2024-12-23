import CarSpecification from '@/components/Shared/CarSpecification'
import IconField from '@/Listing/Components/IconField'
import React from 'react'

function Specification({carDetail}) {
    console.log(carDetail)
  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
        {CarSpecification.map((item, index)=>(
            <div className='mt-5'>
                
                <h2 className='flex gap-3'><IconField icon={item.icon} /> {item.label}</h2>
            </div>
        ))}
    </div>
  )
}

export default Specification