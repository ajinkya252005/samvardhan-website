import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaLeaf, FaTree } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';

const OurWork = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');
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
        <div className="bg-[#FDF8F0] min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-ubuntu overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                
                {/* --- HEADER --- */}
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
                    
                    {/* 1. TIMELINE LINE (Adaptive) */}
                    
                    {/* DESKTOP LINE (Center) */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-teal-400 via-orange-300 to-teal-600 rounded-full z-0"></div>
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-4 bg-teal-400 opacity-20 blur-md z-0"></div>

                    {/* MOBILE LINE (Left Side) */}
                    <div className="md:hidden absolute left-4 h-full w-1.5 bg-gradient-to-b from-teal-400 via-orange-300 to-teal-600 rounded-full z-0"></div>
                    <div className="md:hidden absolute left-4 h-full w-4 bg-teal-400 opacity-20 blur-md z-0"></div>

                    <div className="space-y-12 md:space-y-32 pb-20"> 
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

// --- TIMELINE ITEM ---
const TimelineItem = ({ event, index }) => {
    const isEven = index % 2 === 0;
    const year = new Date(event.date).getFullYear();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* =========================================
                DESKTOP VIEW (Split Layout) - HIDDEN ON MOBILE
               ========================================= */}
            <div className="hidden md:grid md:grid-cols-9 items-center relative">
                
                {/* LEFT SIDE */}
                <div className={`col-span-4 ${isEven ? 'text-right' : 'text-left'} order-1`}>
                    {isEven ? (
                        <PhotoCard imageUrl={event.imageUrl} title={event.title} align="right" />
                    ) : (
                        <TextCard event={event} align="left" />
                    )}
                </div>

                {/* CENTER MARKER */}
                <div className="col-span-1 flex justify-center items-center relative order-2">
                    <div className="absolute top-1/2 w-full h-1 bg-teal-100 -z-10"></div>
                    <YearMarker year={year} />
                </div>

                {/* RIGHT SIDE */}
                <div className={`col-span-4 ${isEven ? 'text-left' : 'text-right'} order-3`}>
                    {isEven ? (
                        <TextCard event={event} align="right" />
                    ) : (
                        <PhotoCard imageUrl={event.imageUrl} title={event.title} align="left" />
                    )}
                </div>
            </div>

            {/* =========================================
                MOBILE VIEW (Merged Layout) - VISIBLE ON MOBILE
               ========================================= */}
            <div className="md:hidden flex gap-6 pl-2 relative">
                
                {/* LEFT MARKER (Aligned with Line) */}
                <div className="flex-shrink-0 z-10 pt-8"> {/* pt-8 aligns marker with top of card somewhat */}
                     <YearMarker year={year} small />
                </div>

                {/* RIGHT CARD (Merged Photo + Text) */}
                <div className="flex-grow">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-teal-50 transform transition-all hover:scale-[1.02]">
                        {/* Image Top */}
                        <div className="w-full h-48 sm:h-64 relative">
                            <img 
                                src={event.imageUrl} 
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                        </div>

                        {/* Content Bottom */}
                        <div className="p-6 relative">
                            {/* Date Badge */}
                            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                <FaCalendarAlt />
                                <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-teal-800 mb-3 leading-tight">
                                {event.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                {event.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

// --- COMPONENT: YEAR MARKER ---
const YearMarker = ({ year, small }) => (
    <div className="relative group cursor-pointer z-10">
        <div className={`${small ? 'w-14 h-14 border-[3px]' : 'w-20 h-20 border-[5px]'} bg-white border-teal-500 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(20,184,166,0.6)] transition-all duration-300 group-hover:scale-110 group-hover:border-orange-500`}>
            <div className="flex flex-col items-center leading-none">
                <span className={`${small ? 'text-[8px]' : 'text-xs'} text-gray-400 font-bold uppercase tracking-wider mb-0.5 group-hover:text-orange-400`}></span>
                <span className={`${small ? 'text-sm' : 'text-xl'} font-black text-teal-700 font-ubuntu group-hover:text-orange-600`}>
                    {year}
                </span>
            </div>
        </div>
        <div className="absolute inset-0 border-4 border-teal-300 rounded-full animate-ping opacity-30"></div>
    </div>
);

// --- COMPONENT: PHOTO CARD (Desktop) ---
const PhotoCard = ({ imageUrl, title, align }) => {
    return (
        <div className={`relative group w-full flex ${align === 'right' ? 'justify-end' : 'justify-start'} justify-center`}>
            <div className="bg-white p-3 pb-8 shadow-2xl rounded-sm transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 rotate-0 max-w-lg w-full border border-gray-100">
                <div className="overflow-hidden bg-gray-100 w-full h-auto border border-gray-200 shadow-inner">
                    <img src={imageUrl} alt={title} className="w-full h-auto object-contain block" />
                </div>
            </div>
        </div>
    );
};

// --- COMPONENT: TEXT CARD (Desktop) ---
const TextCard = ({ event, align }) => {
    return (
        <div className={`flex ${align === 'right' ? 'justify-start' : 'justify-end'} justify-center w-full`}>
            <div className={`
                bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl border border-teal-50 
                max-w-lg w-full relative transition-all duration-300 hover:-translate-y-2
                ${align === 'left' ? 'text-right' : 'text-left'}
            `}>
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white transform rotate-45 
                    ${align === 'left' ? '-right-3 border-r border-t border-teal-50' : '-left-3 border-l border-b border-teal-50'}
                `}></div>

                <div className={`flex flex-col ${align === 'left' ? 'items-end' : 'items-start'}`}>
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
                        <FaCalendarAlt />
                        <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-teal-800 mb-4 leading-tight">{event.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed font-light">{event.description}</p>
                </div>
            </div>
        </div>
    );
};

export default OurWork;