import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    
                    {/* Brand Section */}
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-blue-500">SAMVARDHAN</h2>
                        <p className="text-gray-400 mt-2 text-sm">Empowering communities, one step at a time.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex space-x-6 mb-6 md:mb-0">
                        <a href="/work" className="text-gray-300 hover:text-white transition">Our Work</a>
                        <a href="/gallery" className="text-gray-300 hover:text-white transition">Gallery</a>
                        <a href="/donate" className="text-gray-300 hover:text-white transition">Donate</a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition text-xl"><FaInstagram /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition text-xl"><FaLinkedin /></a>
                        <a href="mailto:contact@samvardhan.org" className="text-gray-400 hover:text-red-500 transition text-xl"><FaEnvelope /></a>
                    </div>
                </div>

                {/* Copyright Line */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm flex justify-center items-center">
                    <p>Made with <FaHeart className="inline text-red-500 mx-1" /> by Samvardhan Interns &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;