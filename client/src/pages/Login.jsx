import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // --- HARDCODED CREDENTIALS ---
        // Change these to whatever you want!
        const ADMIN_USER = "admin";
        const ADMIN_PASS = "admin123";

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            // Login Success: Save a "token" to browser storage
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-teal-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-teal-800">Admin Login</h2>
                    <p className="text-gray-500 mt-2">Sign in to manage events & photos</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Username</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <FaUser />
                            </span>
                            <input 
                                type="text"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <FaLock />
                            </span>
                            <input 
                                type="password"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;