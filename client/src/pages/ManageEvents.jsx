import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaTrash, FaCalendarPlus, FaImage } from 'react-icons/fa';
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

    // Fetch Events
    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events');
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
        setImageFile(e.target.files[0]);
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

            // FIX: Removed the manual 'headers' object. Let Axios handle it!
            await axios.post('http://localhost:5000/api/events', data);

            // Reset Form and Reload List
            setNewEvent({ title: '', date: '', description: '' });
            setImageFile(null);
            setSubmitting(false);
            fetchEvents();
            alert("Event Added Successfully!");

        } catch (err) {
            console.error(err);
            setSubmitting(false);
            alert("Failed to add event.");
        }
    };

    // --- DELETE EVENT ---
    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to delete this event?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            setEvents(events.filter(e => e._id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete event.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-ubuntu p-8">
            <div className="max-w-6xl mx-auto mb-8 flex items-center gap-4">
                <Link to="/admin" className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition">
                    <FaArrowLeft className="text-gray-600" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Manage Timeline</h1>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- LEFT: Add Event Form --- */}
                <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FaCalendarPlus className="text-teal-600"/> Add New Event
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">Event Title</label>
                            <input type="text" name="title" required
                                value={newEvent.title} onChange={handleChange}
                                className="w-full border rounded p-2 focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">Date</label>
                            <input type="date" name="date" required
                                value={newEvent.date} onChange={handleChange}
                                className="w-full border rounded p-2 focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">Description</label>
                            <textarea name="description" rows="3" required
                                value={newEvent.description} onChange={handleChange}
                                className="w-full border rounded p-2 focus:ring-2 focus:ring-teal-500 outline-none"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">Cover Image</label>
                            <div className="flex items-center gap-2 border p-2 rounded bg-gray-50">
                                <FaImage className="text-gray-400" />
                                <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm w-full" />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full bg-teal-600 text-white font-bold py-2 rounded hover:bg-teal-700 transition disabled:bg-gray-400"
                        >
                            {submitting ? "Uploading..." : "Publish Event"}
                        </button>
                    </form>
                </div>

                {/* --- RIGHT: Existing Events List --- */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">Existing Events</h2>
                    {loading ? <p>Loading...</p> : events.length === 0 ? <p className="text-gray-500">No events found.</p> : (
                        events.map(event => (
                            <div key={event._id} className="bg-white p-4 rounded-xl shadow flex gap-4 items-start">
                                <img src={event.imageUrl} alt={event.title} className="w-24 h-24 object-cover rounded-lg bg-gray-200" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-teal-800">{event.title}</h3>
                                        <button 
                                            onClick={() => handleDelete(event._id)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 font-bold mb-1">{new Date(event.date).toDateString()}</p>
                                    <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default ManageEvents;