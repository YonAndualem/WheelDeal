import React from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import '@fontsource/montserrat';
import { Link } from 'react-router-dom';
import { MdOutlineNoteAdd } from "react-icons/md";

function Header() {

    const {user, isSignedIn} = useUser();
    return (
        <div className='flex justify-between items-center shadow-sm'>
            <div className='justify-between flex items-center px-2'>
                <img src="./logo.png" alt="logo" width={50} height={25} />
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
                <Link to='/profile'>
                        <Button className="mr-2">Submit Listing <MdOutlineNoteAdd /></Button>
                </Link>
            </div>
            :
            <Button>Submit Listing</Button>
            }

        </div>
    )
}

export default Header