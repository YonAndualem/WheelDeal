import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../Components/DetailHeader'
import { useParams } from 'react-router-dom'
import { db } from '../../../../Configs/neon';
import { CarImages, carListing } from '../../../../Configs/schema';
import { eq } from 'drizzle-orm';
import Service from '@/components/Shared/Service';

function ListingDetail() {

    const {id} = useParams();
    const [carDetail, setCarDetail] = useState();

    useEffect(() => {
        getCarDetail()
    }, [])

    const getCarDetail = async () => {
        const result = await db.select().from(carListing)
        .innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
        .where(eq(carListing.id, id))

        const resp = Service.FormatResult(result);
        setCarDetail(resp[0])
    }
  return (
    <div>
        <Header/>
        <div className='p-10 md:px-20'>
            <DetailHeader carDetail={carDetail}/>
        </div>
    </div>
  )
}

export default ListingDetail