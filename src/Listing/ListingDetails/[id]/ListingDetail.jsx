import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../Components/DetailHeader'
import { useParams } from 'react-router-dom'
import { db } from '../../../../Configs/neon';
import { CarImages, carListing } from '../../../../Configs/schema';
import { eq } from 'drizzle-orm';
import Service from '@/components/Shared/Service';
import ImageGallery from '../Components/ImageGallery';
import Description from '../Components/Description';
import Features from '../Components/Features';
import Pricing from '../Components/Pricing';
import Specification from '../Components/Specification';
import OwnersDetail from '../Components/OwnersDetail';
import MostSearched from '@/components/MostSearched';
import Footer from '@/components/Footer';

function ListingDetail() {

    const { id } = useParams();
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
            <Header />
            <div className='p-10 md:px-20'>
                <DetailHeader carDetail={carDetail} />

                <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
                    {/*Left */}
                    <div className='md:col-span-2'>
                        {/*Image */}
                        <ImageGallery carDetail={carDetail} />
                        {/*Description */}
                        <Description carDetail={carDetail} />
                        {/*Features */}
                        <Features features={carDetail?.features} />

                    </div>
                    {/*Right */}
                    <div>
                        {/*Price */}
                        <Pricing carDetail={carDetail} />
                        {/*Car Details */}
                        <Specification carDetail={carDetail} />
                        {/*owner Details */}
                        <OwnersDetail carDetail={carDetail} />
                    </div>
                </div>
            </div>
            <MostSearched />
            <Footer />
        </div>
    )
}

export default ListingDetail