import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function DropDown({ item }) {
    return (
        <div>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={item.label} />
                </SelectTrigger>
                <SelectContent>
                    {item?.options?.map((options, index)=>(
                        <SelectItem value={options}>{options}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}

export default DropDown