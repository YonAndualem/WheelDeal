import Search from './Search'
import React from 'react'
import '@fontsource/montserrat';
function Hero() {
    return (
        <div>
            <div className='flex flex-col items-center gap-6'>
                <div className='flex flex-col items-center p-10 py-15 gap-6 h-[460px] w-full bg-slate-950 text-white'>
                    <h2 className='text-lg' style={{ fontFamily: ' Montserrat' }}>Discover Your Dream Ride, Buy or Rent with Ease Near You!</h2>
                    <h2 className='text-[60px] font-bold' style={{ fontFamily: ' Montserrat' }}>The Perfect Ride Awaits You!</h2>
                    <img src='./car.png' alt='car' className='w-[75%] md:w-[50%]' />
                </div>
                <Search />
            </div>
        </div>
    )
}

export default Hero