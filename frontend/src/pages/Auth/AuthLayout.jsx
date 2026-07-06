import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './Auth.css';

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      {/* LEFT PANEL: Form Area */}
      <div className="auth-left">
        <nav className="auth-nav">
          <Link to="/"><ArrowLeft size={16} /> Return to Home</Link>
        </nav>
        
        <div className="auth-content">
          {children}
        </div>

        <footer className="auth-footer">
          <span>&copy; {new Date().getFullYear()} Justice &amp; Associates</span>
          <div style={{display:'flex', gap:'1rem'}}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </footer>
      </div>

      {/* RIGHT PANEL: Luxury Branding */}
      <div className="auth-right">
        <div className="auth-right-bg"></div>
        <svg className="auth-illustration" viewBox="0 0 420 460" preserveAspectRatio="xMidYMid slice">
           <defs>
             <radialGradient id="authAura" cx="50%" cy="35%" r="60%">
               <stop offset="0%" stopColor="#B8935A" stopOpacity="0.2"/>
               <stop offset="100%" stopColor="#0A1628" stopOpacity="0"/>
             </radialGradient>
           </defs>
           <circle cx="210" cy="150" r="180" fill="url(#authAura)"/>
           <path d="M70 190 L210 120 L350 190 Z" fill="none" stroke="#B8935A" strokeWidth="1" opacity="0.5"/>
           <rect x="60" y="188" width="300" height="4" fill="#B8935A" opacity="0.3"/>
           <rect x="88" y="205" width="2" height="150" fill="#B8935A" opacity="0.3"/>
           <rect x="146" y="205" width="2" height="150" fill="#B8935A" opacity="0.3"/>
           <rect x="204" y="205" width="2" height="150" fill="#B8935A" opacity="0.3"/>
           <rect x="262" y="205" width="2" height="150" fill="#B8935A" opacity="0.3"/>
           <rect x="320" y="205" width="2" height="150" fill="#B8935A" opacity="0.3"/>
        </svg>

        <div style={{position: 'relative', zIndex: 2}}>
          <Link to="/" style={{display: 'inline-block'}}>
            <h2 style={{fontFamily: 'Cormorant Garamond', fontSize: '2rem', color: 'var(--heading)'}}>Justice &amp; Associates</h2>
            <p style={{color: 'var(--primary-gold)', letterSpacing: '0.1em', fontSize: '0.8rem', textTransform: 'uppercase'}}>Client Portal</p>
          </Link>
        </div>

        <motion.div 
          className="auth-quote-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <blockquote className="auth-quote">
            "Absolute confidentiality is not a feature of our practice; it is the foundation of it."
          </blockquote>
          
          <div className="trust-slider">
            <CheckCircle size={16} color="var(--primary-gold)" />
            <span>Bank-Level 256-bit Encryption • Attorney-Client Privilege</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
