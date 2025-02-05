import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';
import Footer from '@/components/Footer';

//  Load API URL from .env.local file
const API_URL = import.meta.env.VITE_API_URL;

function SearchOptions() {
    const [searchParam] = useSearchParams();
    const condition = searchParam.get('cars');
    const make = searchParam.get('make');
    const price = searchParam.get('price'); //  Fetch price from search params
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSearchResults();
    }, [condition, make, price]); //  Re-run effect when search params change

    //  Fetch search results from Spring Boot API
    const getSearchResults = async () => {
        setLoading(true);
        setError(null);
        try {
            // Build query parameters dynamically
            const params = new URLSearchParams();
            if (condition) params.append("condition", condition);
            if (make) params.append("make", make);
            if (price) params.append("price", price.replace(/\$/g, '').replace(/,/g, '')); //  Ensure proper price format

            const response = await fetch(`${API_URL}/cars/search?${params.toString()}`);
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data = await response.json();
            setCarList(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            
            <div className='p-10 md:px-20 bg-slate-800 text-white'>
                <h2 className='font-bold text-4xl'>Search Results...</h2>
                {loading ? (
                    <div className='text-center text-gray-400 mt-5'>Loading results...</div>
                ) : error ? (
                    <div className='text-center text-red-500 mt-5'>{error}</div>
                ) : carList.length > 0 ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                        {carList.map((item, index) => (
                            <div key={index}>
                                <CarItem car={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                                <div className='text-center text-gray-400 mt-5' style={{ minHeight: 'calc(60vh)' }}>No results found for your search.</div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SearchOptions;
