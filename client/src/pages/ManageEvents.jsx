import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaTrash, FaCalendarAlt, FaAlignLeft, FaImage, FaPlusCircle, FaClock, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        description: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Fetch Events
    const fetchEvents = async () => {
        try {
            const res = await axios.get('${API_URL}/api/events');
            setEvents(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => { fetchEvents(); }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    // Handle File Change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // --- ADD EVENT ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!imageFile) return alert("Please upload a cover image.");

        try {
            setSubmitting(true);
            const data = new FormData();
            data.append('title', newEvent.title);
            data.append('date', newEvent.date);
            data.append('description', newEvent.description);
            data.append('image', imageFile);

            await axios.post('${API_URL}/api/events', data);

            // Reset Form
            setNewEvent({ title: '', date: '', description: '' });
            setImageFile(null);
            setPreviewUrl(null);
            
            // Reload & UI Feedback
            fetchEvents();
            setSubmitting(false);
            alert("Event Published Successfully!");

        } catch (err) {
            console.error(err);
            setSubmitting(false);
            alert("Failed to add event.");
        }
    };

    // --- DELETE EVENT ---
    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
        try {
            // Optimistic Update
            setEvents(events.filter(e => e._id !== id));
            await axios.delete(`${API_URL}/api/events/${id}`);
        } catch (err) {
            console.error(err);
            alert("Failed to delete event.");
            fetchEvents(); // Revert
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-ubuntu relative overflow-hidden">
            
            {/* Background Blobs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto p-6 md:p-10">
                
                {/* --- Header --- */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-teal-50 transition text-gray-600 hover:text-teal-700">
                            <FaArrowLeft />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Timeline Manager</h1>
                            <p className="text-gray-500 text-sm">Update the 'Our Work' timeline with new initiatives.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* --- LEFT: Create Event Form --- */}
                    <div className="lg:col-span-5 lg:sticky lg:top-10">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                            <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <FaCalendarAlt size={100} />
                                </div>
                                <h2 className="text-xl font-bold flex items-center gap-2 relative z-10">
                                    <FaPlusCircle /> Add New Event
                                </h2>
                                <p className="text-teal-100 text-xs mt-1 relative z-10">Fill in the details to publish to the timeline.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                
                                {/* 1. Title Input */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Event Title</label>
                                    <input 
                                        type="text" 
                                        name="title" 
                                        required
                                        placeholder="e.g. Mega Cleanliness Drive"
                                        value={newEvent.title} 
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium"
                                    />
                                </div>

                                {/* 2. Date Input */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Event Date</label>
                                    <div className="relative">
                                        <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input 
                                            type="date" 
                                            name="date" 
                                            required
                                            value={newEvent.date} 
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium text-gray-600"
                                        />
                                    </div>
                                </div>

                                {/* 3. Description Input */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Description</label>
                                    <div className="relative">
                                        <FaAlignLeft className="absolute left-4 top-4 text-gray-400" />
                                        <textarea 
                                            name="description" 
                                            rows="4" 
                                            required
                                            placeholder="Summarize the impact of this event..."
                                            value={newEvent.description} 
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* 4. Image Upload */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Cover Image</label>
                                    <label className={`
                                        flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden
                                        ${previewUrl ? 'border-teal-500 bg-white' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
                                    `}>
                                        {previewUrl ? (
                                            <>
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-sm">
                                                    Click to Change
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center text-gray-400">
                                                <FaImage className="text-3xl mx-auto mb-2" />
                                                <span className="text-sm font-medium">Upload Cover</span>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    </label>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    disabled={submitting}
                                    className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {submitting ? "Publishing..." : "Publish Event"} <FaCheckCircle />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    {/* --- RIGHT: Existing Events List --- */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Timeline History</h2>
                            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                                {events.length} Events
                            </span>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>)}
                            </div>
                        ) : events.length === 0 ? (
                            <div className="bg-white p-10 rounded-3xl text-center border border-dashed border-gray-300">
                                <p className="text-gray-400 font-bold">Timeline is empty.</p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {events.map((event) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        key={event._id} 
                                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5 items-start relative group"
                                    >
                                        {/* Image */}
                                        <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pr-10">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                                    {new Date(event.date).getFullYear()}
                                                </span>
                                                <span className="text-xs text-gray-400 font-bold">
                                                    {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                                {event.description}
                                            </p>
                                        </div>

                                        {/* Delete Button (Absolute) */}
                                        <button 
                                            onClick={() => handleDelete(event._id)}
                                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                                            title="Delete Event"
                                        >
                                            <FaTrash />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManageEvents;