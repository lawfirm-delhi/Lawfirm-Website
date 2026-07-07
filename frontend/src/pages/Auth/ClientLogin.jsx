import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Shield, Lock, Loader } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

export default function ClientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState('Authenticating...');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    setLoadingText('Authenticating...');
    
    try {
      await login(email, password);
      setLoadingText('Secure Session Created');
      // Briefly show success state then redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setIsSubmitting(false);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="auth-content-header">
        <h1>Client Login</h1>
        <p>Access your secure portal and case documents.</p>
      </motion.div>

      <motion.form 
        onSubmit={handleLogin}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay: 0.1}}
        className={shake ? 'error-shake' : ''}
      >
        {error && (
          <div className="inline-error">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        <div className="auth-form-group">
          <input 
            type="email" 
            placeholder=" " 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className={error ? 'has-error' : ''}
            disabled={isSubmitting}
          />
          <label>Email Address</label>
        </div>

        <div className="auth-form-group">
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder=" " 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className={error ? 'has-error' : ''}
            disabled={isSubmitting}
          />
          <label>Password</label>
          <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', fontSize:'0.85rem'}}>
          <label style={{display:'flex', alignItems:'center', gap:'0.5rem', color:'var(--muted)', cursor:'pointer'}}>
            <input type="checkbox" style={{accentColor: 'var(--primary-gold)'}} disabled={isSubmitting} />
            Remember Me
          </label>
          <Link to="/forgot-password" style={{color: 'var(--primary-gold)'}}>Forgot Password?</Link>
        </div>

        <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} disabled={isSubmitting}>
          {isSubmitting ? (
            <span style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
              <Loader size={16} className="spin-animation" /> {loadingText}
            </span>
          ) : 'Client Login'}
        </button>

        <div className="security-badges">
          <div className="security-badge"><Shield size={16} /> Secure Session</div>
          <div className="security-badge"><Lock size={16} /> Privacy Protected</div>
        </div>

        <div style={{marginTop: '3rem', textAlign:'center', color:'var(--muted)', fontSize:'0.9rem'}}>
          Don't have an account? <Link to="/signup" style={{color:'var(--primary-gold)'}}>Create Client Account</Link>
        </div>
      </motion.form>
    </AuthLayout>
  );
}
