import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../Components/DetailHeader'
import { useParams } from 'react-router-dom'
import ImageGallery from '../Components/ImageGallery';
import Description from '../Components/Description';
import Features from '../Components/Features';
import Pricing from '../Components/Pricing';
import Specification from '../Components/Specification';
import OwnersDetail from '../Components/OwnersDetail';
import MostSearched from '@/components/MostSearched';
import Footer from '@/components/Footer';

//  Load API URL from .env.local file
const API_URL = import.meta.env.VITE_API_URL;

function ListingDetail() {
    const { id } = useParams();
    const [carDetail, setCarDetail] = useState(null);

    useEffect(() => {
        getCarDetail();
    }, []);

    //  Fetch car details from Spring Boot API
    const getCarDetail = async () => {
        try {
            const response = await fetch(`${API_URL}/cars/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch car details");
            }
            const data = await response.json();
            setCarDetail(data);
        } catch (error) {
            console.error("Error fetching car details:", error);
        }
    };

    return (
        <div className='bg-slate-800'>
            <Header />
            <div className='p-10 md:px-20 text-white bg-slate-800'>
                <DetailHeader carDetail={carDetail} />

                <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
                    {/* Left Section */}
                    <div className='md:col-span-2'>
                        {/* Image Gallery */}
                        <ImageGallery carDetail={carDetail} />
                        {/* Description */}
                        <Description carDetail={carDetail} />
                        {/* Features */}
                        <Features features={carDetail?.features} />
                    </div>

                    {/* Right Section */}
                    <div>
                        {/* Pricing */}
                        <Pricing carDetail={carDetail} />
                        {/* Car Specifications */}
                        <Specification carDetail={carDetail} />
                        {/* Owner Details */}
                        <OwnersDetail carDetail={carDetail} />
                    </div>
                </div>
            </div>
            <MostSearched />
            <Footer />
        </div>
    );
}

export default ListingDetail;
