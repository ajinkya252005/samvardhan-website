import React from 'react';
import { Link } from 'react-router-dom'; // Use Link instead of <a> for internal pages
import { FaInstagram, FaLinkedin, FaEnvelope, FaHeart, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../assets/Samvardhan-logo-final.png'; // Assuming same logo path

const Footer = () => {
    return (
        <footer className="bg-white border-t border-teal-100 pt-16 pb-8 font-ubuntu relative overflow-hidden">
            
            {/* Background Decorative Blob (Optional for "Floating" vibe) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-teal-50/50 blur-3xl rounded-full -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
                    
                    {/* --- Brand Section --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center md:text-left"
                    >
                        <Link to="/" className="flex flex-col md:flex-row items-center gap-3 group">
                            <img 
                                src={logo} 
                                alt="Samvardhan Logo" 
                                className="h-16 w-auto transition-transform group-hover:scale-105" 
                            />
                            <div>
                                <h2 className="text-4xl font-bold text-teal-800 tracking-wide">
                                    संवर्धन
                                </h2>
                                <p className="text-teal-600/80 text-2xl font-medium mt-1">
                                    Preserving Purity
                                </p>
                            </div>
                        </Link>
                    </motion.div>

                    {/* --- Quick Links (Pill Style) --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {['Our Work', 'Gallery', 'Donate'].map((item) => (
                            <Link 
                                key={item}
                                to={`/${item.toLowerCase().replace(' ', '')}`} 
                                className="px-5 py-2 rounded-full text-gray-600 hover:text-teal-700 hover:bg-teal-50 transition-all duration-300 text-sm font-bold border border-transparent hover:border-teal-100"
                            >
                                {item}
                            </Link>
                        ))}
                    </motion.div>

                    {/* --- Social Icons (Floating Circles) --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex space-x-4"
                    >
                        <SocialLink href="https://www.instagram.com/samvardhan_9/" icon={<FaInstagram />} color="hover:text-pink-600 hover:bg-pink-50" />
                        <SocialLink href="https://www.linkedin.com/company/samvardhan9/about/" icon={<FaLinkedin />} color="hover:text-blue-700 hover:bg-blue-50" />
                        <SocialLink href="samvardhan999@gmail.com" icon={<FaEnvelope />} color="hover:text-red-600 hover:bg-red-50" />
                    </motion.div>
                </div>

                {/* --- Divider --- */}
                <div className="border-t border-teal-100 mt-12 mb-8" />

                {/* --- Copyright Line --- */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row justify-center items-center text-center text-gray-500 text-sm gap-2"
                >
                  
                    <span className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></span>
                    <p>&copy; {new Date().getFullYear()} Samvardhan. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};

// Helper Component for Social Icons
const SocialLink = ({ href, icon, color }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 border border-gray-100 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 ${color}`}
    >
        {icon}
    </a>
);

export default Footer;