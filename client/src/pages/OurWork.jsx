import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

const OurWork = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch events from the existing API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');
                setEvents(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError('Failed to load events. Please check if the server is running.');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div className="text-center py-20 text-teal-700 font-bold text-xl">Loading Timeline...</div>;
    if (error) return <div className="text-center py-20 text-red-500 font-bold">{error}</div>;

    return (
        <div className="bg-teal-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-ubuntu">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">Our Journey</h1>
                    <p className="text-lg text-teal-700 max-w-2xl mx-auto">
                        From our humble beginnings to our latest drives, here is how we've been making a difference step by step.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Line (The Spine) */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-teal-200 rounded-full"></div>

                    {/* Event Cards */}
                    <div className="space-y-12">
                        {events.length === 0 ? (
                            <div className="text-center py-10 bg-white rounded-xl shadow p-8 z-10 relative">
                                <p className="text-gray-500">No events found yet. The Admin needs to add some!</p>
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

// Helper Component for individual Timeline Entries
const TimelineItem = ({ event, index }) => {
    // Even index = Left side, Odd index = Right side (on desktop)
    const isLeft = index % 2 === 0;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center justify-between w-full relative ${isLeft ? 'md:flex-row-reverse' : ''}`}
        >
            {/* 1. The Date/Dot Indicator */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-teal-600 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* 2. Empty Space (for alignment) */}
            <div className="hidden md:block w-5/12"></div>

            {/* 3. The Content Card */}
            <div className="w-full md:w-5/12 pl-12 md:pl-0">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-l-4 border-teal-500 overflow-hidden group">
                    
                    {/* Image */}
                    {event.imageUrl && (
                        <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                            <img 
                                src={event.imageUrl} 
                                alt={event.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-orange-500 font-bold mb-2">
                        <FaCalendarAlt />
                        <span>{new Date(event.date).toDateString()}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {event.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default OurWork;