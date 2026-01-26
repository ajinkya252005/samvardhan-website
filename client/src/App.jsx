import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import OurWork from './pages/OurWork';
import Gallery from './pages/Gallery';
import Donation from './pages/Donation'; // Matches your import
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManageDonations from './pages/ManageDonations';
import ManageEvents from './pages/ManageEvents';
import ManageGallery from './pages/ManageGallery';
import Blogs from './pages/Blogs';
import ManageBlogs from './pages/ManageBlogs';

// --- Layout Component ---
// This acts as a wrapper for pages that NEED the Navbar and Footer
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <Outlet /> {/* This renders the child page (Home, Gallery, etc.) */}
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router><main className="flex-grow pt-16">
       
       <Routes>
         
          {/* --- Group 1: Public Pages (With Navbar & Footer) --- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<OurWork />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/blogs" element={<Blogs />} />  {/* <--- ADD THIS */}
          </Route>
        

          {/* --- Group 2: Admin Pages (NO Navbar/Footer) --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/donations" element={<ManageDonations />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/gallery" element={<ManageGallery />} />
          <Route path="/admin/blogs" element={<ManageBlogs />} />  {/* <--- ADD THIS */}

       </Routes></main>
    </Router>
  );
}

export default App;