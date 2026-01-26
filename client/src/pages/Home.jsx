import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Added FaHeart and FaHands to imports
import { FaTree, FaUsers, FaHandHoldingHeart, FaLeaf, FaNewspaper, FaArrowRight, FaHeart, FaHands } from 'react-icons/fa';

// Import Images
import homePageImage from '../assets/Samvardhan-home-page.jpeg';
import aboutUsImage from '../assets/about-us.png';
import mediaAndPub1 from '../assets/media-and-pub-1.png';
import mediaAndPub2 from '../assets/media-and-pub-2.png';
import mediaAndPub3 from '../assets/media-and-pub-3.png';
import logo from '../assets/PurityLogo.png';

const Home = () => {
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
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">10+</h3>
              <p className="text-gray-500 mt-2 font-medium">Cleanliness Drives</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">500+</h3>
              <p className="text-gray-500 mt-2 font-medium">Volunteers</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">1 Yr</h3>
              <p className="text-gray-500 mt-2 font-medium">Of Consistency</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-teal-600 font-ubuntu">5+</h3>
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

      {/* 4. MEDIA & PUBLICATIONS SECTION */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="text-orange-500 font-bold tracking-widest uppercase mb-2 font-ubuntu">Samvardhan in a glance</h4>
            <h2 className="text-4xl font-bold text-gray-900 font-ubuntu">Reports & Publications</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Article 2 */}
            <div className="bg-[#FDF8F0] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src={mediaAndPub2}
                  alt="Report"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-teal-600 font-bold mb-3">
                  <FaNewspaper /> <span>Tanmayee Deshpande</span> • <span>May 2025</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-ubuntu leading-tight">
                  Report: Rains no longer bring joy.
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Senior Associate, Tanmayee Deshpande, reflects on personal experiences and urgent environmental concerns in her latest article.
                  Let’s talk about climate resilience, infrastructure, and the need for collective action before it’s too late.
                </p>
                <a
                  href="https://www.linkedin.com/posts/samvardhan9_rains-no-longer-bring-joy-activity-7330936905234108416-ScMw?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAELDIskBCFYw14vzJUJa_mwed8_Y3rS0Z5o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-500 font-bold hover:text-orange-600 transition"
                >
                  Read Report <FaArrowRight className="ml-2 text-sm" />
                </a>
              </div>
            </div>

            {/* Article 1 */}
            <div className="bg-[#FDF8F0] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src={mediaAndPub1}
                  alt="Cleanliness Drive"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-teal-600 font-bold mb-3">
                  <FaNewspaper /> <span>Indian Express</span> • <span>Sept 29, 2025</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-ubuntu leading-tight">
                  How garbage issue in Pune is sparking civic sense.
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Samvardhan is the story of young citizens reclaiming Pune's hills. Formed in August 2024 by a group of commerce students, the initiative began with cleaning hangout spots like ARAI, Law College tekdi, and Symbiosis Hill.
                </p>
                <a
                  href="https://www.linkedin.com/posts/samvardhan9_proud-moment-for-samvardhan-grateful-activity-7379014083481829376--pln?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAELDIskBCFYw14vzJUJa_mwed8_Y3rS0Z5o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-500 font-bold hover:text-orange-600 transition"
                >
                  Read Article <FaArrowRight className="ml-2 text-sm" />
                </a>
              </div>
            </div>

            {/* Article 3 */}
            <div className="bg-[#FDF8F0] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src={mediaAndPub3}
                  alt="Cleanliness Drive"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-teal-600 font-bold mb-3">
                  <FaNewspaper /> <span>Saurabh Godbole</span> • <span>May 2025</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-ubuntu leading-tight">
                  Rising heat, rising hope.
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Our planet is warming, and Pune is no exception. This insightful article by our associate Saurabh Godbole highlights the urgent climate challenges our city faces and why collective action matters now more than ever.
                </p>
                <a
                  href="https://www.linkedin.com/posts/samvardhan9_rising-heat-rising-hope-activity-7326104844027506690-2mjN?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAELDIskBCFYw14vzJUJa_mwed8_Y3rS0Z5o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-500 font-bold hover:text-orange-600 transition"
                >
                  Read Report <FaArrowRight className="ml-2 text-sm" />
                </a>
              </div>
            </div>
          </div>
          {/* --- NEW: Read Blogs Button --- */}
          <div className="text-center mt-12">
            <Link to="/blogs">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-orange-200 transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto font-ubuntu">
                Read Our Blogs <FaArrowRight />
              </button>
            </Link>
          </div>
          {/* ------------------------------- */}

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