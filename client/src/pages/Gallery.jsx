import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaTimes, FaCamera, FaChevronLeft, FaChevronRight, FaDownload, FaExpand } from 'react-icons/fa';

// --- 3D TILT CARD COMPONENT (The "Wow" Factor) ---
const TiltCard = ({ children, onClick, index }) => {
    const ref = useRef(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Calculate rotation based on mouse position
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
    
    // Dynamic glare effect opacity and position
    const glareOpacity = useTransform(mouseY, [-0.5, 0.5], [0, 0.4]);
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Calculate normalized mouse position (-0.5 to 0.5)
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="break-inside-avoid mb-8 relative group cursor-pointer perspective-1000 z-10"
        >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border-4 border-white/50 transform-gpu transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(13,148,136,0.3)]">
                
                {/* The Content */}
                <div className="relative z-10">
                    {children}
                </div>

                {/* The Glare Effect (Shimmer) */}
                <motion.div 
                    style={{ 
                        opacity: glareOpacity,
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8) 0%, transparent 80%)`,
                        zIndex: 20
                    }}
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between"
                    >
                        <span className="text-white font-bold tracking-wider text-sm uppercase flex items-center gap-2">
                             View <FaExpand />
                        </span>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

    // --- Fetch Photos ---
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const res = await axios.get('${API_URL}/api/photos');
                setPhotos(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching photos:", err);
                setLoading(false);
            }
        };
        fetchPhotos();
    }, []);

    // --- Keyboard Navigation ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedPhotoIndex === null) return;
            if (e.key === 'Escape') setSelectedPhotoIndex(null);
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPhotoIndex, photos]);

    const handleNext = (e) => {
        e?.stopPropagation();
        setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
    };

    const handlePrev = (e) => {
        e?.stopPropagation();
        setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    // --- Skeleton Loader ---
    const SkeletonCard = () => (
        <div className="break-inside-avoid mb-8 bg-gray-200/50 rounded-2xl h-80 relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[shimmer_1.5s_infinite]"></div>
        </div>
    );

    return (
        <div className="bg-[#FDF8F0] min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-ubuntu relative overflow-hidden selection:bg-teal-200 selection:text-teal-900">
            
            {/* --- 1. LIVING BACKGROUND (Aurora Effect) --- */}
            <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                {/* Blob 1 */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0],
                        y: [0, -50, 0]
                    }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-teal-200/20 rounded-full blur-[100px] mix-blend-multiply"
                />
                {/* Blob 2 */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        x: [0, -100, 0],
                        y: [0, 100, 0]
                    }} 
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-orange-100/40 rounded-full blur-[100px] mix-blend-multiply"
                />
                {/* Blob 3 */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        x: [0, 50, 0],
                    }} 
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-blue-100/30 rounded-full blur-[80px] mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto">
                
                {/* --- 2. HEADER SECTION (Preserved Style, Enhanced Animation) --- */}
                <div className="text-center mb-20 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-2 text-orange-500 mb-2"
                    >
                        <FaCamera size={24} className="animate-bounce" />
                        <span className="uppercase tracking-widest font-bold text-xl">Our Memories</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold text-gray-900 relative inline-block"
                    >
                        Moments of <span className="text-teal-600 relative">
                            Impact
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto"
                    >
                        A visual journey through our efforts to heal the earth and feed the soul.
                    </motion.p>
                </div>

                {/* --- 3. THE GALLERY GRID (Masonry + 3D Tilt) --- */}
                {loading ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : photos.length === 0 ? (
                    <div className="text-center py-24 bg-white/40 backdrop-blur-md rounded-3xl border border-white shadow-xl">
                        <p className="text-2xl text-gray-500 font-light">The gallery is awaiting its first memory.</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 px-2">
                        {photos.map((photo, index) => (
                            <TiltCard key={photo._id} index={index} onClick={() => setSelectedPhotoIndex(index)}>
                                <img 
                                    src={photo.imageUrl} 
                                    alt="Gallery Memory" 
                                    className="w-full h-auto object-cover block"
                                    loading="lazy"
                                />
                                {photo.caption && (
                                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                                        <p className="text-white font-medium text-sm truncate border-l-2 border-orange-400 pl-2">
                                            {photo.caption}
                                        </p>
                                    </div>
                                )}
                            </TiltCard>
                        ))}
                    </div>
                )}
            </div>

            {/* --- 4. IMMERSIVE LIGHTBOX --- */}
            <AnimatePresence>
                {selectedPhotoIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden"
                        onClick={() => setSelectedPhotoIndex(null)}
                    >
                        {/* Background blurred clone for atmosphere */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none scale-110 blur-3xl">
                             <img 
                                src={photos[selectedPhotoIndex].imageUrl} 
                                className="w-full h-full object-cover" 
                                alt="Atmosphere"
                            />
                        </div>

                        {/* Controls */}
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition z-50 group">
                            <FaTimes size={28} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <button 
                            className="absolute left-4 md:left-10 text-white/30 hover:text-white p-4 transition-all hover:scale-125 z-50 focus:outline-none"
                            onClick={handlePrev}
                        >
                            <FaChevronLeft size={48} />
                        </button>

                        <button 
                            className="absolute right-4 md:right-10 text-white/30 hover:text-white p-4 transition-all hover:scale-125 z-50 focus:outline-none"
                            onClick={handleNext}
                        >
                            <FaChevronRight size={48} />
                        </button>

                        {/* Main Image Stage */}
                        <motion.div 
                            key={selectedPhotoIndex}
                            initial={{ scale: 0.8, opacity: 0, rotateX: 10 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotateX: -10 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className="relative max-w-7xl w-full max-h-screen p-4 md:p-10 flex flex-col items-center justify-center z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative group shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                                <img 
                                    src={photos[selectedPhotoIndex].imageUrl} 
                                    alt="Full Screen" 
                                    className="max-h-[85vh] w-auto object-contain rounded-lg border border-white/10"
                                />
                                
                                {/* Info & Actions Bar (Appears on Hover) */}
                                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    {photos[selectedPhotoIndex].caption ? (
                                        <span className="text-white font-medium font-ubuntu text-sm">
                                            {photos[selectedPhotoIndex].caption}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 text-sm italic">No caption</span>
                                    )}
                                    <div className="w-px h-4 bg-white/20"></div>
                                    <a 
                                        href={photos[selectedPhotoIndex].imageUrl} 
                                        download 
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-teal-400 hover:text-teal-300 transition-colors"
                                        title="Download Photo"
                                    >
                                        <FaDownload />
                                    </a>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;