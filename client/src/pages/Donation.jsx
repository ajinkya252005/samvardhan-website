import React, { useState } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaHeart, FaArrowRight, FaArrowLeft, FaUpload, FaCheckCircle, 
    FaUser, FaEnvelope, FaPhone, FaRupeeSign, FaImage 
} from 'react-icons/fa';

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
    const [previewUrl, setPreviewUrl] = useState(null);

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle File Upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setScreenshot(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // --- SUBMIT FUNCTION ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!screenshot) {
            alert("Please upload a payment screenshot to verify your donation.");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();
            data.append('donorName', formData.donorName);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('amount', formData.amount);
            data.append('screenshot', screenshot); 

            const res = await api.post('/donations', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setLoading(false);
            setStep(3); 
            console.log("Donation Saved:", res.data);

        } catch (err) {
            console.error("Error submitting donation:", err);
            setLoading(false);
            alert("Something went wrong. Please try again.");
        }
    };

    // Animation Variants
    const slideVariants = {
        hidden: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        exit: (direction) => ({
            x: direction > 0 ? -50 : 50,
            opacity: 0,
            transition: { duration: 0.2 }
        })
    };

    return (
        <div className="min-h-screen bg-[#FDF8F0] py-20 px-4 font-ubuntu relative overflow-hidden flex items-center justify-center">
            
            {/* --- 1. ANIMATED BACKGROUND BLOBS --- */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }} 
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-[100px] mix-blend-multiply"
                />
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, 50, 0] }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] mix-blend-multiply"
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 relative z-10"
            >
                
                {/* --- 2. HEADER (Text kept exactly as requested) --- */}
                <div className="bg-gradient-to-r from-teal-700 to-teal-800 p-10 text-center text-white relative overflow-hidden">
                    {/* Decorative Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative z-10 inline-block"
                    >
                        <FaHeart className="text-5xl mx-auto mb-4 text-orange-400 drop-shadow-lg" />
                    </motion.div>
                    <h1 className="text-3xl font-bold relative z-10 tracking-wide">Support Our Cause</h1>
                    <p className="text-teal-100 mt-2 relative z-10 text-lg font-medium">
                        Your contribution helps us plant trees and feed the needy.
                    </p>
                </div>

                <div className="p-8 md:p-12">
                    {/* --- 3. PROGRESS STEPS --- */}
                    <div className="flex items-center justify-center mb-10">
                        {[1, 2, 3].map((s, i) => (
                            <React.Fragment key={s}>
                                <div className="relative">
                                    <motion.div 
                                        initial={false}
                                        animate={{ 
                                            backgroundColor: step >= s ? '#0d9488' : '#e5e7eb',
                                            scale: step === s ? 1.2 : 1 
                                        }}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md transition-colors duration-300 z-10 relative ${step >= s ? 'text-white' : 'text-gray-400'}`}
                                    >
                                        {s}
                                    </motion.div>
                                    {/* Pulse effect for active step */}
                                    {step === s && (
                                        <motion.div 
                                            layoutId="step-pulse"
                                            className="absolute inset-0 rounded-full bg-teal-500/30 animate-ping"
                                        />
                                    )}
                                </div>
                                {/* Connector Line */}
                                {i < 2 && (
                                    <div className="h-1 w-16 md:w-24 bg-gray-200 mx-2 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: "0%" }}
                                            animate={{ width: step > s ? "100%" : "0%" }}
                                            transition={{ duration: 0.5 }}
                                            className="h-full bg-teal-600"
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="relative overflow-hidden min-h-[400px]">
                        <AnimatePresence mode="wait" custom={step}>
                            
                            {/* --- STEP 1: DETAILS --- */}
                            {step === 1 && (
                                <motion.div 
                                    key="step1"
                                    custom={step}
                                    variants={slideVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="space-y-6"
                                >
                                    <InputField 
                                        label="Full Name" 
                                        name="donorName" 
                                        type="text" 
                                        placeholder="Enter your full name"
                                        value={formData.donorName} 
                                        onChange={handleChange}
                                        icon={<FaUser />}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField 
                                            label="Email Address" 
                                            name="email" 
                                            type="email" 
                                            placeholder="you@example.com"
                                            value={formData.email} 
                                            onChange={handleChange}
                                            icon={<FaEnvelope />}
                                        />
                                        <InputField 
                                            label="Phone Number" 
                                            name="phone" 
                                            type="tel" 
                                            placeholder="+91 99999 99999"
                                            value={formData.phone} 
                                            onChange={handleChange}
                                            icon={<FaPhone />}
                                        />
                                    </div>

                                    <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                                        <label className="block text-teal-800 font-bold mb-3 text-sm uppercase tracking-wider">Donation Amount</label>
                                        <div className="relative">
                                            <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 text-2xl" />
                                            <input 
                                                type="number" 
                                                name="amount" 
                                                required
                                                className="w-full pl-10 pr-4 py-4 bg-white border-2 border-teal-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 text-3xl font-bold text-teal-800 placeholder-teal-800/20 transition-all"
                                                placeholder="500"
                                                value={formData.amount} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={() => {
                                            if(formData.donorName && formData.amount && formData.email && formData.phone) setStep(2);
                                            else alert("Please fill in all fields.");
                                        }}
                                        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-200/50 hover:shadow-xl hover:shadow-teal-300/50 transition-all flex items-center justify-center gap-3 text-lg mt-4"
                                    >
                                        Proceed to Payment <FaArrowRight />
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* --- STEP 2: QR & UPLOAD --- */}
                            {step === 2 && (
                                <motion.div 
                                    key="step2"
                                    custom={step}
                                    variants={slideVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="space-y-8 text-center"
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-stretch">
                                        {/* QR Code Card */}
                                        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-orange-50/50 -z-10 transition-colors group-hover:bg-orange-50"></div>
                                            <h3 className="text-gray-500 font-bold mb-4 text-sm uppercase tracking-wide">Scan & Pay ₹{formData.amount}</h3>
                                            <div className="p-2 bg-white rounded-xl shadow-inner border border-gray-100">
                                                <img 
                                                    src={qrCode} 
                                                    onError={(e) => e.target.src='https://via.placeholder.com/200?text=QR+Unavailable'}
                                                    alt="UPI QR Code" 
                                                    className="w-48 h-48 object-contain"
                                                />
                                            </div>
                                            <p className="mt-4 text-xs text-gray-400 font-medium">Use any UPI App (GPay, PhonePe, Paytm)</p>
                                        </div>

                                        {/* Upload Section */}
                                        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col relative overflow-hidden">
                                            <h3 className="text-gray-500 font-bold mb-4 text-sm uppercase tracking-wide text-left">Upload Screenshot</h3>
                                            
                                            <label className="flex-1 border-2 border-dashed border-teal-200 hover:border-teal-500 bg-teal-50/30 hover:bg-teal-50 transition-all rounded-xl cursor-pointer flex flex-col items-center justify-center p-6 group">
                                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                                
                                                {previewUrl ? (
                                                    <div className="relative w-full h-full flex flex-col items-center">
                                                        <img src={previewUrl} alt="Preview" className="h-32 object-contain rounded-lg shadow-md mb-2" />
                                                        <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                                                            <FaCheckCircle /> Image Selected
                                                        </span>
                                                        <span className="text-xs text-gray-400 mt-1">{screenshot.name}</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-teal-600">
                                                            <FaUpload size={24} />
                                                        </div>
                                                        <p className="text-gray-600 font-medium text-sm">Click to upload proof</p>
                                                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, JPEG</p>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            type="button" 
                                            onClick={() => setStep(1)} 
                                            className="w-1/3 bg-gray-100 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                        >
                                            <FaArrowLeft /> Back
                                        </button>
                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit" 
                                            disabled={loading} 
                                            className="w-2/3 bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-200/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                                        >
                                            {loading ? (
                                                <span className="animate-pulse">Verifying...</span>
                                            ) : (
                                                <>Complete Donation <FaCheckCircle /></>
                                            )}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* --- STEP 3: SUCCESS --- */}
                            {step === 3 && (
                                <motion.div 
                                    key="step3"
                                    initial={{ scale: 0.8, opacity: 0 }} 
                                    animate={{ scale: 1, opacity: 1 }} 
                                    className="text-center py-10 flex flex-col items-center justify-center h-full"
                                >
                                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                        <FaCheckCircle className="text-6xl text-green-500" />
                                    </div>
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h2>
                                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                                        Your generosity makes a real difference. <br/>
                                        <span className="text-teal-600 font-medium">We have received your details and will verify the payment shortly.</span>
                                    </p>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.location.reload()} 
                                        className="bg-teal-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-teal-700 transition"
                                    >
                                        Make Another Donation
                                    </motion.button>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

// --- HELPER COMPONENT: Modern Input Field ---
const InputField = ({ label, icon, ...props }) => (
    <div className="relative group">
        <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">{label}</label>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                {icon}
            </span>
            <input 
                {...props}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:bg-white transition-all font-medium text-gray-700 placeholder-gray-400"
            />
        </div>
    </div>
);

export default Donation;