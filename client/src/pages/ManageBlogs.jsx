import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaTrash, FaPenNib, FaLink, FaImage, FaPlusCircle, FaClock, FaCheckCircle, FaAlignLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import API_URL from '../config';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [newBlog, setNewBlog] = useState({
        title: '',
        date: '',
        description: '',
        link: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Fetch Blogs
    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/blogs`);
            setBlogs(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleChange = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!imageFile) return alert("Please upload a cover image.");

        try {
            setSubmitting(true);
            const data = new FormData();
            data.append('title', newBlog.title);
            data.append('date', newBlog.date);
            data.append('description', newBlog.description);
            data.append('link', newBlog.link);
            data.append('image', imageFile);

            await axios.post(`${API_URL}/api/blogs`, data);

            setNewBlog({ title: '', date: '', description: '', link: '' });
            setImageFile(null);
            setPreviewUrl(null);
            fetchBlogs();
            setSubmitting(false);
            alert("Blog Published Successfully!");

        } catch (err) {
            console.error(err);
            setSubmitting(false);
            alert("Failed to add blog.");
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Delete this blog?")) return;
        try {
            setBlogs(blogs.filter(b => b._id !== id));
            await axios.delete(`${API_URL}/api/blogs/${id}`);
        } catch (err) {
            alert("Failed to delete.");
            fetchBlogs();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-ubuntu p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <Link to="/admin" className="p-3 bg-white rounded-full shadow hover:bg-gray-100 transition">
                        <FaArrowLeft className="text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Blog Manager</h1>
                        <p className="text-gray-500 text-sm">Share knowledge and updates.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* LEFT: Form */}
                    <div className="lg:col-span-5 lg:sticky lg:top-10">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 text-white">
                                <h2 className="text-xl font-bold flex items-center gap-2"><FaPlusCircle /> Write New Blog</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <input type="text" name="title" required placeholder="Blog Title" value={newBlog.title} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <FaClock className="absolute left-4 top-3.5 text-gray-400" />
                                        <input type="date" name="date" required value={newBlog.date} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                                    </div>
                                    <div className="relative">
                                        <FaLink className="absolute left-4 top-3.5 text-gray-400" />
                                        <input type="url" name="link" required placeholder="External Link" value={newBlog.link} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                                    </div>
                                </div>

                                <textarea name="description" rows="4" required placeholder="Short Summary..." value={newBlog.description} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>

                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                                    {previewUrl ? <img src={previewUrl} className="h-full object-contain" /> : <div className="text-gray-400 flex flex-col items-center"><FaImage className="text-2xl mb-1"/><span className="text-xs">Upload Cover</span></div>}
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                </label>

                                <button type="submit" disabled={submitting} className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition flex items-center justify-center gap-2">
                                    {submitting ? "Publishing..." : "Publish Blog"} <FaCheckCircle />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: List */}
                    <div className="lg:col-span-7 space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Published Blogs ({blogs.length})</h2>
                        {loading ? <div className="animate-pulse h-32 bg-gray-200 rounded-2xl"></div> : 
                        blogs.map(blog => (
                            <motion.div layout key={blog._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start group">
                                <img src={blog.imageUrl} className="w-24 h-24 rounded-lg object-cover bg-gray-100" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800">{blog.title}</h3>
                                    <a href={blog.link} target="_blank" className="text-xs text-blue-500 hover:underline truncate block max-w-xs">{blog.link}</a>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{blog.description}</p>
                                </div>
                                <button onClick={() => handleDelete(blog._id)} className="text-gray-300 hover:text-red-500 p-2"><FaTrash/></button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBlogs;