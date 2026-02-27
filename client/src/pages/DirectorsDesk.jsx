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
                                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Ameya+Kokate&background=0d9488&color=fff&size=256' }}
                                />
                            </div>

                            <p className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">Director's Desk</p>
                            <h1 className="text-4xl font-bold text-gray-800 mb-8">Ameya Kokate</h1>

                            {/* Vision Text */}
                            <div className="text-gray-600 space-y-6 leading-relaxed text-lg text-justify md:px-10">
                                <p>
                                    At Samvardhan, our conviction is simple yet profound — the destiny of humanity is inseparable from the destiny of our planet. What began on 22nd February, 2024 as a solitary resolve to make a difference has evolved into a collective movement driven by conscience, compassion, and commitment.
                                </p>
                                <p>
                                    We do not perceive environmental conservation and community welfare as parallel pursuits, but as intertwined responsibilities. A cleaner street, a planted sapling, a shared meal, or a moment spent with those in need — each action represents a deliberate step toward restoring balance between society and nature. True progress, in our view, is measured not merely by growth, but by the positive footprint we leave behind.
                                </p>
                                <p>
                                    The strength of Samvardhan lies in its people — a growing family of volunteers and supporters who believe that meaningful transformation begins at the grassroots level. Together, we strive to cultivate awareness, inspire civic responsibility, and foster a culture where service is not an obligation, but a way of life.
                                    </p>
                                    <p>
                                        As we move forward, our commitment remains unwavering: to build a greener environment, a more compassionate society, and a future defined by collective stewardship. The journey is ongoing, but with shared purpose and sustained action, I am confident that the impact we create will endure for generations to come.
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