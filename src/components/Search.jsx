import React from 'react'
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

function Search() {
    return (
        <div className='p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]'>
            <Select>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">New</SelectItem>
                    <SelectItem value="dark">Old</SelectItem>
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className='hidden md:block' />
            <Select>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Manufacturers" />
                </SelectTrigger>
                <SelectContent style={{maxHeight: '200px', overflowY: 'auto'}}>
                    {Data.Manufacturers.map((manufacturer, index)=>(
                         <SelectItem key={index} value={manufacturer.name}>{manufacturer.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className='hidden md:block'/>
            <Select>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {Data.Pricing.map((price, index)=>(
                        <SelectItem key={index} value={price.amount}>{price.amount}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div>
                <CiSearch className='text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer '/>
            </div>
        </div>
    )
}

export default Search