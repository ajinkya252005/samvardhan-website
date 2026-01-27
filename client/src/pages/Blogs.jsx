import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPenNib, FaExternalLinkAlt, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('${API_URL}/api/blogs');
                setBlogs(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="bg-[#FDF8F0] min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-ubuntu relative overflow-hidden">
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 w-64 h-64 bg-teal-100/50 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                
                {/* --- Header --- */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 text-orange-500 mb-2">
                        <FaPenNib size={24} className="animate-bounce" />
                        <span className="uppercase tracking-widest font-bold text-xl">Our Thoughts</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Latest <span className="text-teal-600">Blogs</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Insights, stories, and updates from the field.
                    </p>
                </motion.div>

                {/* --- Blog Grid --- */}
                {loading ? (
                    <div className="flex justify-center h-40 items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-600"></div>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-300">
                        <p className="text-gray-400 text-lg">No blogs published yet. Stay tuned!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full border border-gray-100"
                            >
                                {/* Image Container */}
                                <div className="h-56 overflow-hidden relative">
                                    <img 
                                        src={blog.imageUrl} 
                                        alt={blog.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-sm text-teal-600 font-bold mb-3">
                                        <FaCalendarAlt /> 
                                        <span>
                                            {new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-teal-700 transition">
                                        {blog.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                                        {blog.description}
                                    </p>

                                    <a 
                                        href={blog.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center justify-center w-full bg-gray-50 hover:bg-teal-600 text-gray-700 hover:text-white font-bold py-3 rounded-xl transition duration-300 gap-2 border border-gray-200 hover:border-teal-600"
                                    >
                                        Read Full Article <FaExternalLinkAlt className="text-xs" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;