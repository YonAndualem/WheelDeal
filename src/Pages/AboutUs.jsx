import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

function AboutUs() {
    return (
        <div>
            <div>
                <Header/>
            </div>
        <div className="bg-slate-800 text-white min-h-screen flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <p className="text-gray-400 mb-6 text-center max-w-2xl">
                Welcome to Wheel Deal – your ultimate platform for buying and selling cars seamlessly.
                Our goal is to connect buyers and sellers with a smooth, reliable, and trustworthy experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                <div className="bg-slate-900 p-6 rounded-lg shadow-lg hover:bg-slate-800">
                    <h3 className="text-2xl font-bold mb-2">🚗 Our Mission</h3>
                    <p className="text-gray-400">
                        We aim to revolutionize the way people buy and sell cars by providing a user-friendly
                        platform with secure transactions and a seamless browsing experience.
                    </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg shadow-lg hover:bg-slate-800">
                    <h3 className="text-2xl font-bold mb-2">🔧 How It Works</h3>
                    <p className="text-gray-400">
                        - Sellers can list their cars with detailed specifications, images, and pricing.<br />
                        - Buyers can browse, filter, and directly chat with sellers.<br />
                        - Secure payment options and verified listings ensure a safe transaction.
                    </p>
                </div>
            </div>

            <div className="mt-10 text-center max-w-2xl">
                <h3 className="text-2xl font-bold mb-2">🌍 Why Choose Wheel Deal?</h3>
                <p className="text-gray-400">
                    - Trusted Marketplace: Verified listings and users.<br />
                    - User-Friendly: Intuitive and easy-to-use interface.<br />
                    - Secure Transactions: Ensuring a safe and hassle-free car trading experience.<br />
                </p>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold">📩 Get in Touch</h3>
                <p className="text-gray-400">📧 support@wheeldeal.com | 📞 +123 456 7890</p>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
        </div>
    );
}

export default AboutUs;
