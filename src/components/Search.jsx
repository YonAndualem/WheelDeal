import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import Data from './Shared/Data.jsx';
import { Link } from 'react-router-dom';

function Search() {
    const [cars, setCars] = useState('');
    const [make, setMake] = useState('');
    const [price, setPrice] = useState('');

    const buildSearchUrl = () => {
        const params = new URLSearchParams();
        if (cars) params.append("cars", cars);
        if (make) params.append("make", make);
        if (price) params.append("price", price.replace(/\$/g, '').replace(/,/g, '')); // ✅ Remove `$` and `,`

        return `/search?${params.toString()}`;
    };


    return (
        <div className='mt-5'>
            <div>
                <Separator orientation="horizontal" className='hidden md:block text-white' />
            </div>
            <div className='p-2 md:p-5 bg-slate-800 flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%] text-white'>
                {/* Condition Dropdown */}
                <Select onValueChange={(value) => setCars(value)}>
                    <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                        <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent className='bg-slate-800 text-white'>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Used">Used</SelectItem>
                        <SelectItem value="Certified Pre-Owned">Preowned Abroad</SelectItem>
                    </SelectContent>
                </Select>

                <Separator orientation="vertical" className='hidden md:block' />

                {/* Manufacturer Dropdown */}
                <Select onValueChange={(value) => setMake(value)}>
                    <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                        <SelectValue placeholder="Manufacturers" />
                    </SelectTrigger>
                    <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }} className='bg-slate-800 text-white'>
                        {Data.Manufacturers.map((manufacturer, index) => (
                            <SelectItem key={index} value={manufacturer.name}>{manufacturer.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Separator orientation="vertical" className='hidden md:block' />

                {/* Pricing Dropdown (Optional) */}
                <Select onValueChange={(value) => setPrice(value)}>
                    <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                        <SelectValue placeholder="Pricing" />
                    </SelectTrigger>
                    <SelectContent className='bg-slate-800 text-white'>
                        {Data.Pricing.map((price, index) => (
                            <SelectItem key={index} value={price.amount}>{price.amount}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Search Button */}
                <Link to={buildSearchUrl()}>
                    <CiSearch className='text-[50px] bg-slate-950 rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer' />
                </Link>
            </div>
        </div>
    );
}

export default Search;
