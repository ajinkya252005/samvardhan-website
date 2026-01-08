import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
// 1. Added FaCamera to imports
import { FaCalendarAlt, FaQuoteLeft, FaCamera, FaDigitalTachograph, FaDotCircle, FaTimesCircle } from 'react-icons/fa';
import {GoGraph } from 'react-icons/go';

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
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    {/* --- 2. NEW ORANGE HEADER ELEMENT --- */}
                    <div className="flex items-center justify-center gap-2 text-orange-500 mb-2">
                        <GoGraph size={25} />
                        <span className="uppercase tracking-widest font-bold text-xl">Timeline</span>
                    </div>
                    {/* ------------------------------------ */}

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our <span className="text-teal-600">Journey</span></h1>
                    <p className="text-xl text-teal-700 max-w-2xl mx-auto leading-relaxed">
                        From our humble beginnings to our latest drives, here is how we've been making a difference step by step.
                    </p>
                </motion.div>

                {/* --- TIMELINE SECTION --- */}
                <div className="relative">
                    {/* Central Spine Line */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-teal-200 via-teal-400 to-teal-200 rounded-full opacity-50"></div>

                    <div className="space-y-32 pb-20"> 
                        {events.length === 0 ? (
                            <div className="text-center py-10 bg-white rounded-3xl shadow-xl p-10 relative z-10 border border-teal-50">
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

// --- INDIVIDUAL CARD COMPONENT ---
const TimelineItem = ({ event, index }) => {
    const isLeft = index % 2 === 0;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className={`flex flex-col md:flex-row items-center w-full relative ${isLeft ? 'md:flex-row-reverse' : ''}`}
        >
            {/* 1. Date Bubble (Center Axis) */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-20">
                <div className="w-12 h-12 bg-teal-600 rounded-full border-4 border-[#FDF8F0] shadow-xl flex items-center justify-center text-white text-xs font-bold">
                    {new Date(event.date).getFullYear()}
                </div>
            </div>

            {/* 2. Spacer */}
            <div className="hidden md:block w-1/2"></div>

            {/* 3. The Poster Card */}
            <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 pl-12' : 'md:pl-16 pl-12'}`}>
                
                {/* Card Container */}
                <div className="group relative w-full h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-3 hover:shadow-teal-900/20">
                    
                    {/* --- A. FULL BACKGROUND IMAGE --- */}
                    <div className="absolute inset-0 w-full h-full bg-gray-200">
                        <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                    </div>

                    {/* --- B. CONTENT OVERLAY (Glassmorphism) --- */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Date Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white/90 text-sm font-bold mb-4 border border-white/10">
                                <FaCalendarAlt className="text-orange-400"/>
                                <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-4xl md:text-5xl font-bebas text-white mb-4 tracking-wider leading-none drop-shadow-lg">
                                {event.title}
                            </h3>

                            {/* Description (Scrollable if too long) */}
                            <div className="relative">
                                <FaQuoteLeft className="text-orange-500/50 text-2xl absolute -top-2 -left-2" />
                                <p className="text-gray-200 text-lg leading-relaxed font-light pl-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                                    {event.description}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </div>
            </div>
        </motion.div>
    );
};

export default OurWork;