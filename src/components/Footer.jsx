import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-slate-900 text-gray-300">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">

                    {/* Logo and Branding */}
                    <Link to="/" className="flex justify-center sm:justify-start gap-6 items-center hover:text-white transition">
                        <img src="/logo.png" alt="WheelDeal Logo" width={50} height={50} />
                        <h2 className="font-semibold text-xl text-gray-100">WheelDeal</h2>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="flex justify-center gap-6 mt-4 sm:mt-0">
                        <Link to="/about" className="hover:text-white transition">
                            About Us
                        </Link>
                        <Link to="/contact" className="hover:text-white transition">
                            Contact Us
                        </Link>
                    </nav>

                    {/* Copyright Notice */}
                    <p className="mt-4 text-center text-sm lg:mt-0 lg:text-right">
                        Copyright &copy; 2025. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
