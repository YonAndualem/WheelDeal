import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CiSearch } from "react-icons/ci";
import Data from './Shared/Data.jsx'
import { Link } from 'react-router-dom';


function Search() {
    const [cars, setCars] = useState();
    const [make, setMake] = useState();
    const [price, setPrice] = useState();

    return (
        <div className='p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]'>
            <Select onValueChange={(value) => setCars(value)}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Old">Old</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select >
            <Separator orientation="vertical" className='hidden md:block' />
            <Select onValueChange={(value) => setMake(value)}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Manufacturers" />
                </SelectTrigger>
                <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {Data.Manufacturers.map((manufacturer, index) => (
                        <SelectItem key={index} value={manufacturer.name}>{manufacturer.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className='hidden md:block' />
            <Select onValueChange={(value) => setPrice(value)} >
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {Data.Pricing.map((price, index) => (
                        <SelectItem key={index} value={price.amount}>{price.amount}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Link to={"/search?cars=" + cars + "&make=" + make + "&price=" + price} >
                <CiSearch className='text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer ' />
            </Link>
        </div>
    )
}

export default Search