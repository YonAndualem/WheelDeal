import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineNoteAdd } from "react-icons/md";
import { Button } from '@/components/ui/button'

function MyListing() {
    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listing</h2>
                <Link to='/add-listing'>
                    <Button>
                        <MdOutlineNoteAdd /> Post a new Listing
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default MyListing