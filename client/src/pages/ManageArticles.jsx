// client/src/pages/ManageArticles.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaImage, FaNewspaper, FaLink, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import API_URL from '../config';

const ManageArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [publisher, setPublisher] = useState('');
    const [date, setDate] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState(null);

    // Fetch Articles on load
    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/articles`);
            setArticles(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching articles:", error);
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !date || !image) {
            alert("Title, Date, and Image are required!");
            return;
        }

        setSubmitting(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('publisher', publisher);
        formData.append('date', date);
        formData.append('link', link);
        formData.append('image', image);

        try {
            await axios.post(`${API_URL}/api/articles`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Article added successfully!");
            // Reset form
            setTitle('');
            setPublisher('');
            setDate('');
            setLink('');
            setImage(null);
            document.getElementById('articleImageInput').value = '';
            // Refresh list
            fetchArticles();
        } catch (error) {
            console.error("Error adding article:", error);
            alert("Failed to add article.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;
        
        try {
            await axios.delete(`${API_URL}/api/articles/${id}`);
            alert("Article deleted!");
            fetchArticles();
        } catch (error) {
            console.error("Error deleting article:", error);
            alert("Failed to delete article.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-ubuntu">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex items-center gap-4 border-b pb-4">
                    <div className="bg-indigo-100 p-3 rounded-xl">
                        <FaNewspaper className="text-3xl text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Manage Media & Publications</h1>
                        <p className="text-gray-500">Add newspaper clippings, features, or external media links.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Add New Article Form */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FaPlus className="text-indigo-500" /> Add New Article
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Headline / Title *</label>
                                <input 
                                    type="text" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="e.g. Samvardhan visits local school"
                                    value={title} onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Publisher (Optional)</label>
                                <input 
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="e.g. Times of India, Sakal"
                                    value={publisher} onChange={(e) => setPublisher(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                    <FaCalendarAlt className="text-gray-400" /> Published Date *
                                </label>
                                <input 
                                    type="date" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={date} onChange={(e) => setDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                    <FaLink className="text-gray-400" /> Article Link (Optional)
                                </label>
                                <input 
                                    type="url"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="https://..."
                                    value={link} onChange={(e) => setLink(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                    <FaImage className="text-gray-400" /> Upload Image / Clipping *
                                </label>
                                <input 
                                    id="articleImageInput"
                                    type="file" accept="image/*" required
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="w-full bg-orange-600 text-black font-bold py-3 rounded-lg hover:bg-indigo-700 transition flex justify-center items-center gap-2 mt-4"
                            >
                                {submitting ? <FaSpinner className="animate-spin" /> : "Publish Article"}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: List of Articles */}
                    <div className="lg:col-span-2">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <FaSpinner className="animate-spin text-4xl text-indigo-500" />
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <FaNewspaper className="text-6xl text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-600">No Articles Found</h3>
                                <p className="text-gray-400 mt-2">Add your first media publication using the form.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {articles.map((article) => (
                                    <div key={article._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition">
                                        <div className="h-48 overflow-hidden relative">
                                            <img 
                                                src={article.image} 
                                                alt={article.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="text-xs font-bold text-indigo-600 mb-2 flex justify-between">
                                                <span>{article.publisher || "Media"}</span>
                                                <span>{new Date(article.date).toLocaleDateString('en-GB')}</span>
                                            </div>
                                            <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight">
                                                {article.title}
                                            </h3>
                                            
                                            <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
                                                {article.link ? (
                                                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                                                        <FaLink /> Read Original
                                                    </a>
                                                ) : <span />}
                                                
                                                <button 
                                                    onClick={() => handleDelete(article._id)}
                                                    className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-full hover:bg-red-100 transition"
                                                    title="Delete Article"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManageArticles;