import React from 'react';
import { FaClipboardList, FaTag, FaDollarSign, FaMoneyBillAlt, FaCar, FaCheckCircle, FaChargingStation, FaIndustry, FaCarSide, FaCalendarAlt, FaRoad, FaCogs, FaGasPump, FaTachometerAlt, FaWrench, FaCircle, FaPalette, FaDoorClosed, FaTags, FaFileAlt, FaIdCard } from 'react-icons/fa';


const iconMap = {
    FaClipboardList: <FaClipboardList />,
    FaTag: <FaTag />,
    FaDollarSign: <FaDollarSign />,
    FaMoneyBillAlt: <FaMoneyBillAlt />,
    FaCar: <FaCar />,
    FaCheckCircle: <FaCheckCircle />,
    FaChargingStation: <FaChargingStation />,
    FaIndustry: <FaIndustry />,
    FaCarSide: <FaCarSide />,
    FaCalendarAlt: <FaCalendarAlt />,
    FaRoad: <FaRoad />,
    FaCogs: <FaCogs />,
    FaGasPump: <FaGasPump />,
    FaTachometerAlt: <FaTachometerAlt />,
    FaWrench: <FaWrench />,
    FaCircle: <FaCircle />,
    FaPalette: <FaPalette />,
    FaDoorClosed: <FaDoorClosed />,
    FaTags: <FaTags />,
    FaFileAlt: <FaFileAlt />,
    FaIdCard: <FaIdCard />
};

function IconField({ icon }) {
    return (
        <div className='text-white bg-slate-900 p-1.5 rounded-full'>{iconMap[icon]}</div>
    )
}

export default IconField;