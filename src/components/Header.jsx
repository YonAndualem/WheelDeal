import React from 'react'
import { SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import '@fontsource/montserrat';
import { Link } from 'react-router-dom';
import { MdOutlineNoteAdd } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";

function Header() {

    const { user, isSignedIn } = useUser();
    return (
        <div className='flex justify-between items-center shadow-sm bg-slate-900 text-white'>
            <Link to="/">
                <div className='justify-between flex items-center px-2'>
                    <img src="./logo.png" alt="logo" width={50} height={25} />
                    <p style={{ fontFamily: 'Montserrat' }}>Wheel Deal</p>
                </div>
            </Link>

            

            {isSignedIn ?
                <div className='flex items-center '>
                    <div className='flex items-center gap-5'>
                        <UserButton />
                        <Link to='/profile'>
                            <Button className="bg-slate-800" style={{ fontFamily: 'Montserrat' }}>Your Listings <FaListCheck /></Button>
                        </Link>
                        <Link to='/add-listing'>
                            <Button className="mr-2 bg-slate-800" style={{ fontFamily: 'Montserrat' }}>Submit Listing <MdOutlineNoteAdd /></Button>
                        </Link>
                    </div>
                    
                </div>
                :
                <SignInButton mode='modal'>
                    <Button className="mr-3 bg-slate-800">Sign In <FaSignInAlt /></Button>
                
                </SignInButton>
            }

        </div>
    )
}

export default Header
