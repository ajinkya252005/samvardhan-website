import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Added FaHeart and FaHands to imports
import { FaTree, FaUsers, FaHandHoldingHeart, FaLeaf, FaNewspaper, FaArrowRight, FaHeart, FaHands, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios'; // ADDED axios
import API_URL from '../config'; // ADDED API_URL

// Import Images
import homePageImage from '../assets/Samvardhan-home-page.png';
import aboutUsImage from '../assets/about-us.png';
import mediaAndPub1 from '../assets/media-and-pub-1.png';
import mediaAndPub2 from '../assets/media-and-pub-2.png';
import mediaAndPub3 from '../assets/media-and-pub-3.png';
import logo from '../assets/PurityLogo.png';

const Home = () => {
  // --- ADDED STATE & FETCH LOGIC ---
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, articlesRes] = await Promise.all([
          axios.get(`${API_URL}/api/events`),
          axios.get(`${API_URL}/api/articles`)
        ]);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter for future events ONLY (date > today)
        const upcoming = eventsRes.data.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate > today;
        });

        // Sort upcoming by closest date first
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

        setUpcomingEvents(upcoming);
        setArticles(articlesRes.data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full bg-[#FDF8F0]">

      {/* 1. HERO SECTION */}
      <div className="relative pt-10 pb-20 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between min-h-[90vh]">

        {/* Left Side: Text & Headline */}
        <div className="md:w-1/2 z-10 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-9xl font-ubuntu font-bold text-gray-900 leading-tight tracking-normal">
            Preserving <br />
            <div className="flex items-center gap-4 md:gap-8">
              <span className="text-teal-600">Purity</span>
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                src={logo}
                alt="Samvardhan Logo"
                className="h-14 w-14 md:h-40 md:w-40 object-contain md:translate-y-4"
              />
            </div>
            {/* UPDATED: Icon Row (Side by Side) */}
            <div className="my-8 flex items-center gap-6">
              {/* Icon 1: Hands */}
              <div className="text-green-600">
                <FaHands size={50} />
              </div>

              {/* Icon 2: Users */}
              <div className="text-green-800">
                <FaUsers size={50} />
              </div>
            </div>

          </h1>

          <p className="text-3xl text-gray-600 mb-8 max-w-1/2 leading-relaxed">
            <b>Empowering Environmental Conservation and Community Welfare</b>
          </p>

          <div className="flex gap-4">
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLScF3U7Id6I9owmwjSenkC_PLINBXD2yB7jFDJiBAv69JVYiaA/viewform?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnZJ7BEvvlz68Tmo1FCHsQpDdJg2cMRXDw2DboJyNcFeqiR7R0sC-SljaKkmo_aem_xCOblVXQ2Z8nxpd7jrdB3w">
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

            {/* Text Overlay */}
            <div className="absolute top-6 left-4 right-4 md:bottom-auto md:top-16 md:right-auto md:left-auto md:-left-20 z-20">
              <div className="bg-teal-900/80 backdrop-blur-md p-6 rounded-xl md:rounded-r-full shadow-2xl border-l-4 border-orange-400">
                <p className="font-bold text-lg md:text-2xl font-ubuntu text-white tracking-wider leading-snug text-center md:text-left">
                  "TOGETHER FOR <br className="hidden md:block" /> PLANET AND PEOPLE"
                </p>
              </div>
            </div>

            {/* Image */}
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
          {/* Existing Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">15+</h3>
              <p className="text-gray-500 mt-2 font-medium">Cleanliness Drives</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">500+</h3>
              <p className="text-gray-500 mt-2 font-medium">Volunteers</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">2 Yr</h3>
              <p className="text-gray-500 mt-2 font-medium">Of Consistency</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">7+</h3>
              <p className="text-gray-500 mt-2 font-medium">Community Drives</p>
            </div>
          </div>

          {/* --- NEW LINE ADDED HERE --- */}
          <div className="mt-12 text-center">
            <p className="text-lg md:text-2xl font-ubuntu font-bold text-gray-700 tracking-wide max-w-3xl mx-auto leading-relaxed">
              Protecting nature, educating communities, and building a sustainable future
            </p>
            {/* Decorative underline for impact */}
            <div className="w-24 h-1 bg-orange-400 mx-auto mt-4 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 3. ABOUT / MISSION SECTION */}
      <div className="py-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-200 rounded-full opacity-50"></div>

            <img
              src={aboutUsImage}
              alt="Mission"
              className="rounded-3xl shadow-xl relative z-10 w-full"
            />

          </div>
          <div className="md:w-1/2">
            <h4 className="text-orange-500 font-bold tracking-widest uppercase mb-2 font-ubuntu">Who We Are</h4>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-ubuntu">An organization <br /> For the people, by the people</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Through our cleanliness drives, community support, and sustainable initiatives, we've worked towards a better world. This is just the beginning join us in shaping a future where every space is clean, and every person is cared for.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-3 rounded-lg text-teal-600"><FaLeaf size={24} /></div>
                <div>
                  <h5 className="font-bold text-gray-800 font-ubuntu">Sustainability</h5>
                  <p className="text-sm text-gray-500">Eco-friendly drives</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg text-orange-600"><FaUsers size={24} /></div>
                <div>
                  <h5 className="font-bold text-gray-800 font-ubuntu">Community</h5>
                  <p className="text-sm text-gray-500">Inclusive growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SAMVARDHAN IN A GLANCE (Upcoming Drives & Media) */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h4 className="text-orange-500 font-bold tracking-widest uppercase mb-5 font-ubuntu">Samvardhan in a glance</h4>
          </div>

          {/* GRID LAYOUT: 1 column on mobile, 2 side-by-side on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT SIDE: UPCOMING DRIVES */}
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-bold text-teal-700 mb-6 font-ubuntu flex items-center gap-2">
                <FaCalendarAlt /> Upcoming Drives
              </h3>
              
              <div className="flex-grow bg-[#FDF8F0] p-6 rounded-2xl shadow-inner border border-gray-100">
                {upcomingEvents.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-70">
                    <FaCalendarAlt className="text-6xl text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">No upcoming drives scheduled at the moment.</p>
                    <p className="text-gray-400 text-sm mt-1">Check back later or view our past work!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-200">
                    {upcomingEvents.map(event => (
                      <div key={event._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-5 hover:shadow-md transition">
                        <div className="flex-shrink-0 w-24 h-24 bg-teal-50 rounded-lg overflow-hidden border border-teal-100">
                          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-xs font-bold text-orange-500 mb-1 uppercase tracking-wider">
                            {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </p>
                          <h4 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{event.title}</h4>
                          <p className="text-gray-500 text-sm line-clamp-2">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE: MEDIA & PUBLICATIONS */}
            <div className="flex flex-col h-full overflow-hidden w-full">
              <h3 className="text-2xl font-bold text-teal-700 mb-6 font-ubuntu flex items-center gap-2">
                <FaNewspaper /> Media & Publications
              </h3>
              
              {articles.length === 0 ? (
                <div className="flex-grow bg-[#FDF8F0] rounded-2xl p-6 shadow-inner border border-gray-100 flex flex-col items-center justify-center text-center opacity-70">
                  <FaNewspaper className="text-6xl text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">No media publications added yet.</p>
                </div>
              ) : (
                /* HORIZONTAL SCROLL CONTAINER */
                <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-orange-200 w-full">
                  {articles.map(article => (
                    <div key={article._id} className="min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] bg-[#FDF8F0] rounded-xl overflow-hidden shadow-md border border-gray-100 snap-center flex flex-col group hover:-translate-y-1 transition duration-300">
                      <div className="h-48 overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex justify-between items-center text-xs text-teal-600 font-bold mb-3">
                          <span className="bg-teal-50 px-2 py-1 rounded-md">{article.publisher || "Media"}</span>
                          <span>{new Date(article.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3 font-ubuntu leading-tight">
                          {article.title}
                        </h4>
                        <div className="mt-auto pt-4 border-t border-gray-200">
                          {article.link ? (
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-orange-500 font-bold text-sm hover:text-orange-600 transition group-hover:gap-2">
                              Read Article <FaArrowRight className="ml-1" />
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm italic">Offline Publication</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
          
          {/* Blogs Button */}
          <div className="text-center mt-12">
            <Link to="/blogs">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-orange-200 transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto font-ubuntu">
                Read Our Blogs <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>


      {/* 5. CALL TO ACTION */}
      <div className="bg-teal-700 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="w-64 h-64 bg-white rounded-full absolute -top-20 -left-20"></div>
          <div className="w-96 h-96 bg-white rounded-full absolute bottom-0 right-0"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10 font-ubuntu">Ready to make a difference?</h2>
        <p className="text-teal-100 mb-8 max-w-2xl mx-auto relative z-10">Join our community of changemakers today. Every small step counts.</p>
        <Link to="https://docs.google.com/forms/d/e/1FAIpQLScF3U7Id6I9owmwjSenkC_PLINBXD2yB7jFDJiBAv69JVYiaA/viewform?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnZJ7BEvvlz68Tmo1FCHsQpDdJg2cMRXDw2DboJyNcFeqiR7R0sC-SljaKkmo_aem_xCOblVXQ2Z8nxpd7jrdB3w">
          <button className="bg-white text-teal-800 font-bold py-3 px-10 rounded-full hover:bg-gray-100 transition relative z-10 font-ubuntu shadow-md">
            Get Involved
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;