import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowRight, FaUpload, FaCheckCircle } from 'react-icons/fa';
// Ensure you have this image in your assets folder
import qrCode from '../assets/qr-code.jpeg'; 

const Donation = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    
    // Form Data State
    const [formData, setFormData] = useState({
        donorName: '',
        email: '',
        phone: '',
        amount: ''
    });
    const [screenshot, setScreenshot] = useState(null);

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle File Upload
    const handleFileChange = (e) => {
        setScreenshot(e.target.files[0]);
    };

    // --- SUBMIT FUNCTION (Connects to Backend) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!screenshot) {
            alert("Please upload a payment screenshot to verify your donation.");
            return;
        }

        try {
            setLoading(true);

            // 1. Create FormData object (Required for sending files)
            const data = new FormData();
            data.append('donorName', formData.donorName);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('amount', formData.amount);
            data.append('screenshot', screenshot); // Must match backend 'upload.single("screenshot")'

            // 2. Send to Backend
            const res = await axios.post('http://localhost:5000/api/donations', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // 3. Success!
            setLoading(false);
            setStep(3); // Move to Success Step
            console.log("Donation Saved:", res.data);

        } catch (err) {
            console.error("Error submitting donation:", err);
            setLoading(false);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-teal-50 py-20 px-4 font-ubuntu">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                
                {/* Header */}
                <div className="bg-teal-700 p-8 text-center text-white">
                    <FaHeart className="text-5xl mx-auto mb-4 text-orange-400" />
                    <h1 className="text-3xl font-bold">Support Our Cause</h1>
                    <p className="text-teal-100 mt-2">
                        Your contribution helps us plant trees and feed the needy.
                    </p>
                </div>

                <div className="p-8 md:p-12">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-8 space-x-4">
                        {/* Step 1 Bubble */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>1</div>
                        
                        {/* Line 1 */}
                        <div className="h-1 w-12 bg-gray-200">
                            <div className={`h-full bg-teal-600 transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                        </div>

                        {/* Step 2 Bubble */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>2</div>

                        {/* Line 2 */}
                        <div className="h-1 w-12 bg-gray-200">
                            <div className={`h-full bg-teal-600 transition-all duration-500 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
                        </div>

                        {/* Step 3 Bubble (Success) */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step === 3 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>3</div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* --- STEP 1: Donor Details --- */}
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                                    <input type="text" name="donorName" required
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder="Enter your name"
                                        value={formData.donorName} onChange={handleChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                                        <input type="email" name="email" required
                                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            placeholder="john@example.com"
                                            value={formData.email} onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Phone</label>
                                        <input type="tel" name="phone" required
                                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            placeholder="+91 00000 00000"
                                            value={formData.phone} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Donation Amount (₹)</label>
                                    <input type="number" name="amount" required
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-xl font-bold text-teal-800"
                                        placeholder="500"
                                        value={formData.amount} onChange={handleChange}
                                    />
                                </div>
                                <button type="button"
                                    onClick={() => {
                                        if(formData.donorName && formData.amount && formData.email && formData.phone) setStep(2);
                                        else alert("Please fill in all fields.");
                                    }}
                                    className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition flex items-center justify-center gap-2"
                                >
                                    Proceed to Pay <FaArrowRight />
                                </button>
                            </motion.div>
                        )}

                        {/* --- STEP 2: QR Code & Verification --- */}
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center space-y-6">
                                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 inline-block">
                                    <img 
                                        src={qrCode} 
                                        onError={(e) => e.target.src='https://via.placeholder.com/200?text=QR+Code'}
                                        alt="UPI QR Code" 
                                        className="w-48 h-48 mx-auto"
                                    />
                                    <p className="mt-4 font-bold text-gray-700">Scan to pay ₹{formData.amount}</p>
                                </div>

                                <div className="text-left bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Upload Payment Screenshot</label>
                                    <div className="flex items-center gap-4">
                                        <label className="cursor-pointer bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-gray-600">
                                            <FaUpload />
                                            <span>Choose File</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                        <span className="text-sm text-gray-500 break-all">
                                            {screenshot ? screenshot.name : "No file chosen"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">Required for verification. Only .jpg, .png allowed.</p>
                                </div>

                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition">Back</button>
                                    <button type="submit" disabled={loading} className="w-2/3 bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-200 disabled:bg-teal-400">
                                        {loading ? "Submitting..." : "Submit Donation"}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* --- STEP 3: Success Message --- */}
                        {step === 3 && (
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                                <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
                                <p className="text-gray-600 text-lg mb-8">
                                    Your donation details have been submitted.<br/>
                                    Our team will verify the payment and reach out to you shortly.
                                </p>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition"
                                >
                                    Make Another Donation
                                </button>
                            </motion.div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Donation;