import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UploadCloud, CheckCircle, Briefcase, ChevronRight, X, Video, Phone } from 'lucide-react';
import api from '../api/axios';
import './ConsultationWizard.css';

export default function ConsultationWizard() {
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
      
      setRefNumber(response.data.data.referenceNumber);
      setStep(6);
    } catch (err) {
      console.error(err);
      let errorMsg = 'Failed to submit consultation request. Please try again.';
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
        if (err.response.data.errors && err.response.data.errors.length > 0) {
          errorMsg = err.response.data.errors.map(e => e.message).join(', ');
        }
      }
      alert(errorMsg);
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
    <motion.div 
      className="wizard-container" 
      style={{ margin: '0 auto', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-gold)' }}
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
              <button className="btn btn-primary" onClick={handleNext} disabled={!formData.practiceArea || !formData.subject || formData.description.length < 10}>Next Step <ChevronRight size={16}/></button>
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
              <div className="floating-input">
                <input type="date" value={formData.date} onChange={e=>updateForm('date', e.target.value)}/>
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

            <p style={{color:'var(--muted)', marginBottom: '2rem'}}>Our legal team will review your details and contact you shortly.</p>

            <div style={{display:'flex', gap:'1rem', justifyContent:'center'}}>
              <button onClick={() => {
                setStep(1);
                setFormData({
                  fullName: '', email: '', mobile: '', company: '',
                  practiceArea: '', subject: '', description: '',
                  date: '', time: '', mode: '',
                  files: []
                });
                setRefNumber('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} className="btn btn-primary">Return to Home</button>
            </div>
          </motion.div>
        )}
        
      </AnimatePresence>
    </motion.div>
  );
}
