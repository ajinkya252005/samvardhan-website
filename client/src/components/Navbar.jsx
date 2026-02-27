import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Samvardhan-logo-final.png';

const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' }, // <--- New Tab Added
    { name: 'Our Work', path: '/work' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(null);
    const location = useLocation(); // To know which page is active

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-50 top-0 left-0 border-b border-teal-100"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* --- Brand / Logo --- */}
                    <Link to="/" className="flex items-center gap-2 group z-50">
                        <motion.img 
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            src={logo} 
                            alt="Samvardhan Logo" 
                            className="h-14 w-auto" 
                        />
                        <span className="text-3xl font-bold text-teal-700 font-ubuntu tracking-wide">
                            संवर्धन
                        </span>
                    </Link>

                    {/* --- Desktop Menu (The Unique "Floating Pill" Effect) --- */}
                    <div className="hidden md:flex space-x-2 items-center relative">
                        {NAV_LINKS.map((link) => {
                            const isActive = location.pathname === link.path;

                            return (
                                <Link 
                                    key={link.path}
                                    to={link.path}
                                    onMouseEnter={() => setHoveredPath(link.path)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors font-ubuntu"
                                >
                                    {/* The Background Pill Animation */}
                                    {hoveredPath === link.path && (
                                        <motion.div
                                            layoutId="navbar-pill"
                                            className="absolute inset-0 bg-teal-50 rounded-full -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    
                                    {/* The Active Dot (Optional Indicator) */}
                                    {isActive && (
                                        <motion.span 
                                            layoutId="active-dot"
                                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-600 rounded-full"
                                        />
                                    )}

                                    <span className={`relative z-10 ${isActive ? 'text-teal-700' : 'text-gray-600'}`}>
                                        {link.name}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* Donate Button (Bouncing Effect) */}
                        <Link to="/donate" className="ml-4">
                            <motion.button 
                                whileHover={{ scale: 1.05, backgroundColor: "#0f766e" }} // Darker teal
                                whileTap={{ scale: 0.95 }}
                                className="bg-teal-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-teal-200 font-ubuntu"
                            >
                                Donate Now
                            </motion.button>
                        </Link>
                    </div>

                    {/* --- Mobile Toggle Button --- */}
                    <div className="md:hidden flex items-center z-50">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="text-teal-700 hover:text-teal-900 focus:outline-none p-2"
                        >
                            <motion.div
                                animate={isOpen ? "open" : "closed"}
                                variants={{
                                    open: { rotate: 180 },
                                    closed: { rotate: 0 }
                                }}
                            >
                                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu (Waterfall Animation) --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#FDF8F0] border-t border-teal-100 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col items-center">
                            {NAV_LINKS.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                    className="w-full text-center"
                                >
                                    <Link 
                                        to={link.path} 
                                        onClick={() => setIsOpen(false)} 
                                        className="block w-full py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg font-medium font-ubuntu transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="w-full pt-2"
                            >
                                <Link to="/donate" onClick={() => setIsOpen(false)}>
                                    <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold font-ubuntu shadow-md">
                                        Donate Now
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;