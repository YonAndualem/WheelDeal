import React from 'react'
import Data from './Shared/Data'
import { Link } from 'react-router-dom'
function Categories() {
    return (
        <div className='mt-40'>
            <h2 className='font-bold text-3xl text-center mb-6'>Browse by type</h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20">
                {Data.Categories.map((category, index) => (
                    <Link to={'search/'+category.name}>
                        <div key={category.id} className="border rounded-xl p-3 items-center flex flex-col hover:shadow-md cursor-pointer">
                            <img src={category.icon} alt={category.name} width={60} height={60}/>
                            <h2 className="mt-2">{category.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Categories