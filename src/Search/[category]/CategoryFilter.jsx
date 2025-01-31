import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';
import Footer from '@/components/Footer';

// 🔹 Load API URL from .env.local file
const API_URL = import.meta.env.VITE_API_URL;

function CategoryFilter() {
    const { category } = useParams();
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCarList();
    }, [category]); // ✅ Re-fetch when category changes

    // ✅ Fetch cars by category from Spring Boot API
    const getCarList = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/cars/category/${category}`);
            if (!response.ok) {
                throw new Error("Failed to fetch cars");
            }
            const data = await response.json();
            setCarList(data);
        } catch (error) {
            console.error("Error fetching category cars:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className='p-10 md:px-20 bg-slate-800 text-white' style={{ minHeight: 'calc(100vh - 150px)' }}>
                <h2 className='font-bold text-4xl'>{category}</h2>
                {loading ? (
                    <div className='text-center text-gray-400 mt-5'>Loading cars...</div>
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
                    <div className='text-center text-gray-400 mt-5' tyle={{ minHeight: 'calc(100vh - 150px)' }}>No cars found for this category.</div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default CategoryFilter;
