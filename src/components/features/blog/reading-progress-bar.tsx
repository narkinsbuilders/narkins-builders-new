'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ReadingProgressBarProps {
  className?: string;
}

export function ReadingProgressBar({ className = '' }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    const handleScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-[60] h-2 bg-gray-200 border-b border-gray-300 ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-black to-gray-800"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      />
      {/* Debug indicator */}
      <div className="absolute top-full left-0 text-xs bg-black text-white px-2 py-1 rounded-b">
        Progress: {Math.round(progress)}%
      </div>
    </div>
  );
}

export default ReadingProgressBar;