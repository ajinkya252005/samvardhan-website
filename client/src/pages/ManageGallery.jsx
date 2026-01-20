import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaTrash, FaCloudUploadAlt, FaImages, FaPen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [caption, setCaption] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Fetch Photos
    const fetchPhotos = async () => {
        try {
            const res = await api.get('/photos');
            setPhotos(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching photos:", err);
            setLoading(false);
        }
    };

    useEffect(() => { fetchPhotos(); }, []);

    // Handle File Selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Handle Upload
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!imageFile) return alert("Please select an image first.");

        try {
            setSubmitting(true);
            const data = new FormData();
            data.append('image', imageFile);
            data.append('caption', caption);

            await api.post('/photos', data);

            // Reset Form
            setCaption('');
            setImageFile(null);
            setPreviewUrl(null);
            
            // Reload Grid
            fetchPhotos();
            setSubmitting(false);

        } catch (err) {
            console.error(err);
            setSubmitting(false);
            alert("Failed to upload photo.");
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to permanently delete this memory?")) return;
        try {
            // Optimistic UI Update: Remove immediately from UI
            setPhotos(photos.filter(p => p._id !== id));
            await api.delete('/photos/' + id);
        } catch (err) {
            alert("Failed to delete photo.");
            fetchPhotos(); // Revert if failed
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-ubuntu relative overflow-hidden">
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl -z-10 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl -z-10 opacity-60"></div>

            <div className="max-w-7xl mx-auto p-6 md:p-10">
                
                {/* --- Header --- */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-teal-50 transition text-gray-600 hover:text-teal-700">
                            <FaArrowLeft />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Gallery Manager</h1>
                            <p className="text-gray-500 text-sm">Curate the memories displayed on the website.</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm text-sm font-medium text-gray-600">
                        <FaImages className="text-teal-600"/>
                        <span>Total Photos: <span className="text-gray-900 font-bold">{photos.length}</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* --- LEFT: Upload Section (Sticky on Desktop) --- */}
                    <div className="lg:col-span-4 lg:sticky lg:top-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-teal-700 to-teal-800 p-6 text-white">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FaCloudUploadAlt className="text-2xl text-teal-300"/> Upload Memory
                                </h2>
                                <p className="text-teal-100 text-xs mt-1">Add a new photo to the collection.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                
                                {/* Image Dropzone */}
                                <div className="relative group">
                                    <label className={`
                                        flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300
                                        ${previewUrl ? 'border-teal-500 bg-white' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-teal-400'}
                                    `}>
                                        {previewUrl ? (
                                            <div className="relative w-full h-full p-2 group-hover:opacity-90 transition">
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-xl shadow-sm" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl">
                                                    <span className="text-white font-bold text-sm flex items-center gap-2"><FaPen/> Change Image</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400 group-hover:text-teal-600 transition">
                                                <FaCloudUploadAlt className="text-5xl mb-3" />
                                                <p className="text-sm font-bold">Click to upload photo</p>
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                            </div>
                                        )}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                </div>

                                {/* Caption Input */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Caption / Description</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <FaPen />
                                        </span>
                                        <input 
                                            type="text" 
                                            value={caption} 
                                            onChange={(e) => setCaption(e.target.value)}
                                            placeholder="e.g. Tree Plantation Drive 2024"
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all text-sm font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    disabled={submitting}
                                    className={`
                                        w-full py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all
                                        ${submitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-200'}
                                    `}
                                >
                                    {submitting ? (
                                        <>Uploading...</>
                                    ) : (
                                        <>Publish to Gallery <FaCheckCircle/></>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    {/* --- RIGHT: Gallery Grid --- */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Gallery Archives</h2>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sorted by Newest</div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {[1,2,3,4,5,6].map(i => (
                                    <div key={i} className="bg-white rounded-2xl h-48 animate-pulse shadow-sm"></div>
                                ))}
                            </div>
                        ) : photos.length === 0 ? (
                            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100 border-dashed">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                    <FaImages size={30} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-600">No photos yet</h3>
                                <p className="text-gray-400 text-sm">Upload your first photo to get started.</p>
                            </div>
                        ) : (
                            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {photos.map((photo) => (
                                        <motion.div 
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                            key={photo._id} 
                                            className="group relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                                        >
                                            {/* Image Aspect Ratio Box */}
                                            <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                                                <img 
                                                    src={photo.imageUrl} 
                                                    alt="Gallery" 
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                                                />
                                                
                                                {/* Overlay Actions */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                                    <button 
                                                        onClick={() => handleDelete(photo._id)}
                                                        className="bg-white text-red-500 p-3 rounded-full hover:bg-red-500 hover:text-white transition shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                                                        title="Delete Photo"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {/* Footer Info */}
                                            <div className="p-4 bg-white relative z-10">
                                                <p className="text-sm font-bold text-gray-800 truncate">
                                                    {photo.caption || <span className="text-gray-400 italic font-normal">No Caption</span>}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(photo.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManageGallery;