import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="min-h-screen bg-[#FDF8F0] pt-24 pb-12 font-ubuntu relative overflow-hidden">
            
            {/* Background Decorative Blobs */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-teal-100/40 blur-3xl rounded-full -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50/50 blur-3xl rounded-full -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Page Header --- */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Contact <span className="text-teal-600">Us</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Reach out to us to learn more about our initiatives or to join hands in our mission for environmental conservation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                    {/* --- Left Column: About Us / Director's Desk Redirect --- */}
                    {/* UPDATED: Added 'order-2 lg:order-1' to push it to bottom on mobile, but keep it first on desktop */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-10 rounded-3xl shadow-sm border border-teal-50 hover:shadow-md transition-all h-full flex flex-col justify-center items-center text-center order-2 lg:order-1"
                    >
                        <div className="mb-6 p-6 bg-teal-50 rounded-full text-teal-600">
                             <FaArrowRight size={40} className="-rotate-45" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Visionary</h3>
                        <p className="text-gray-600 text-lg mb-8 max-w-md">
                            Discover the thought leadership and vision driving Samvardhan's mission to preserve purity.
                        </p>
                        
                        <Link to="/about-us">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-teal-200 flex items-center gap-3 group"
                            >
                                About Us
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* --- Right Column: Contact Details & Social Media --- */}
                    {/* UPDATED: Added 'order-1 lg:order-2' to make it appear first on mobile */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 order-1 lg:order-2"
                    >
                        {/* 1. Phone Numbers (Teal Theme) */}
                        <div className="bg-teal-600 p-8 rounded-3xl shadow-lg text-white flex flex-col justify-between relative overflow-hidden group min-h-[200px] md:col-span-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                            <div className="relative z-10 flex items-start gap-4 mb-4">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-2xl">
                                    <FaPhoneAlt />
                                </div>
                                <h3 className="text-xl font-bold mt-1">Call Us</h3>
                            </div>
                            <div className="relative z-10 flex flex-col space-y-2 font-medium text-teal-50">
                                <a href="tel:+919028636288" className="hover:text-white hover:translate-x-1 transition-all">
                                    Shubham: +91 90286 36288
                                </a>
                                <a href="tel:+917620334946" className="hover:text-white hover:translate-x-1 transition-all">
                                    Krishna: +91 76203 34946
                                </a>
                            </div>
                        </div>

                        {/* 2. Email Address (White Theme) */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-teal-100 flex flex-col justify-between group md:col-span-2">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-teal-50 rounded-xl text-teal-600 text-2xl">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
                                    <p className="text-gray-400 text-xs">For collaborations & queries</p>
                                </div>
                            </div>
                            <a 
                                href="mailto:samvardhan999@gmail.com" 
                                className="text-lg text-gray-600 hover:text-teal-700 font-medium transition-colors break-all"
                            >
                                samvardhan999@gmail.com
                            </a>
                        </div>

                        {/* 3. Instagram (Gradient/Pink Theme) */}
                        <a 
                            href="https://www.instagram.com/samvardhan_9/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white p-8 rounded-3xl shadow-md border border-pink-100 hover:shadow-xl hover:border-pink-300 transition-all group flex flex-col items-center justify-center text-center gap-4"
                        >
                            <div className="p-4 bg-pink-50 text-pink-600 rounded-full text-3xl group-hover:scale-110 transition-transform">
                                <FaInstagram />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors">Instagram</h3>
                                <p className="text-sm text-gray-400">Follow our updates</p>
                            </div>
                        </a>

                        {/* 4. LinkedIn (Blue Theme) */}
                        <a 
                            href="https://www.linkedin.com/company/samvardhan9/about/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white p-8 rounded-3xl shadow-md border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all group flex flex-col items-center justify-center text-center gap-4"
                        >
                            <div className="p-4 bg-blue-50 text-blue-700 rounded-full text-3xl group-hover:scale-110 transition-transform">
                                <FaLinkedin />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">LinkedIn</h3>
                                <p className="text-sm text-gray-400">Connect with us</p>
                            </div>
                        </a>

                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;