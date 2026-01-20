import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FaCalendarAlt, FaQuoteRight } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';

const OurWork = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const containerRef = useRef(null);

    // --- SCROLL PROGRESS ANIMATION ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });
    
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events');
                setEvents(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError('Failed to load events. Server might be down.');
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-teal-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
        </div>
    );
    
    if (error) return <div className="text-center py-20 text-red-500 font-bold text-xl">{error}</div>;

    return (
        <div ref={containerRef} className="bg-[#FDF8F0] min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-ubuntu overflow-hidden relative">
            
            {/* Background Decorative Blobs (Animated) */}
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

            <div className="max-w-[1400px] mx-auto relative z-10">
                
                {/* --- HEADER (UNCHANGED AS REQUESTED) --- */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="flex items-center justify-center gap-2 text-orange-500 mb-2">
                        <GoGraph size={25} />
                        <span className="uppercase tracking-widest font-bold text-xl">Timeline</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our <span className="text-teal-600">Journey</span></h1>
                    <p className="text-xl text-teal-700 max-w-2xl mx-auto leading-relaxed">
                        Witnessing our growth, one event at a time.
                    </p>
                </motion.div>

                {/* --- TIMELINE CONTAINER --- */}
                <div className="relative">
                    
                    {/* 1. TIMELINE LINE (Scroll Animated) */}
                    
                    {/* DESKTOP LINE (Center) */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gray-200/50 rounded-full z-0">
                        {/* The Filling Gradient Line - UPDATED GRADIENT */}
                        <motion.div 
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-teal-600 via-gray-200 to-teal-700 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                        />
                    </div>

                    {/* MOBILE LINE (Left Side) */}
                    <div className="md:hidden absolute left-4 h-full w-1.5 bg-gray-200/50 rounded-full z-0">
                        {/* UPDATED GRADIENT FOR MOBILE */}
                        <motion.div 
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-teal-600 via-gray-200 to-teal-700 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                        />
                    </div>

                    <div className="space-y-24 md:space-y-36 pb-20"> 
                        {events.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-400 text-lg">No events found in the archives.</p>
                            </div>
                        ) : (
                            events.map((event, index) => (
                                <TimelineItem key={event._id} event={event} index={index} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3D TILT WRAPPER COMPONENT ---
// This uses Framer Motion to calculate mouse position relative to the card
// and applies a 3D rotation transform.
const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        
        // Normalize values between -0.5 and 0.5
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


// --- TIMELINE ITEM ---
const TimelineItem = ({ event, index }) => {
    const isEven = index % 2 === 0;
    const year = new Date(event.date).getFullYear();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative"
        >
            {/* =========================================
                DESKTOP VIEW (Split Layout)
               ========================================= */}
            <div className="hidden md:grid md:grid-cols-9 items-center relative gap-8">
                
                {/* LEFT SIDE */}
                <div className={`col-span-4 ${isEven ? 'text-right' : 'text-left'} order-1`}>
                    <TiltCard className="w-full h-full">
                        {isEven ? (
                            <PhotoCard imageUrl={event.imageUrl} title={event.title} />
                        ) : (
                            <TextCard event={event} align="left" />
                        )}
                    </TiltCard>
                </div>

                {/* CENTER MARKER */}
                <div className="col-span-1 flex justify-center items-center relative order-2 z-20">
                    <YearMarker year={year} />
                </div>

                {/* RIGHT SIDE */}
                <div className={`col-span-4 ${isEven ? 'text-left' : 'text-right'} order-3`}>
                    <TiltCard className="w-full h-full">
                        {isEven ? (
                            <TextCard event={event} align="right" />
                        ) : (
                            <PhotoCard imageUrl={event.imageUrl} title={event.title} />
                        )}
                    </TiltCard>
                </div>
            </div>

            {/* =========================================
                MOBILE VIEW (Merged Layout)
               ========================================= */}
            <div className="md:hidden flex gap-6 pl-2 relative">
                {/* LEFT MARKER */}
                <div className="flex-shrink-0 z-10 pt-8">
                     <YearMarker year={year} small />
                </div>

                {/* RIGHT CARD */}
                <div className="flex-grow">
                    <motion.div 
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-white/50 relative"
                    >
                        {/* Full Image Display */}
                        <div className="w-full relative bg-gray-100">
                             <img 
                                src={event.imageUrl} 
                                alt={event.title}
                                className="w-full h-auto object-contain"
                            />
                            {/* Date Badge Overlay */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-teal-50">
                                <div className="text-center leading-none">
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                    </span>
                                    <span className="block text-xl font-black text-teal-600">
                                        {new Date(event.date).getDate()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 relative">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                                {event.title}
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                {event.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

        </motion.div>
    );
};

// --- VISUAL COMPONENTS ---

const YearMarker = ({ year, small }) => (
    <motion.div 
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative group cursor-pointer"
    >
        <div className={`${small ? 'w-14 h-14 border-[3px]' : 'w-24 h-24 border-[6px]'} bg-white border-teal-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.4)] relative z-10`}>
            <div className="flex flex-col items-center leading-none">
                <span className={`${small ? 'text-sm' : 'text-2xl'} font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-600 to-orange-500 font-ubuntu`}>
                    {year}
                </span>
            </div>
        </div>
        {/* Glowing Pulse Behind */}
        <div className="absolute inset-0 bg-teal-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
    </motion.div>
);

const PhotoCard = ({ imageUrl, title }) => {
    return (
        <div className="h-full w-full relative group rounded-2xl p-2 bg-white/40 backdrop-blur-sm border border-white/60 shadow-lg">
            {/* The Photo Frame */}
            <div className="overflow-hidden rounded-xl bg-gray-100 relative shadow-inner aspect-[4/3]">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full ease-in-out"></div>
            </div>
        </div>
    );
};

const TextCard = ({ event, align }) => {
    // Generate a subtle gradient background based on alignment
    const bgGradient = align === 'left' 
        ? "bg-gradient-to-br from-white via-white to-teal-50" 
        : "bg-gradient-to-bl from-white via-white to-orange-50";

    return (
        <div className={`
            h-full flex flex-col justify-center p-10 rounded-3xl shadow-xl border border-white/60 relative overflow-hidden group
            ${bgGradient} ${align === 'left' ? 'text-right items-end' : 'text-left items-start'}
        `}>
            {/* Moving Background Blob */}
            <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Infinity }}
                className={`absolute -top-20 ${align === 'left' ? '-left-20 bg-teal-100/30' : '-right-20 bg-orange-100/30'} w-64 h-64 rounded-full blur-3xl pointer-events-none`}
            />

            {/* Quote Icon Decoration */}
            <FaQuoteRight className={`absolute top-8 ${align === 'left' ? 'left-8' : 'right-8'} text-6xl text-gray-100 group-hover:text-teal-50 transition-colors duration-500`} />

            {/* Content */}
            <div className="relative z-10">
                <div className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm
                    ${align === 'left' ? 'flex-row-reverse bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'}
                `}>
                    <FaCalendarAlt />
                    {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>

                <h3 className="text-4xl font-bold text-gray-800 mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-teal-800 transition-all duration-300">
                    {event.title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                    {event.description}
                </p>
            </div>
            
            {/* 3D Elevation Shadow (Visual only) */}
            <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_40px_rgba(255,255,255,0.8)] pointer-events-none"></div>
        </div>
    );
};

export default OurWork;