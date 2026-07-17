import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Shield, CheckCircle, Lock, Check, Loader } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

export default function ClientRegister() {
  const [formData, setFormData] = useState({
    fullName: '', company: '', email: '', mobile: '', password: '', confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const navigate = useNavigate();

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  // Password Validation
  const reqs = {
    length: formData.password.length >= 12,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password)
  };
  const strengthScore = Object.values(reqs).filter(Boolean).length;
  const strengthText = strengthScore < 2 ? 'Weak' : strengthScore < 4 ? 'Fair' : strengthScore < 5 ? 'Good' : 'Strong';
  const strengthColors = ['#ef4444', '#f59e0b', '#10b981', '#10b981'];

  const { register, user } = useAuth();
  const [loadingText, setLoadingText] = useState('Creating Account...');

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
      setError('Please complete all required fields.');
      setShake(true); setTimeout(() => setShake(false), 400); return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setShake(true); setTimeout(() => setShake(false), 400); return;
    }
    if (strengthScore < 5) {
      setError('Please satisfy all password requirements.');
      setShake(true); setTimeout(() => setShake(false), 400); return;
    }
    if (!acceptTerms) {
      setError('You must accept the Terms and Privacy Policy.');
      setShake(true); setTimeout(() => setShake(false), 400); return;
    }
    
    setError('');
    setIsSubmitting(true);
    setLoadingText('Creating Account...');
    
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        company: formData.company,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      setLoadingText('Secure Session Created');
      setTimeout(() => {
        navigate('/');
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
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="auth-content-header" style={{marginTop: '2rem'}}>
        <h1>Create Client Account</h1>
        <p>Register for secure access to the Justice &amp; Associates portal.</p>
      </motion.div>

      <motion.form 
        onSubmit={handleRegister}
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

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
          <div className="auth-form-group">
            <input type="text" placeholder=" " value={formData.fullName} onChange={e => updateForm('fullName', e.target.value)} disabled={isSubmitting}/>
            <label>Full Name *</label>
          </div>
          <div className="auth-form-group">
            <input type="text" placeholder=" " value={formData.company} onChange={e => updateForm('company', e.target.value)} disabled={isSubmitting}/>
            <label>Company</label>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
          <div className="auth-form-group">
            <input type="email" placeholder=" " value={formData.email} onChange={e => updateForm('email', e.target.value)} disabled={isSubmitting}/>
            <label>Email Address *</label>
          </div>
          <div className="auth-form-group">
            <input type="tel" placeholder=" " value={formData.mobile} onChange={e => updateForm('mobile', e.target.value)} disabled={isSubmitting}/>
            <label>Mobile Number *</label>
          </div>
        </div>

        <div className="auth-form-group">
          <input type={showPassword ? 'text' : 'password'} placeholder=" " value={formData.password} onChange={e => updateForm('password', e.target.value)} disabled={isSubmitting}/>
          <label>Password *</label>
          <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {formData.password.length > 0 && (
          <div className="password-strength-container">
            <div className="strength-bars">
              {[1, 2, 3, 4].map(level => (
                <div key={level} className="strength-bar" style={{
                  background: strengthScore >= level || (level === 1 && formData.password) 
                    ? strengthColors[Math.max(0, strengthScore - 1)] 
                    : 'var(--border)'
                }} />
              ))}
            </div>
            <span className="strength-text">{strengthText}</span>
            <div className="password-checklist">
              <div className={`checklist-item ${reqs.length ? 'valid' : ''}`}><Check size={14} /> Min 12 chars</div>
              <div className={`checklist-item ${reqs.upper ? 'valid' : ''}`}><Check size={14} /> Uppercase</div>
              <div className={`checklist-item ${reqs.lower ? 'valid' : ''}`}><Check size={14} /> Lowercase</div>
              <div className={`checklist-item ${reqs.number ? 'valid' : ''}`}><Check size={14} /> Number</div>
              <div className={`checklist-item ${reqs.special ? 'valid' : ''}`}><Check size={14} /> Special Char</div>
            </div>
          </div>
        )}

        <div className="auth-form-group">
          <input type={showPassword ? 'text' : 'password'} placeholder=" " value={formData.confirmPassword} onChange={e => updateForm('confirmPassword', e.target.value)} disabled={isSubmitting}/>
          <label>Confirm Password *</label>
        </div>

        <div style={{marginBottom:'2rem', fontSize:'0.85rem'}}>
          <label style={{display:'flex', alignItems:'flex-start', gap:'0.75rem', color:'var(--muted)', cursor:'pointer', lineHeight: 1.4}}>
            <input type="checkbox" style={{accentColor: 'var(--primary-gold)', marginTop: '0.2rem'}} checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} disabled={isSubmitting} />
            <span>I accept the <a href="#" style={{color:'var(--primary-gold)'}}>Terms of Service</a> and <a href="#" style={{color:'var(--primary-gold)'}}>Privacy Policy</a>, and understand that registration does not constitute an attorney-client relationship.</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} disabled={isSubmitting}>
          {isSubmitting ? (
            <span style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
              <Loader size={16} className="spin-animation" /> {loadingText}
            </span>
          ) : 'Create Client Account'}
        </button>

        <div style={{marginTop: '2rem', textAlign:'center', color:'var(--muted)', fontSize:'0.9rem', marginBottom: '2rem'}}>
          Already have an account? <Link to="/signin" style={{color:'var(--primary-gold)'}}>Client Login</Link>
        </div>
      </motion.form>
    </AuthLayout>
  );
}
