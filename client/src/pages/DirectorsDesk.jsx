import React from 'react';
import { motion } from 'framer-motion';
import directorImg from '../assets/director.jpeg'; 

const DirectorsDesk = () => {
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
                            
                            {/* Director Image */}
                            <div className="relative group mb-8">
                                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                                <img 
                                    src={directorImg} 
                                    alt="Ameya Kokate" 
                                    className="relative w-64 h-64 rounded-3xl object-cover border-4 border-white shadow-md"
                                    onError={(e) => {e.target.src='https://ui-avatars.com/api/?name=Ameya+Kokate&background=0d9488&color=fff&size=256'}}
                                />
                            </div>

                            <p className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">Director's Desk</p>
                            <h1 className="text-4xl font-bold text-gray-800 mb-8">Ameya Kokate</h1>
                            
                            {/* Vision Text */}
                            <div className="text-gray-600 space-y-6 leading-relaxed text-lg text-justify md:px-10">
                                <p>
                                    At Samvardhan, we believe true conservation encompasses both nature and humanity. Our mission extends far beyond planting trees; it is a holistic commitment to restoring our environment through cleanliness drives while simultaneously uplifting our community through food donation and welfare initiatives.                               
                               </p>
                                <p>
                                    We strive to create a cycle of care where protecting the planet and supporting its people go hand in hand. Every sapling planted, every street cleaned, and every meal served is a step towards a sustainable, compassionate future where both our ecosystem and our society can thrive together.                                
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DirectorsDesk;