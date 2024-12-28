import React from 'react'
import Data from './Shared/Data'
import { Link } from 'react-router-dom'
function Categories() {
    return (
        <div className='py-8'>
            <h2 className='font-bold text-3xl text-center mb-6'>Browse by Type</h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20 ">
                {Data.Categories.map((category, index) => (
                    <Link to={'search/'+category.name} key={category.id}>
                        <div className="border rounded-xl p-3 items-center flex flex-col hover:shadow-2xl cursor-pointer bg-slate-900">
                            <img src={category.icon} alt={category.name} width={60} height={60} className='text-white' style={{ filter: 'invert(5)' }}/>
                            <h2 className="mt-2">{category.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Categories