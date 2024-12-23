import React from 'react'
import { MdCheck } from "react-icons/md";

function Features({features = {}}) {
const formatFeatureName = (name) => {
    return name
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

return (
    <div className='p-10 border shadow-md rounded-xl my-7'>
            <h2 className='font-medium text-2xl'>Features</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-8'>
                    {Object.entries(features).map(([feature, value]) => (
                            <div key={feature} className='flex items-center gap-2'>
                                    <MdCheck className='text-primary text-lg p-1 rounded-full bg-blue-100' />
                                    <h2>{formatFeatureName(feature)}</h2>
                            </div>
                    ))}
            </div>
    </div>
)
}

export default Features