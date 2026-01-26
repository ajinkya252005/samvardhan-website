import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { 
    FaSignOutAlt, FaCalendarAlt, FaImages, FaHandHoldingHeart, 
    FaUserShield, FaSpinner, FaArrowRight, FaExclamationCircle,FaPenNib 
} from 'react-icons/fa';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        events: 0,
        photos: 0,
        donations: 0,
        pendingDonations: 0
    });

    // 1. Check Auth & Fetch Stats
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/login');
            return;
        }

        const fetchStats = async () => {
            try {
                // Fetch all data in parallel for speed
                const [eventsRes, photosRes, donationsRes] = await Promise.all([
                    api.get('/events'),
                    api.get('/photos'),
                    api.get('/donations')
                ]);

                // Calculate stats
                const pending = donationsRes.data.filter(d => !d.isVerified).length;

                setStats({
                    events: eventsRes.data.length,
                    photos: photosRes.data.length,
                    donations: donationsRes.data.length,
                    pendingDonations: pending
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
                setLoading(false);
            }
        };

        fetchStats();
    }, [navigate]);

    const handleLogout = () => {
        if(window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('adminToken');
            navigate('/login');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-teal-600">
            <FaSpinner className="animate-spin text-4xl" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-ubuntu">
            
            {/* --- Top Navbar --- */}
            <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 text-teal-800">
                        <div className="bg-teal-100 p-2 rounded-lg">
                            <FaUserShield size={24} className="text-teal-700" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold leading-none">Admin Panel</h1>
                            <span className="text-xs text-gray-500 font-medium tracking-wider">SAMVARDHAN</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition font-medium text-sm"
                    >
                        <span>Logout</span>
                        <FaSignOutAlt />
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
                
                {/* --- Welcome Section --- */}
                <header>
                    <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
                    <p className="text-gray-500 mt-1">Manage your website content and donor relations.</p>
                </header>

                {/* --- Quick Stats Grid --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <StatCard 
                        label="Total Events" 
                        value={stats.events} 
                        icon={<FaCalendarAlt />} 
                        color="bg-blue-50 text-blue-600" 
                    />
                    <StatCard 
                        label="Gallery Photos" 
                        value={stats.photos} 
                        icon={<FaImages />} 
                        color="bg-orange-50 text-orange-600" 
                    />
                    <StatCard 
                        label="Total Donations" 
                        value={stats.donations} 
                        icon={<FaHandHoldingHeart />} 
                        color="bg-teal-50 text-teal-600" 
                    />
                    <StatCard 
                        label="Pending Verification" 
                        value={stats.pendingDonations} 
                        icon={<FaExclamationCircle />} 
                        color="bg-red-50 text-red-600" 
                        highlight={stats.pendingDonations > 0}
                    />
                </div>

                {/* --- Main Action Modules --- */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-teal-500 pl-3">
                        Management Modules
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* 1. Manage Donations */}
                        <DashboardCard 
                            title="Donation Requests"
                            desc="View proof screenshots and verify donor payments."
                            icon={<FaHandHoldingHeart className="text-4xl text-teal-500 group-hover:scale-110 transition duration-300" />}
                            path="/admin/donations"
                            actionText="Verify Now"
                            navigate={navigate}
                            alertCount={stats.pendingDonations}
                        />

                        {/* 2. Manage Events */}
                        <DashboardCard 
                            title="Timeline Events"
                            desc="Add new initiatives or update the 'Our Work' timeline."
                            icon={<FaCalendarAlt className="text-4xl text-blue-500 group-hover:scale-110 transition duration-300" />}
                            path="/admin/events"
                            actionText="Manage Timeline"
                            navigate={navigate}
                        />

                        {/* 3. Manage Gallery */}
                        <DashboardCard 
                            title="Photo Gallery"
                            desc="Upload event photos to showcase impact."
                            icon={<FaImages className="text-4xl text-orange-500 group-hover:scale-110 transition duration-300" />}
                            path="/admin/gallery"
                            actionText="Update Gallery"
                            navigate={navigate}
                        />

                        {/* 4. Manage Blogs (NEW) */}
                        <DashboardCard 
                            title="Blog Articles"
                            desc="Share insights and external article links."
                            icon={<FaPenNib className="text-4xl text-purple-500 group-hover:scale-110 transition duration-300" />}
                            path="/admin/blogs"
                            actionText="Manage Blogs"
                            navigate={navigate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

const StatCard = ({ label, value, icon, color, highlight }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 ${highlight ? 'ring-2 ring-red-100' : ''}`}>
        <div className={`p-3 rounded-xl ${color} text-xl`}>
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">{label}</p>
        </div>
    </div>
);

const DashboardCard = ({ title, desc, icon, path, actionText, navigate, alertCount }) => (
    <div 
        onClick={() => navigate(path)}
        className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
    >
        {/* Background Decoration */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-gray-50 rounded-full group-hover:scale-150 transition duration-500"></div>

        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-white group-hover:shadow-sm transition">
                    {icon}
                </div>
                {alertCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-red-200 shadow-lg">
                        {alertCount} Pending
                    </span>
                )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-700 transition">
                {title}
            </h3>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                {desc}
            </p>

            <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-teal-600 transition gap-2">
                {actionText} <FaArrowRight className="group-hover:translate-x-1 transition" />
            </div>
        </div>
    </div>
);

export default AdminDashboard;