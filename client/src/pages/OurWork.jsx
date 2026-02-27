import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';

const OurWork = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State to handle the full-screen image modal
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');
                
                // 1. Get today's date
                const today = new Date();
                
                // 2. Filter out future events (Only keep events where date is <= today)
                const pastEvents = res.data.filter(event => new Date(event.date) <= today);
                
                // 3. Sort them so the most recent events show up first
                pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

                setEvents(pastEvents);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError('Failed to load events. Server might be down.');
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Handle Escape key to close the modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-teal-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
        </div>
    );
    
    if (error) return <div className="text-center py-20 text-red-500 font-bold text-xl">{error}</div>;

    return (
        <div className="bg-[#FDF8F0] min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-ubuntu overflow-hidden relative">
            
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div 
                    animate={{ y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }} 
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ y: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }} 
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                
                {/* --- HEADER --- */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="flex items-center justify-center gap-2 text-orange-500 mb-2">
                        <GoGraph size={25} />
                        <span className="uppercase tracking-widest font-bold text-xl">Portfolio</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our <span className="text-teal-600">Work</span></h1>
                    <p className="text-xl text-teal-700 max-w-2xl mx-auto leading-relaxed">
                        A showcase of our past drives, initiatives, and impact.
                    </p>
                </motion.div>

                {/* --- STAGGERED PORTFOLIO GRID --- */}
                {events.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-400 text-lg">No past events found in the archives.</p>
                    </div>
                ) : (
                    // 2-Column Staggered Grid (items-start prevents stretching, gap adds spacing)
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 pb-20 items-start">
                        {events.map((event, index) => (
                            // The key to the staggered look: offset every second item on desktop
                            <div 
                                key={event._id} 
                                className={index % 2 !== 0 ? "md:mt-32" : ""}
                            >
                                <EventCard 
                                    event={event} 
                                    index={index} 
                                    onImageClick={() => setSelectedImage(event.imageUrl)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* --- FULL SCREEN IMAGE MODAL --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 cursor-zoom-out"
                    >
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
                        >
                            <FaTimes size={30} />
                        </button>
                        
                        <motion.img 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            src={selectedImage} 
                            alt="Full View" 
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- 3D TILT WRAPPER COMPONENT ---
const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`perspective-1000 ${className}`}
        >
            {children}
        </motion.div>
    );
};


// --- PORTFOLIO SHOWCASE CARD ---
const EventCard = ({ event, index, onImageClick }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }} 
            className="w-full"
        >
            <TiltCard className="w-full">
                {/* Changed background and border slightly to look more like a presentation card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col group transition-all hover:shadow-2xl">
                    
                    {/* Image Section - Uncropped, fully visual */}
                    <div 
                        className="w-full h-72 sm:h-80 bg-gray-50 relative cursor-zoom-in overflow-hidden p-4"
                        onClick={onImageClick}
                    >
                        {/* Inner wrapper to give the image a nice subtle "framed" look */}
                        <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-inner bg-white">
                            <img 
                                src={event.imageUrl} 
                                alt={event.title}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                        </div>
                        
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center rounded-t-3xl z-10">
                            <span className="text-white opacity-0 group-hover:opacity-100 bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 pointer-events-none transform translate-y-4 group-hover:translate-y-0 text-sm font-medium tracking-wide">
                                View Full Image
                            </span>
                        </div>
                    </div>

                    {/* Content Section - Distinct separation */}
                    <div className="p-8 sm:p-10 flex-grow flex flex-col relative bg-white">
                        {/* Decorative Top Border Line */}
                        <div className="absolute top-0 left-10 w-20 h-1 bg-gradient-to-r from-teal-500 to-orange-400 rounded-b-md"></div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full text-xs font-bold tracking-widest uppercase bg-teal-50 text-teal-700 w-fit border border-teal-100">
                            <FaCalendarAlt />
                            {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>

                        <h3 className="text-3xl font-black text-gray-800 mb-4 leading-tight group-hover:text-teal-600 transition-colors duration-300">
                            {event.title}
                        </h3>
                        
                        <p className="text-gray-500 text-base leading-relaxed">
                            {event.description}
                        </p>
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    );
};

export default OurWork;