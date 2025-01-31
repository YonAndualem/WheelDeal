import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function DropDown({ item, handleInputChange, carInfo }) {
    const [selectedValue, setSelectedValue] = useState(carInfo?.[item?.name] || "");

    useEffect(() => {
        setSelectedValue(carInfo?.[item?.name] || "");
    }, [carInfo]);

    return (
        <div>
            {/* Hidden Native Select for Form Validation */}
            <select
                required={item.required}
                className="hidden"
                value={selectedValue}
                onChange={(e) => handleInputChange(item.name, e.target.value)}
            >
                <option value="" disabled>{item.label}</option>
                {item?.options?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>

            {/* UI Select */}
            <Select
                onValueChange={(value) => {
                    setSelectedValue(value);
                    handleInputChange(item.name, value);
                }}
                value={selectedValue}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedValue || item.label} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white">
                    {item?.options?.map((option, index) => (
                        <SelectItem key={index} value={option}>{option}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default DropDown;
