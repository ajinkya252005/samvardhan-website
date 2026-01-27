import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaUser, FaArrowLeft, FaHandHoldingHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import API_URL from '../config';

// Assets
import logo from '../assets/Samvardhan-logo-final.png';
import bgImage from '../assets/about-us.png'; // Using the team photo for context

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, {
                username,
                password
            });

            localStorage.setItem('adminToken', res.data.token);
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin');

        } catch (err) {
            const msg = err.response?.data?.message || "Login failed. Check server.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-ubuntu">
            
            {/* --- LEFT SIDE: Visual & Brand (Hidden on Mobile) --- */}
            <div className="hidden md:flex md:w-1/2 bg-teal-900 relative items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={bgImage} 
                        alt="Samvardhan Team" 
                        className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 to-teal-900/60 mix-blend-multiply" />
                </div>

                {/* Content over Image */}
                <div className="relative z-10 text-center p-12 text-white max-w-lg">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Updated Icon: Hand Holding Heart (Represents Care/Welfare + Nature) */}
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full inline-block mb-6 border border-white/20">
                            <FaHandHoldingHeart size={40} className="text-teal-300" />
                        </div>
                        
                        {/* Updated Text: Inclusive of Community Drives */}
                        <h2 className="text-4xl font-bold mb-4 font-bebas tracking-wide">
                            For Planet & People
                        </h2>
                        <p className="text-teal-100 text-lg leading-relaxed">
                            "Welcome to the control center. Your efforts here drive our mission to restore the environment and uplift our community."
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* --- RIGHT SIDE: Login Form --- */}
            <div className="w-full md:w-1/2 bg-[#FDF8F0] flex flex-col justify-center items-center p-6 sm:p-12 relative">
                
                {/* Back to Home Link */}
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-teal-700 transition font-bold text-sm">
                    <FaArrowLeft /> Back to Website
                </Link>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-teal-50"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <img src={logo} alt="Logo" className="h-16 w-auto mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
                        <p className="text-gray-500 text-sm mt-1">Enter your credentials to access the dashboard</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm"
                        >
                            <p className="font-bold">Access Denied</p>
                            <p>{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Username</label>
                            <div className="relative group">
                                <span className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-teal-600 transition">
                                    <FaUser />
                                </span>
                                <input 
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all font-medium"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Password</label>
                            <div className="relative group">
                                <span className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-teal-600 transition">
                                    <FaLock />
                                </span>
                                <input 
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all font-medium"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-teal-200 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Authenticating...
                                </span>
                            ) : "Sign In to Dashboard"}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400">
                            Authorized personnel only. <br/>
                            &copy; {new Date().getFullYear()} Samvardhan.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;