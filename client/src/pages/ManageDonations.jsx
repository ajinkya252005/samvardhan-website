import React, { useState, useEffect } from 'react';
import api from '../api';
import { FaArrowLeft, FaEye, FaCheck, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch Donations
    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const res = await api.get('/donations');
            setDonations(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error loading donations:", err);
            setLoading(false);
        }
    };

    // --- NEW: Verify Function ---
    const handleVerify = async (id) => {
        if(!window.confirm("Are you sure you want to verify this donation?")) return;

        try {
            await api.put(`/donations/${id}/verify`);
            
            // Update UI instantly (Optimistic Update)
            setDonations(donations.map(d => 
                d._id === id ? { ...d, isVerified: true } : d
            ));
        } catch (err) {
            alert("Failed to verify. Check console.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-ubuntu p-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link to="/admin" className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition">
                        <FaArrowLeft className="text-gray-600" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">Donation Requests</h1>
                </div>
                <div className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold">
                    Total: {donations.length}
                </div>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-gray-500">Loading records...</div>
                ) : donations.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">No donations found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-bold text-gray-600">Date</th>
                                    <th className="p-4 font-bold text-gray-600">Donor Name</th>
                                    <th className="p-4 font-bold text-gray-600">Contact</th>
                                    <th className="p-4 font-bold text-gray-600">Amount</th>
                                    <th className="p-4 font-bold text-gray-600">Proof</th>
                                    <th className="p-4 font-bold text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((d) => (
                                    <tr key={d._id} className={`border-b border-gray-100 hover:bg-gray-50 ${d.isVerified ? 'bg-green-50/50' : ''}`}>
                                        <td className="p-4 text-sm text-gray-500">
                                            {new Date(d.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-medium text-gray-800">{d.donorName}</td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {d.email}<br/>{d.phone}
                                        </td>
                                        <td className="p-4 font-bold text-teal-700">₹{d.amount}</td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => setSelectedImage(d.screenshotUrl)}
                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-bold"
                                            >
                                                <FaEye /> View
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            {d.isVerified ? (
                                                <span className="flex items-center gap-1 text-green-600 font-bold text-sm">
                                                    <FaCheckCircle /> Verified
                                                </span>
                                            ) : (
                                                <button 
                                                    onClick={() => handleVerify(d._id)}
                                                    className="bg-red-200 text-red-700 hover:bg-green-200 px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1"
                                                >
                                                    <FaCheck /> Verify
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* --- UPDATED MODAL: Fixed Size --- */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl w-full flex justify-center">
                        <button className="absolute -top-12 right-0 text-white/80 hover:text-white text-4xl font-bold transition">
                            &times;
                        </button>
                        
                        {/* New Logic: Max Height 80% of viewport, keep aspect ratio */}
                        <img 
                            src={selectedImage} 
                            alt="Payment Proof" 
                            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl border border-gray-700"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageDonations;