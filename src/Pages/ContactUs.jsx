import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function ContactUs() {
    return (
        <div>
            <div>
                <Header />
            </div>
        <div className="bg-slate-800 text-white min-h-screen flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-400 mb-8 text-center max-w-2xl">
                Have questions or need assistance? Reach out to us, and we'll get back to you as soon as possible.
            </p>

            <div className="w-full max-w-lg bg-slate-900 p-6 rounded-lg shadow-lg">
                <form>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Your Name</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-md bg-slate-800 text-white focus:outline-none"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm mb-2">Your Email</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-md bg-slate-800 text-white focus:outline-none"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm mb-2">Your Message</label>
                        <textarea
                            className="w-full p-3 rounded-md bg-slate-800 text-white focus:outline-none"
                            placeholder="Type your message here..."
                            rows="4"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-md transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            <div className="mt-10">
                <h3 className="text-lg font-bold">You can also reach us at:</h3>
                <p className="text-gray-400 mt-2">📍 1234 Street Name, City, Country</p>
                <p className="text-gray-400">📧 support@wheeldeal.com</p>
                <p className="text-gray-400">📞 +123 456 7890</p>
            </div>
        </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default ContactUs;
