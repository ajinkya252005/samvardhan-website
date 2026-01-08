import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaTrash, FaImage, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [caption, setCaption] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // Fetch Photos
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

    useEffect(() => { fetchPhotos(); }, []);

    // Handle Upload
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!imageFile) return alert("Please select an image first.");

        try {
            setSubmitting(true);
            const data = new FormData();
            data.append('image', imageFile); // Must match backend 'upload.single("image")'
            data.append('caption', caption);

            await axios.post('http://localhost:5000/api/photos', data);

            // Reset and Reload
            setCaption('');
            setImageFile(null);
            // Reset file input manually
            document.getElementById('fileInput').value = ""; 
            
            setSubmitting(false);
            fetchPhotos();
            alert("Photo Uploaded Successfully!");

        } catch (err) {
            console.error(err);
            setSubmitting(false);
            alert("Failed to upload photo.");
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to delete this photo?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/photos/${id}`);
            setPhotos(photos.filter(p => p._id !== id));
        } catch (err) {
            alert("Failed to delete photo.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-ubuntu p-8">
            <div className="max-w-6xl mx-auto mb-8 flex items-center gap-4">
                <Link to="/admin" className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition">
                    <FaArrowLeft className="text-gray-600" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Manage Gallery</h1>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- LEFT: Upload Form --- */}
                <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FaPlus className="text-teal-600"/> Add New Photo
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">Select Image</label>
                            <div className="flex items-center gap-2 border p-2 rounded bg-gray-50">
                                <FaImage className="text-gray-400" />
                                <input 
                                    id="fileInput"
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => setImageFile(e.target.files[0])} 
                                    className="text-sm w-full" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">Caption (Optional)</label>
                            <input 
                                type="text" 
                                value={caption} 
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="e.g. Cleanliness Drive at ARAI"
                                className="w-full border rounded p-2 focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full bg-teal-600 text-white font-bold py-2 rounded hover:bg-teal-700 transition disabled:bg-gray-400"
                        >
                            {submitting ? "Uploading..." : "Upload Photo"}
                        </button>
                    </form>
                </div>

                {/* --- RIGHT: Photo Grid --- */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Gallery Preview</h2>
                    {loading ? <p>Loading...</p> : photos.length === 0 ? <p className="text-gray-500">No photos found.</p> : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {photos.map(photo => (
                                <div key={photo._id} className="group relative bg-white rounded-lg shadow overflow-hidden">
                                    <img src={photo.imageUrl} alt="Gallery" className="w-full h-32 object-cover" />
                                    
                                    {/* Delete Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <button 
                                            onClick={() => handleDelete(photo._id)}
                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                            title="Delete Photo"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    
                                    {/* Caption Footer */}
                                    {photo.caption && (
                                        <div className="p-2 text-xs text-gray-600 font-bold truncate">
                                            {photo.caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ManageGallery;