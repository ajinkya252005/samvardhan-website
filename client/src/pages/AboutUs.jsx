import React from 'react';
import { motion } from 'framer-motion';
// Replace this path with the actual path to your top-left hand-and-tree logo
import logoImg from '../assets/Samvardhan-logo-final.png';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-[#FDF8F0] pt-24 pb-12 font-ubuntu relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100/40 blur-3xl rounded-full -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-teal-50"
                    >
                        <div className="flex flex-col items-center text-center">

                            {/* Hand and Tree Logo */}
                            <div className="relative group mb-8">
                                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                                <img
                                    src={logoImg}
                                    alt="Samvardhan Logo"
                                    // Changed object-cover to object-contain so the logo isn't cropped
                                    className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl object-contain bg-white border-4 border-white shadow-md p-4"
                                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Samvardhan&background=0d9488&color=fff&size=256' }}
                                />
                            </div>

                            <p className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">Who We Are</p>
                            <h1 className="text-4xl font-bold text-gray-800 mb-8">About Us</h1>

                            {/* About Us Text */}
                            <div className="text-gray-600 space-y-6 leading-relaxed text-lg text-justify md:px-10">
                                <p>
                                    At Samvardhan, we believe that true progress lies in nurturing both nature and humanity together. Founded on 22nd February, 2024 by Ameya Kokate, Samvardhan began as a single step towards creating a cleaner and more compassionate society. What started as one individual’s vision has today grown into a strong and dedicated family of more than 500 volunteers who share the same commitment to environmental conservation and community welfare.
                                    Our journey is rooted in action. Through regular cleanliness drives and tree plantation initiatives across Pune, we strive to restore and protect our environment while spreading awareness about sustainable living. At the same time, we actively engage in community welfare activities including donation drives, interaction programs at old age homes, engagement and play activities at orphanages, and support initiatives for homes of specially-abled individuals. We believe that meaningful change comes not only from preserving our surroundings but also from uplifting the people around us.                                </p>
                                <p>
                                    Over time, many well-known and influential personalities have joined and supported our mission, strengthening our reach and inspiring greater community participation. Every sapling planted, every street cleaned, and every smile shared reflects our belief that collective efforts can build a greener, kinder, and more responsible future. Samvardhan continues to grow as a movement driven by passion, unity, and the unwavering commitment to serve both the planet and its people.                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;