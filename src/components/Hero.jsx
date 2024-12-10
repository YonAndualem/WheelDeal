import Search from './Search'
import React from 'react'

function Hero() {
    return (
        <div>
            <div className='flex flex-col items-center p-10 py-20 gap-6 h-[600px] w-full bg-[#eef0fc]'>
                <h2 className='text-lg'>Discover Your Dream Ride, Buy or Rent with Ease Near You!</h2>
                <h2 className='text-[60px] font-bold'>The Perfect Ride Awaits You!</h2>

                <Search/>
                <img src='./car.png' alt='car' className='w-[75%] md:w-[50%]'/>
            </div>
        </div>
    )
}

export default Hero