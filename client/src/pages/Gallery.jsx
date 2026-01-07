import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCamera } from 'react-icons/fa';

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null); // For Lightbox

    // Fetch Photos from Backend
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/photos');
                setPhotos(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching photos:", err);
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div className="bg-orange-50/50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-ubuntu">
            
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 text-orange-500 mb-2">
                    <FaCamera size={24} />
                    <span className="uppercase tracking-widest font-bold text-sm">Our Memories</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Moments of <span className="text-teal-600">Impact</span>
                </h1>
            </div>

            {/* Gallery Grid */}
            {loading ? (
                <div className="text-center text-gray-500">Loading Gallery...</div>
            ) : photos.length === 0 ? (
                <div className="text-center text-gray-500 py-20">
                    <p className="text-xl">No photos uploaded yet.</p>
                </div>
            ) : (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <img 
                                src={photo.imageUrl} 
                                alt="Gallery" 
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
                            />
                            
                            {/* Hover Overlay with Caption */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-medium text-lg border-l-4 border-orange-500 pl-3">
                                    {photo.caption || "Samvardhan Event"}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* LIGHTBOX (Full Screen View) */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedPhoto(null)} // Close when clicking background
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <FaTimes size={40} />
                        </button>

                        <motion.div 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-5xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                        >
                            <img 
                                src={selectedPhoto.imageUrl} 
                                alt="Full Screen" 
                                className="w-full h-full object-contain max-h-[85vh] rounded-lg shadow-2xl"
                            />
                            {selectedPhoto.caption && (
                                <p className="text-center text-white/90 mt-4 text-xl font-medium">
                                    {selectedPhoto.caption}
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;