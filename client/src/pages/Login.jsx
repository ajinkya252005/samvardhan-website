import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { FaLock, FaUser } from 'react-icons/fa';

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
            // Send credentials to backend
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });

            // If successful, save the token and redirect
            localStorage.setItem('adminToken', res.data.token); // Save Token!
            localStorage.setItem('isAdmin', 'true'); // Keep this for simple UI checks
            navigate('/admin');

        } catch (err) {
            // Handle errors from backend
            const msg = err.response?.data?.message || "Login failed. Check server.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-teal-50 flex items-center justify-center px-4 font-ubuntu">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-teal-800">Admin Login</h2>
                    <p className="text-gray-500 mt-2">Secure access for Samvardhan Team</p>
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
                            <span className="absolute left-3 top-3 text-gray-400"><FaUser /></span>
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
                            <span className="absolute left-3 top-3 text-gray-400"><FaLock /></span>
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
                        disabled={loading}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition duration-300 disabled:bg-teal-400"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;