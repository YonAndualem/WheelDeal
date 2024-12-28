import React, { useEffect, useState } from 'react'
import FakeData from './Shared/FakeData'
import CarItem from './CarItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { CarImages, carListing } from '../../Configs/schema';
import { eq, desc } from 'drizzle-orm';
import { db } from '../../Configs/neon';
import Service from '../components/Shared/Service';


function MostSearched() {
    const [carList, setCarList] = useState([]);
    useEffect(() => {
        getPopularCarList()
    }, [])

    const getPopularCarList = async () => {
        const result = await db.select().from(carListing)
            .leftJoin(CarImages, eq(carListing.id, CarImages.carListingId))
            .orderBy(desc(carListing.id))
            .limit(10)

        const resp = Service.FormatResult(result);
        console.log(resp);
        setCarList(resp);
    }
    return (
        <div className='mx-24 '>
            <h2 className='font-bold text-3xl text-center mt-10 mb-10'>Available Listings</h2>

            <Carousel className="mb-10">
                <CarouselContent>
                    {carList.map((car, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <CarItem car={car} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-white bg-slate-900"/>
                <CarouselNext className="text-white bg-slate-900"/>
            </Carousel>
        </div>
    )
}

export default MostSearched