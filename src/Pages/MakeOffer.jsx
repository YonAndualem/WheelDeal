import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL; // Backend API URL

function MakeOffer() {
    const location = useLocation();
    const navigate = useNavigate();
    const { sellerEmail, carTitle } = location.state || {};

    const [offerPrice, setOfferPrice] = useState("");

    const handleSubmitOffer = async (e) => {
        e.preventDefault();

        if (!offerPrice || isNaN(offerPrice) || offerPrice <= 0) {
            toast.error("Please enter a valid offer price.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/offers/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sellerEmail,
                    offerPrice,
                    carTitle,
                }),
            });

            if (response.ok) {
                toast.success("Offer sent successfully!");
                navigate("/"); // Redirect back to homepage or listing
            } else {
                toast.error("Failed to send offer. Try again.");
            }
        } catch (error) {
            console.error("Error sending offer:", error);
            toast.error("An error occurred. Try again later.");
        }
    };

    return (
        <div>
            <div>
                <Header />
            </div>
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
                <p className="text-gray-400 mb-4">
                    You're making an offer for <span className="font-semibold">{carTitle}</span>
                </p>
                <form onSubmit={handleSubmitOffer}>
                    <label className="block mb-2 text-gray-300">Enter your offer price ($)</label>
                    <input
                        type="number"
                        className="w-full p-3 bg-slate-700 rounded-md focus:outline-none text-white"
                        placeholder="Enter amount"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-md mt-4 transition"
                    >
                        Submit Offer
                    </button>
                </form>
            </div>
        </div>
        <div>
            <Footer />
        </div>
        </div>
    );
}

export default MakeOffer;
