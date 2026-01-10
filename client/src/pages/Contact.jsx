import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

// !!! IMPORTANT: Ensure the file is named 'director.jpeg' in your assets folder
import directorImg from '../assets/director.jpeg'; 

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
                    <h1 className="text-4xl md:text-5xl font-bold text-grey-800 mb-4">
                        Contact <span className="text-teal-600">Us</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Reach out to us to learn more about our initiatives or to join hands in our mission for environmental conservation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                    {/* --- Left Column: Director & Vision --- */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-teal-50 hover:shadow-md transition-shadow h-full"
                    >
                        <div className="flex flex-col items-center text-center">
                            
                            {/* Director Image (Increased Size) */}
                            <div className="relative group mb-6">
                                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                                <img 
                                    src={directorImg} 
                                    alt="Ameya Kokate" 
                                    className="relative w-56 h-56 rounded-3xl object-cover border-4 border-white shadow-md"
                                    // Fallback just in case
                                    onError={(e) => {e.target.src='https://ui-avatars.com/api/?name=Ameya+Kokate&background=0d9488&color=fff&size=256'}}
                                />
                            </div>

                            <p className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">Director's Desk</p>
                            <h3 className="text-3xl font-bold text-gray-800 mb-6">Ameya Kokate</h3>
                            
                            {/* Extended Vision Text */}
                            <div className="text-gray-600 space-y-4 leading-relaxed text-lg px-2 md:px-8 text-justify">
                                <p>
                                    At Samvardhan, we believe true conservation encompasses both nature and humanity. Our mission extends far beyond planting trees; it is a holistic commitment to restoring our environment through cleanliness drives while simultaneously uplifting our community through food donation and welfare initiatives.                               
                               </p>
                                <p>
                                    We strive to create a cycle of care where protecting the planet and supporting its people go hand in hand. Every sapling planted, every street cleaned, and every meal served is a step towards a sustainable, compassionate future where both our ecosystem and our society can thrive together.                                
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Right Column: Contact Details (Moved here) --- */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col gap-8"
                    >
                        {/* Box 1: Phone Numbers */}
                        <div className="bg-teal-600 p-10 rounded-3xl shadow-lg text-white flex-1 flex flex-col justify-center relative overflow-hidden group">
                            {/* Decorative background circle */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700 ease-in-out"></div>
                            
                            <div className="relative z-10 flex items-start gap-6">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Call Us</h3>
                                    <div className="flex flex-col space-y-3 text-lg font-medium text-teal-50">
                                        <a href="tel:+917058049682" className="hover:text-white hover:translate-x-1 transition-all">
                                            +91 70580 49682
                                        </a>
                                        <a href="tel:+919049552446" className="hover:text-white hover:translate-x-1 transition-all">
                                            +91 90495 52446
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Box 2: Email Address */}
                        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-teal-100 flex-1 flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-50 rounded-full -ml-16 -mb-16 transition-transform group-hover:scale-150 duration-700 ease-in-out"></div>

                            <div className="relative z-10 flex items-start gap-4 md:gap-6">
                                <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-2xl text-teal-600 shrink-0">
                                    <FaEnvelope />
                                </div>
                                <div className="min-w-0"> {/* min-w-0 allows text truncate/wrap control in flex children if needed */}
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Email Us</h3>
                                    <a 
                                        href="mailto:samvardhan9@gmail.com" 
                                        className="text-base md:text-lg text-gray-600 hover:text-teal-700 font-medium transition-colors whitespace-nowrap"
                                    >
                                        samvardhan9@gmail.com
                                    </a>
                                    <p className="text-gray-400 text-sm mt-2">
                                        Drop us a mail for collaborations or queries.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;