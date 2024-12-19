import Header from '@/components/Header'
import Search from '@/components/Search'
import { CarImages, carListing } from '../../../Configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../../Configs/neon';
import Service from '@/components/Shared/Service';
import CarItem from '@/components/CarItem';

function CategoryFilter() {

    const { category } = useParams();
    const [carList, setCarList] = useState([]);
    useEffect(() => {
        getCarList();
    }, [])
    const getCarList = async () => {
        const result = await db.select().from(carListing)
            .innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
            .where(eq(carListing.category, category))

        const resp = Service.FormatResult(result);
        setCarList(resp);
    }
    return (
        <div>
            <Header />
            <div className='p-16 bg-blue-700 flex justify-center'>
                <Search />
            </div>
            <div className='p-10 md:px-20'>
                <h2 className='font-bold text-4xl'>{category}</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                    {carList?.length>0? carList.map((item, index) => (
                        <div key={index} >
                            <CarItem car={item} />
                        </div>
                    )) : [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div className='animate-pulse h-[330px] rounded-xl bg-slate-200'>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default CategoryFilter