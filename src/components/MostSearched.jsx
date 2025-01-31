import React, { useEffect, useState } from 'react';
import CarItem from './CarItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

// 🔹 Load API URL from .env.local file instead of hardcoding it
const API_URL = import.meta.env.VITE_API_URL;

function MostSearched() {
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        getPopularCarList();
    }, []);

    const getPopularCarList = async () => {
        try {
            // 🔹 Changed from Drizzle ORM to Fetch API to get data from Spring Boot
            const response = await fetch(`${API_URL}/cars`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setCarList(data); // 🔹 Update state with API response
            console.log("Car listings fetched successfully:", data);
        } catch (error) {
            console.error("Error fetching car listings:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const nextButton = document.querySelector('.carousel-next');
            const carouselItems = document.querySelectorAll('.carousel-item');
            const activeItem = document.querySelector('.carousel-item.active');
            const isLastItem = activeItem === carouselItems[carouselItems.length - 1];

            if (isLastItem) {
                carouselItems[0].scrollIntoView({ behavior: 'smooth' });
            } else {
                nextButton.click();
            }
        }, 10000); // Change slide every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='mx-24 text-white bg-slate-800'>
            <h2 className='font-bold text-3xl text-center mt-10 mb-10'>Available Listings</h2>

            <Carousel className="mb-10">
                <CarouselContent>
                    {carList.map((car, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 carousel-item">
                            <CarItem car={car} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="carousel-previous text-white bg-slate-900" />
                <CarouselNext className="carousel-next text-white bg-slate-900" />
            </Carousel>
        </div>
    );
}

export default MostSearched;
