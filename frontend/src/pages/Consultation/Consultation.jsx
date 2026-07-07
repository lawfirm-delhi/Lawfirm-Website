import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UploadCloud, CheckCircle, Shield, Briefcase, Star, MapPin, ChevronRight, X, Clock, Video, Phone } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api/axios';
import './Consultation.css';

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- SUB-COMPONENTS ---
const HeroSection = () => (
  <section className="consultation-hero">
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="hero-content">
      <motion.h1 variants={fadeUp}>Book a Confidential Legal Consultation</motion.h1>
      <motion.p variants={fadeUp}>
        Speak directly with experienced legal professionals who understand your matter. Whether you need advice on corporate law, litigation, arbitration, or intellectual property, our team will provide strategic guidance tailored to your unique situation.
      </motion.p>
      
      <motion.div variants={fadeUp} className="hero-cta-row" style={{justifyContent: 'flex-start'}}>
        <a href="#wizard" className="btn btn-primary">Schedule Consultation</a>
        <a href="tel:+911145678900" className="btn btn-ghost">Call Our Office</a>
      </motion.div>

      <motion.div variants={staggerContainer} className="badges-grid">
        {[
          { icon: <Shield size={18}/>, text: "Attorney–Client Privilege" },
          { icon: <Briefcase size={18}/>, text: "15+ Years Experience" },
          { icon: <Star size={18}/>, text: "98% Client Satisfaction" },
          { icon: <MapPin size={18}/>, text: "Nationwide Representation" }
        ].map((badge, i) => (
          <motion.div key={i} variants={fadeUp} className="trust-badge">
            {badge.icon} {badge.text}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="hero-right"
    >
      <div className="hero-art-frame">
        <svg className="hero-visual" viewBox="0 0 420 460">
          <defs>
            <radialGradient id="auraGrad" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#B8935A" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#0A1628" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4B888"/>
              <stop offset="100%" stopColor="#8A6A3E"/>
            </linearGradient>
            <clipPath id="frameClip"><rect x="0" y="0" width="420" height="460" rx="4"/></clipPath>
          </defs>
          <rect width="420" height="460" fill="#0A1628"/>
          <circle cx="210" cy="150" r="180" fill="url(#auraGrad)"/>
          
          <g clipPath="url(#frameClip)">
             <path d="M70 190 L210 120 L350 190 Z" fill="#15304F" stroke="#B8935A" strokeWidth="1"/>
             <rect x="60" y="188" width="300" height="14" fill="#1B3A5C" stroke="#B8935A" strokeWidth="0.75"/>
             <g>
               <rect x="88" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
               <rect x="146" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
               <rect x="204" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
               <rect x="262" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
               <rect x="320" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
             </g>
             <rect x="60" y="355" width="300" height="10" fill="#1B3A5C"/>
             <rect x="45" y="365" width="330" height="10" fill="#15304F"/>
             <rect x="30" y="375" width="360" height="10" fill="#0F2440"/>
          </g>
          <rect x="1" y="1" width="418" height="458" fill="none" stroke="#B8935A" strokeOpacity="0.25"/>
        </svg>
      </div>
    </motion.div>
  </section>
);

const Timeline = ({ currentStep }) => {
  const steps = ["Submit Request", "Lawyer Reviews", "Schedule", "Legal Advice"];
  return (
    <section className="process-timeline">
      <div className="timeline-track">
        <div className="timeline-line-bg"></div>
        <div className="timeline-line-active" style={{ width: `${(Math.max(currentStep, 1) - 1) * 33.33}%` }}></div>
        {steps.map((step, i) => (
          <div key={i} className={`timeline-step ${i + 1 === currentStep ? 'active' : ''} ${i + 1 < currentStep ? 'completed' : ''}`}>
            <div className="step-icon">{i + 1 < currentStep ? <CheckCircle size={18}/> : i + 1}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- MAIN WIZARD COMPONENT ---
export default function Consultation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', email: '', mobile: '', company: '',
    practiceArea: '', subject: '', description: '',
    date: '', time: '', mode: '',
    files: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  const updateForm = (key, val) => setFormData(p => ({ ...p, [key]: val }));

  const handleNext = () => setStep(s => Math.min(s + 1, 6));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      const data = new FormData();
      
      const keyMap = {
        fullName: 'name',
        mobile: 'phone',
        mode: 'consultationMode',
        date: 'preferredDate',
        time: 'preferredTime'
      };

      Object.keys(formData).forEach(key => {
        if (key === 'files') {
          formData.files.forEach(file => data.append('documents', file));
        } else {
          const backendKey = keyMap[key] || key;
          data.append(backendKey, formData[key]);
        }
      });
      
      const response = await api.post('/consultations', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setRefNumber(response.data.data.reference_number);
      setStep(6);
    } catch (err) {
      console.error(err);
      alert('Failed to submit consultation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    // filter > 25mb
    const valid = uploaded.filter(f => f.size <= 25 * 1024 * 1024);
    setFormData(p => ({ ...p, files: [...p.files, ...valid] }));
  };
  const removeFile = (index) => {
    const f = [...formData.files];
    f.splice(index, 1);
    updateForm('files', f);
  }

  return (
    <div className="consultation-page">
      <HeroSection />
      
      {step < 6 && <Timeline currentStep={step} />}

      <section className="container" id="wizard">
        <motion.div 
          className="wizard-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
        >
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                <div className="wizard-header">
                  <h2>Personal Information</h2>
                  <p>Let's start with your basic details.</p>
                </div>
                <div className="form-row-split">
                  <div className="floating-input">
                    <input type="text" placeholder=" " value={formData.fullName} onChange={e=>updateForm('fullName', e.target.value)}/>
                    <label>Full Name *</label>
                  </div>
                  <div className="floating-input">
                    <input type="email" placeholder=" " value={formData.email} onChange={e=>updateForm('email', e.target.value)}/>
                    <label>Email Address *</label>
                  </div>
                </div>
                <div className="form-row-split">
                  <div className="floating-input">
                    <input type="tel" placeholder=" " value={formData.mobile} onChange={e=>updateForm('mobile', e.target.value)}/>
                    <label>Mobile Number *</label>
                  </div>
                  <div className="floating-input">
                    <input type="text" placeholder=" " value={formData.company} onChange={e=>updateForm('company', e.target.value)}/>
                    <label>Company / Organization (Optional)</label>
                  </div>
                </div>
                <div className="wizard-actions" style={{justifyContent: 'flex-end'}}>
                  <button className="btn btn-primary" onClick={handleNext} disabled={!formData.fullName || !formData.email || !formData.mobile}>Next Step <ChevronRight size={16}/></button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                <div className="wizard-header">
                  <h2>Legal Matter</h2>
                  <p>Select the area of law and describe your situation.</p>
                </div>
                <div className="floating-input">
                  <select value={formData.practiceArea} onChange={e=>updateForm('practiceArea', e.target.value)}>
                    <option value="" disabled>Select Practice Area</option>
                    <option>Corporate Law</option>
                    <option>Litigation</option>
                    <option>Arbitration</option>
                    <option>Intellectual Property</option>
                    <option>Taxation</option>
                    <option>Employment Law</option>
                    <option>Real Estate</option>
                  </select>
                  <label>Practice Area *</label>
                </div>
                <div className="floating-input">
                  <input type="text" placeholder=" " value={formData.subject} onChange={e=>updateForm('subject', e.target.value)}/>
                  <label>Subject *</label>
                </div>
                <div className="floating-input" style={{marginBottom: 0}}>
                  <textarea rows="4" placeholder=" " value={formData.description} onChange={e=>updateForm('description', e.target.value)}></textarea>
                  <label>Detailed Description *</label>
                </div>
                <div style={{textAlign: 'right', fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem'}}>
                  {formData.description.length} / 1000 characters
                </div>
                <div className="wizard-actions">
                  <button className="btn btn-ghost" onClick={handleBack}>Back</button>
                  <button className="btn btn-primary" onClick={handleNext} disabled={!formData.practiceArea || !formData.subject || !formData.description}>Next Step <ChevronRight size={16}/></button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                <div className="wizard-header">
                  <h2>Schedule Consultation</h2>
                  <p>Select your preferred time and mode of consultation.</p>
                </div>
                <div className="options-grid">
                  <div className={`option-card ${formData.mode === 'Office' ? 'selected' : ''}`} onClick={()=>updateForm('mode','Office')}>
                    <Briefcase className="option-icon" size={24}/>
                    <div className="option-label">Office Visit</div>
                  </div>
                  <div className={`option-card ${formData.mode === 'Video' ? 'selected' : ''}`} onClick={()=>updateForm('mode','Video')}>
                    <Video className="option-icon" size={24}/>
                    <div className="option-label">Video Call</div>
                  </div>
                  <div className={`option-card ${formData.mode === 'Phone' ? 'selected' : ''}`} onClick={()=>updateForm('mode','Phone')}>
                    <Phone className="option-icon" size={24}/>
                    <div className="option-label">Phone Call</div>
                  </div>
                </div>
                <div className="form-row-split">
                  <div className="floating-input date-picker-wrapper">
                    <DatePicker 
                      selected={formData.date ? new Date(formData.date) : null}
                      onChange={(date) => {
                         // Fix timezone offset issue to keep the local date correct
                         const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                         updateForm('date', localDate);
                      }}
                      dateFormat="MMMM d, yyyy"
                      minDate={new Date()}
                      placeholderText=" "
                    />
                    <label>Preferred Date</label>
                  </div>
                  <div className="floating-input">
                    <input type="time" value={formData.time} onChange={e=>updateForm('time', e.target.value)}/>
                    <label>Preferred Time</label>
                  </div>
                </div>
                <div className="wizard-actions">
                  <button className="btn btn-ghost" onClick={handleBack}>Back</button>
                  <button className="btn btn-primary" onClick={handleNext} disabled={!formData.mode || !formData.date || !formData.time}>Next Step <ChevronRight size={16}/></button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                <div className="wizard-header">
                  <h2>Supporting Documents</h2>
                  <p>Upload any contracts, notices, or relevant files (Max 25MB).</p>
                </div>
                <label className="upload-zone" htmlFor="docUpload">
                  <input type="file" id="docUpload" multiple style={{display:'none'}} onChange={handleFileUpload} accept=".pdf,.doc,.docx,.png,.jpg,.zip"/>
                  <UploadCloud className="upload-icon" />
                  <div className="upload-text">Click to upload or drag and drop</div>
                  <div className="upload-hint">PDF, DOCX, PNG, JPG or ZIP (Max. 25MB)</div>
                </label>
                {formData.files.length > 0 && (
                  <div className="file-list">
                    {formData.files.map((file, idx) => (
                      <div className="file-item" key={idx}>
                        <div className="file-info">
                          <CheckCircle size={16} color="var(--primary-gold)" />
                          <span>{file.name} ({(file.size/1024/1024).toFixed(2)} MB)</span>
                        </div>
                        <button className="file-remove" onClick={()=>removeFile(idx)}><X size={16}/></button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="wizard-actions">
                  <button className="btn btn-ghost" onClick={handleBack}>Back</button>
                  <button className="btn btn-primary" onClick={handleNext}>Review Details <ChevronRight size={16}/></button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                <div className="wizard-header">
                  <h2>Review &amp; Confirm</h2>
                  <p>Please review your information before submitting.</p>
                </div>
                
                <div className="review-section">
                  <div className="review-head">
                    <h4>Personal Details</h4>
                    <button className="review-edit" onClick={()=>setStep(1)}>Edit</button>
                  </div>
                  <div className="review-data">
                    <div className="review-item"><p>Name</p><span>{formData.fullName}</span></div>
                    <div className="review-item"><p>Email</p><span>{formData.email}</span></div>
                    <div className="review-item"><p>Mobile</p><span>{formData.mobile}</span></div>
                    <div className="review-item"><p>Company</p><span>{formData.company || 'N/A'}</span></div>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-head">
                    <h4>Legal Matter</h4>
                    <button className="review-edit" onClick={()=>setStep(2)}>Edit</button>
                  </div>
                  <div className="review-data">
                    <div className="review-item"><p>Practice Area</p><span>{formData.practiceArea}</span></div>
                    <div className="review-item"><p>Subject</p><span>{formData.subject}</span></div>
                    <div className="review-item" style={{gridColumn:'1 / -1'}}><p>Description</p><span>{formData.description}</span></div>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-head">
                    <h4>Schedule &amp; Docs</h4>
                    <button className="review-edit" onClick={()=>setStep(3)}>Edit</button>
                  </div>
                  <div className="review-data">
                    <div className="review-item"><p>Mode</p><span>{formData.mode}</span></div>
                    <div className="review-item"><p>Date & Time</p><span>{formData.date} at {formData.time}</span></div>
                    <div className="review-item"><p>Documents</p><span>{formData.files.length} file(s) attached</span></div>
                  </div>
                </div>

                <div className="wizard-actions">
                  <button className="btn btn-ghost" onClick={handleBack} disabled={isSubmitting}>Back</button>
                  <button className="btn btn-primary" onClick={submitForm} disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Submit Request'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="step6" initial={{opacity:0, scale: 0.9}} animate={{opacity:1, scale:1}} className="success-screen">
                <div className="success-icon-wrap">
                  <CheckCircle size={40} />
                </div>
                <h2>Request Submitted Successfully</h2>
                <p style={{color:'var(--muted)', marginTop:'1rem'}}>We have received your consultation request and will assign a legal coordinator shortly.</p>
                
                <div className="ref-box">
                  <p>Your Consultation Reference Number</p>
                  <span>{refNumber}</span>
                </div>

                <p style={{color:'var(--muted)', marginBottom: '2rem'}}>A confirmation email has been sent to {formData.email}. Estimated response time: Within 24 hours.</p>

                <div style={{display:'flex', gap:'1rem', justifyContent:'center'}}>
                  <Link to="/" className="btn btn-primary">Return to Home</Link>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section className="section" style={{paddingTop: 0, paddingBottom: '6rem'}}>
        <div className="container">
          <div className="section-head" style={{textAlign: 'center', marginBottom: '4rem'}}>
            <p className="eyebrow" style={{justifyContent: 'center'}}>Contact Information</p>
            <h2>Visit our New Delhi Office.</h2>
          </div>
          
          <div className="contact-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
            <div className="contact-details">
              <div style={{marginBottom: '2rem'}}>
                <h4 style={{color: 'var(--primary-gold)', marginBottom: '0.5rem', fontSize: '1.2rem'}}>Justice &amp; Associates</h4>
                <p style={{color: 'var(--body)', lineHeight: '1.6'}}>4th Floor, Meridian House<br/>Barakhamba Road, New Delhi 110001</p>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem'}}>
                <div style={{display: 'flex', gap: '1rem', color: 'var(--body)'}}>
                  <Phone size={20} color="var(--primary-gold)" /> <span>+91 11 4567 8900</span>
                </div>
                <div style={{display: 'flex', gap: '1rem', color: 'var(--body)'}}>
                  <Shield size={20} color="var(--primary-gold)" /> <span>24/7 Emergency: +91 98765 43210</span>
                </div>
                <div style={{display: 'flex', gap: '1rem', color: 'var(--body)'}}>
                  <MapPin size={20} color="var(--primary-gold)" /> <span>Nearest Metro: Barakhamba Road (Blue Line)</span>
                </div>
                <div style={{display: 'flex', gap: '1rem', color: 'var(--body)'}}>
                  <Briefcase size={20} color="var(--primary-gold)" /> <span>Parking: Valet available at entrance</span>
                </div>
              </div>
              <div className="hero-cta-row" style={{justifyContent: 'flex-start'}}>
                 <a href="tel:+911145678900" className="btn btn-primary">Call Now</a>
                 <a href="mailto:enquiries@justiceassociates.example" className="btn btn-ghost">Email Us</a>
              </div>
            </div>

            <div className="contact-map" style={{height: '400px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden'}}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.204561073111!2d77.2140417!3d28.6282245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd36a992a061%3A0xc34cc5531d041300!2sBarakhamba%20Rd%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border: 0, filter: 'grayscale(1) invert(0.9) hue-rotate(180deg) contrast(1.2)'}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
