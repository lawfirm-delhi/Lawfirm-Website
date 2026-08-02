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
            <div className="auth-logo-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src="/images/logo.png" alt="NYATI Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
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
