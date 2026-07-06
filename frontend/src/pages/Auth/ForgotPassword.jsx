import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import AuthLayout from './AuthLayout';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) return handleError('Please enter your email address.');
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };

  const handleChangeOTP = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handlePasteOTP = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6).split('');
    if (pastedData.some(isNaN)) return;
    
    const newOtp = [...otp];
    pastedData.forEach((val, i) => { newOtp[i] = val; });
    setOtp(newOtp);
    
    const nextFocus = Math.min(pastedData.length, 5);
    otpRefs.current[nextFocus].focus();
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.join('').length < 6) return handleError('Please enter the 6-digit code.');
    if (otp.join('') !== '123456') return handleError('Invalid verification code.'); // mock failure if not 123456
    
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password.length < 12) return handleError('Password must be at least 12 characters.');
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        
        {step === 1 && (
          <motion.div key="step1" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
            <div className="auth-content-header">
              <h1>Forgot Password</h1>
              <p>Enter the email address associated with your account.</p>
            </div>
            <form onSubmit={handleSendCode} className={shake ? 'error-shake' : ''}>
              {error && <div className="inline-error"><AlertCircle size={14} /> {error}</div>}
              <div className="auth-form-group">
                <input type="email" placeholder=" " value={email} onChange={e => setEmail(e.target.value)} disabled={isSubmitting}/>
                <label>Email Address</label>
              </div>
              <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner"></span> : 'Send Verification Code'}
              </button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
            <div className="auth-content-header">
              <h1>Enter Code</h1>
              <p>We've sent a 6-digit code to {email}</p>
            </div>
            <form onSubmit={handleVerifyOTP} className={shake ? 'error-shake' : ''}>
              {error && <div className="inline-error"><AlertCircle size={14} /> {error}</div>}
              
              <div className="otp-container">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={data}
                    disabled={isSubmitting}
                    onChange={e => handleChangeOTP(e.target, index)}
                    onPaste={handlePasteOTP}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !data && index > 0) {
                        otpRefs.current[index - 1].focus();
                      }
                    }}
                    ref={el => otpRefs.current[index] = el}
                  />
                ))}
              </div>

              <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner"></span> : 'Verify Code'}
              </button>
              
              <div style={{textAlign:'center', marginTop:'1.5rem', fontSize:'0.85rem', color:'var(--muted)'}}>
                Didn't receive code? <button type="button" onClick={() => setStep(1)} style={{background:'none',border:'none',color:'var(--primary-gold)',cursor:'pointer'}}>Resend</button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
            <div className="auth-content-header">
              <h1>Create New Password</h1>
              <p>Please enter a strong password for your account.</p>
            </div>
            <form onSubmit={handleResetPassword} className={shake ? 'error-shake' : ''}>
              {error && <div className="inline-error"><AlertCircle size={14} /> {error}</div>}
              <div className="auth-form-group">
                <input type={showPassword ? 'text' : 'password'} placeholder=" " value={password} onChange={e => setPassword(e.target.value)} disabled={isSubmitting}/>
                <label>New Password (Min 12 chars)</label>
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner"></span> : 'Reset Password'}
              </button>
            </form>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} style={{textAlign:'center'}}>
            <div style={{width:'80px',height:'80px',background:'rgba(200, 164, 106, 0.1)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 2rem',color:'var(--primary-gold)'}}>
              <CheckCircle size={40} />
            </div>
            <h1 style={{fontFamily:'Cormorant Garamond',fontSize:'2rem',color:'var(--heading)',marginBottom:'1rem'}}>Password Reset</h1>
            <p style={{color:'var(--muted)',marginBottom:'2.5rem'}}>Your password has been successfully updated. You can now login with your new credentials.</p>
            <Link to="/signin" className="btn btn-primary" style={{justifyContent:'center', width:'100%'}}>Return to Client Login</Link>
          </motion.div>
        )}

      </AnimatePresence>
    </AuthLayout>
  );
}
