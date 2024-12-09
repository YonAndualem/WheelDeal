import React from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import '@fontsource/montserrat';

function Header() {

    const {user, isSignedIn} = useUser();
    return (
        <div className='flex justify-between items-center shadow-sm'>
            <div className='justify-normal flex items-center'>
                <img src="./logo.svg" alt="logo" width={50} height={25} />
                <p style={{ fontFamily: 'Montserrat' }}>Wheel Deal</p>
            </div>
            
            <ul className='hidden md:flex gap-16' style={{ fontFamily: 'Montserrat' }}>
                <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Home</li>
                <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Search</li>
                <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>New</li>
                <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>PreOwned</li>
            </ul>

            {isSignedIn ?
            <div className='flex items-center gap-5'>
                <UserButton/>
                <Button>Submit Listing</Button>
            </div>
            :
            <Button>Submit Listing</Button>
            }

        </div>
    )
}

export default Header