import Service from '@/components/Shared/Service';
import { db } from '../../Configs/neon';
import { CarImages, carListing } from '../../Configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { useSearchParams } from 'react-router-dom'
import Header from '@/components/Header';
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';
import Footer from '@/components/Footer';

function SearchOptions() {
    const [searchParam] = useSearchParams();
    const condition = searchParam.get('cars');
    const make = searchParam.get('make');
    const [carList, setCarList] = useState([]);
    

    useEffect(() => {
        getSearchResults();
    }, [])

    const getSearchResults = async () => {
        const result =await db.select().from(carListing)
            .innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
            .where(condition != undefined && eq(carListing.condition, condition))
            .where(make != undefined && eq(carListing.make, make))

            const resp = Service.FormatResult(result);
            console.log(resp)
            setCarList(resp);
    }
    return (
        <div>
            <Header />
            <div className='p-16 bg-slate-800 flex justify-center'>
                <Search />
            </div>
            <div className='p-10 md:px-20 bg-slate-800 text-white'>
                <h2 className='font-bold text-4xl'>Search Results...</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                    {carList?.length > 0 ? carList.map((item, index) => (
                        <div key={index} >
                            <CarItem car={item} />
                        </div>
                    )) : [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div className='animate-pulse h-[250px] rounded-xl bg-slate-700'>
                        </div>
                    ))}
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default SearchOptions