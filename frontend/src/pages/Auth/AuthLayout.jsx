import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <Link to="/">
              <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                <svg width="32" height="32" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-500">
                  <path d="M15 3V27M6 9L2 17.5C2 20 4.5 21.5 6 21.5C7.5 21.5 10 20 10 17.5L6 9ZM24 9L20 17.5C20 20 22.5 21.5 24 21.5C25.5 21.5 28 20 28 17.5L24 9ZM6 9L15 6L24 9M9 27H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-primary-900 font-serif">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-center text-sm text-neutral-600">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-neutral-100 relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-900 via-accent-500 to-primary-900"></div>
          
          {children}
        </motion.div>
      </div>
    </div>
  );
}
