import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function DropDown({ item, handleInputChange, carInfo }) {
    return (
        <div>
            <Select onValueChange={(value)=>handleInputChange(item.name, value)} required={item.required} defaultValue={carInfo?.[item?.name]}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={carInfo?.[item?.name] ? carInfo?.[item?.name] : item.label} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white">
                    {item?.options?.map((options, index)=>(
                        <SelectItem value={options}>{options}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}

export default DropDown