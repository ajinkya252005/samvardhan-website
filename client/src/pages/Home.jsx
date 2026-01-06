import React from 'react';
import { Link } from 'react-router-dom';
import { FaTree, FaUsers, FaHandHoldingHeart, FaLeaf } from 'react-icons/fa';
// Ensure this path matches your file
import homePageImage from '../assets/Samvardhan-home-page.jpeg';

const Home = () => {
  return (
    <div className="w-full bg-[#FDF8F0]">
      
      {/* 1. HERO SECTION */}
      <div className="relative pt-10 pb-20 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between min-h-[90vh]">
        
        {/* Left Side: Text & Headline */}
        <div className="md:w-1/2 z-10 mb-10 md:mb-0">
          <h1 className="text-6xl md:text-9xl font-ubuntu font-bold text-gray-900 leading-tight tracking-normal">
            Preserving <br />
            <span className="text-teal-600">Purity</span>
          </h1>
          
          <div className="my-8 flex items-center space-x-2">
             <div className="w-16 h-16 rounded-full border-4 border-orange-300"></div>
             <div className="w-16 h-16 rounded-full bg-teal-500 opacity-80"></div>
          </div>

          <p className="text-3xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            <b>Empowering Environmental Conservation and Community Welfare</b>
          </p>

          <div className="flex gap-4">
            <Link to="/donate">
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition shadow-lg flex items-center gap-2 font-ubuntu">
                Join now <span>→</span>
              </button>
            </Link>
            <Link to="/work">
              <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-bold py-3 px-8 rounded-full transition font-ubuntu">
                Our Impact
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div className="md:w-1/2 relative w-full">
          {/* Decorative Blob (Hidden on Mobile for simplicity) */}
          <div className="absolute top-10 right-0 w-4/5 h-full bg-teal-100 rounded-tl-[100px] -z-0 hidden md:block"></div>
          
          <div className="relative z-10 ml-auto w-full max-w-lg group">
             
             {/* Text Overlay (Visible on ALL screens now) */}
             <div className="absolute top-6 left-4 right-4 md:bottom-auto md:top-16 md:right-auto md:left-auto md:-left-20 z-20">
                <div className="bg-teal-900/80 backdrop-blur-md p-6 rounded-xl md:rounded-r-full shadow-2xl border-l-4 border-orange-400">
                    <p className="font-bold text-lg md:text-2xl font-ubuntu text-white tracking-wider leading-snug text-center md:text-left">
                      "TOGETHER FOR <br className="hidden md:block"/> PLANET AND PEOPLE"
                    </p>
                </div>
             </div>

             {/* Image (Rounded Square on Mobile, Curved on Desktop) */}
             <img 
               src={homePageImage} 
               alt="Samvardhan Team" 
               className="w-full object-cover h-[400px] md:h-[500px] relative z-10 rounded-xl md:rounded-none md:rounded-tl-[120px] shadow-2xl" 
             />
          </div>
        </div>
      </div>

      {/* 2. STATS SECTION */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">50+</h3>
              <p className="text-gray-500 mt-2 font-medium">Cleanliness Drives</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">1000+</h3>
              <p className="text-gray-500 mt-2 font-medium">Lives Impacted</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">1 Yr</h3>
              <p className="text-gray-500 mt-2 font-medium">Of Consistency</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">20+</h3>
              <p className="text-gray-500 mt-2 font-medium">Partners</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ABOUT / MISSION SECTION */}
      <div className="py-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-200 rounded-full opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop" 
              alt="Mission" 
              className="rounded-3xl shadow-xl relative z-10 w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h4 className="text-orange-500 font-bold tracking-widest uppercase mb-2 font-ubuntu">Who We Are</h4>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-ubuntu">An organization <br/> For the people, by the people</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Through our cleanliness drives, community support, and sustainable initiatives, we've worked towards a better world. This is just the beginning—join us in shaping a future where every space is clean, and every person is cared for.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-lg text-teal-600"><FaLeaf size={24}/></div>
                    <div>
                        <h5 className="font-bold text-gray-800 font-ubuntu">Sustainability</h5>
                        <p className="text-sm text-gray-500">Eco-friendly drives</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg text-orange-600"><FaUsers size={24}/></div>
                    <div>
                        <h5 className="font-bold text-gray-800 font-ubuntu">Community</h5>
                        <p className="text-sm text-gray-500">Inclusive growth</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 4. CALL TO ACTION */}
      <div className="bg-teal-700 py-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="w-64 h-64 bg-white rounded-full absolute -top-20 -left-20"></div>
              <div className="w-96 h-96 bg-white rounded-full absolute bottom-0 right-0"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10 font-ubuntu">Ready to make a difference?</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto relative z-10">Join our community of changemakers today. Every small step counts.</p>
          <Link to="/contact">
            <button className="bg-white text-teal-800 font-bold py-3 px-10 rounded-full hover:bg-gray-100 transition relative z-10 font-ubuntu shadow-md">
                Get Involved
            </button>
          </Link>
      </div>
    </div>
  );
};

export default Home;