import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 font-ubuntu">
            {/* Admin Header */}
            <div className="bg-teal-800 text-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-xl font-bold">Samvardhan Admin Panel</h1>
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold transition"
                >
                    Logout
                </button>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-6xl mx-auto p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Management Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                        <h3 className="text-xl font-bold mb-2">Manage Events</h3>
                        <p className="text-gray-600 mb-4">Add, edit, or delete timeline events in "Our Work".</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                            onClick={() => navigate('/admin/events')}>
                            Go to Events
                        </button>
                    </div>

                    {/* Photo Management Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                        <h3 className="text-xl font-bold mb-2">Manage Gallery</h3>
                        <p className="text-gray-600 mb-4">Upload or remove photos from the Gallery.</p>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 w-full">
                            Go to Gallery
                        </button>
                    </div>

                    {/* Donation Management Card (Add this inside the grid-cols-2 div) */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500">
                        <h3 className="text-xl font-bold mb-2">Verify Donations</h3>
                        <p className="text-gray-600 mb-4">Check payment proofs and manage donor records.</p>
                        <button 
                            onClick={() => navigate('/admin/donations')}
                            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 w-full"
                        >
                            Go to Donations
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;