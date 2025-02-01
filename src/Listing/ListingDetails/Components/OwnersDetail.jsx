import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

function OwnersDetail({ carDetail }) {
    const navigate = useNavigate();

    const handleMessageOwner = () => {
        navigate("/profile?tab=chat", {
            state: {
                ownerEmail: carDetail?.createdBy,
                ownerName: carDetail?.userName,
                ownerImage: carDetail?.userImageUrl,
            },
        });
    };

    return (
        <div className="p-10 border rounded-xl shadow-md mt-5">
            <h2 className="font-medium text-2xl mb-3">Dealer Details</h2>
            <img
                src={carDetail?.userImageUrl}
                className="w-[70px] h-[70px] rounded-full"
                alt="User"
            />
            <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
            <h2 className="mt-2 text-gray-500">{carDetail?.createdBy}</h2>

            <Button
                onClick={handleMessageOwner}
                className="w-full mt-6 bg-slate-700"
            >
                Message Owner
            </Button>
        </div>
    );
}

export default OwnersDetail;
