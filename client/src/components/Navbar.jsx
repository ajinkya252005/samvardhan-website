import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/Samvardhan-logo-final.png'; // <--- Importing the logo

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#ffffff] shadow-sm fixed w-full z-50 top-0 left-0 border-b border-teal-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20"> {/* Increased height slightly for logo */}
                    
                    {/* Logo & Brand Name */}
                    <Link to="/" className="flex items-center gap-1 group">
                        {/* Logo Image */}
                        <img 
                            src={logo} 
                            alt="Samvardhan Logo" 
                            className="h-16 w-auto transition transform group-hover:scale-105" 
                        />
                        
                        {/* Brand Name in Devanagari */}
                        <span className="text-3xl font-bold text-teal-700 font-ubuntu tracking-wide">
                            संवर्धन
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium font-ubuntu transition">Home</Link>
                        <Link to="/work" className="text-gray-700 hover:text-teal-600 font-medium font-ubuntu transition">Our Work</Link>
                        <Link to="/gallery" className="text-gray-700 hover:text-teal-600 font-medium font-ubuntu transition">Gallery</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-teal-600 font-medium font-ubuntu transition">Contact</Link>
                        <Link to="/donate">
                            <button className="bg-teal-600 text-white px-6 py-2 rounded-full font-bold hover:bg-teal-700 transition shadow-md font-ubuntu">
                                Donate Now
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-teal-700 hover:text-teal-900 focus:outline-none">
                            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-[#FDF8F0] border-t border-teal-100 absolute w-full left-0 shadow-xl">
                    <div className="px-4 pt-4 pb-6 space-y-2 text-center">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md font-medium font-ubuntu">Home</Link>
                        <Link to="/work" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md font-medium font-ubuntu">Our Work</Link>
                        <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md font-medium font-ubuntu">Gallery</Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md font-medium font-ubuntu">Contact</Link>
                        <Link to="/donate" onClick={() => setIsOpen(false)} className="block w-full text-center bg-teal-600 text-white px-5 py-3 mt-4 rounded-lg font-bold font-ubuntu shadow-md">
                            Donate Now
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;