"use client";
import FaceTracker from './components/FaceTracker.js';
import VideoRecorder from './components/VideoRecorder.js';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent p-2 md:p-6 font-sans">
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-5xl mx-auto text-center mb-6 mt-8"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#393053] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          Face Tracking + Video Recording
        </h1>
        
      </motion.header>

      <main className="w-full max-w-5xl flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left column: FaceTracker */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="card-premium section-gap px-4 py-6 md:p-8 flex-1 min-w-0"
          >
            <FaceTracker />
          </motion.section>
          {/* Right column: VideoRecorder (top), VideoPlayer (bottom) */}
          <div className="flex flex-col gap-8 md:gap-12 flex-1 min-w-0">
            <motion.section
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="card-premium section-gap px-4 py-6 md:p-8"
            >
              <VideoRecorder />
            </motion.section>
           
          </div>
        </div>
      </main>

      <footer className="text-xs text-[#393053] mt-8 mb-2 opacity-80 text-center">
        &copy; {new Date().getFullYear()} Face Tracker
      </footer>
    </div>
  );
} 