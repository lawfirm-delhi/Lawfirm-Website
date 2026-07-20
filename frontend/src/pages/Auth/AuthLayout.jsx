import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="auth-logo-box">
              <svg width="32" height="32" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--accent-color)' }}>
                <path d="M15 3V27M6 9L2 17.5C2 20 4.5 21.5 6 21.5C7.5 21.5 10 20 10 17.5L6 9ZM24 9L20 17.5C20 20 22.5 21.5 24 21.5C25.5 21.5 28 20 28 17.5L24 9ZM6 9L15 6L24 9M9 27H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
          <h2 className="auth-title">
            {title}
          </h2>
          {subtitle && (
            <p className="auth-subtitle">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="auth-card"
      >
        {children}
      </motion.div>
    </div>
  );
}
