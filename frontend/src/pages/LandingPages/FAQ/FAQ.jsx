import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import PageWrapper from '../Shared/PageWrapper';
import PageHero from '../Shared/PageHero';
import './FAQ.css';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  whileInView: { opacity: 1, transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-100px" }
};

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState(null);

  const faqs = [
    { 
      id: 1, 
      category: "NYATI Firm Info", 
      q: "Why did PK Sinha and Associates change its name to NYATI?", 
      a: "After 19 successful years of practice, our name transition to NYATI reflects our growth and a modernized, forward-thinking approach to modern jurisprudence. While our name has evolved to represent swift, definitive justice and integrated consultancy, our founding leadership under Advocate Pankaj Sinha, our team, and our core values remain entirely unchanged." 
    },
    { 
      id: 2, 
      category: "NYATI Firm Info", 
      q: "What types of courts do you practice in?", 
      a: "We offer comprehensive, end-to-end legal representation. Our team actively practices across all tiers of the judiciary, including the High Courts, District & Sessions Courts, and specialized tribunals like the Central Administrative Tribunal (CAT)." 
    },
    { 
      id: 3, 
      category: "Consultations", 
      q: "How do I schedule an initial consultation with Advocate Pankaj Sinha or the team?", 
      a: "You can easily request a consultation by filling out the 'Contact Us' form on our website, sending an email, or calling our office directly during operational hours. Our case management team will review your details and get back to you within 24 to 48 business hours." 
    },
    { 
      id: 4, 
      category: "Consultations", 
      q: "Does filling out the online consultation form establish an attorney-client relationship?", 
      a: "No. Filling out the form is an initial request for a consultation so our team can evaluate your case. A formal attorney-client relationship is only established once we formally agree to take your case and a legal vakalatnama or engagement agreement is signed." 
    },
    { 
      id: 5, 
      category: "Practice Areas", 
      q: "I am a government employee facing a department dispute. Can NYATI help me?", 
      a: "Yes, absolutely. Service law is one of our core pillars of expertise. We have nearly two decades of experience representing government and public sector employees before the Central Administrative Tribunal (CAT) for matters concerning promotions, pensions, charge sheets, and wrongful termination." 
    },
    { 
      id: 6, 
      category: "Confidentiality", 
      q: "Will my case details and documents remain confidential?", 
      a: "Security and client confidentiality are fundamental to our firm's philosophy. Any information, case history, or documentation shared with NYATI—whether through our website or during an in-person meeting—is protected by strict privacy policies and attorney-client privilege." 
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <PageWrapper>
      <PageHero 
        title="Frequently Asked Questions" 
        subtitle="Clear answers to common inquiries regarding our services, processes, and engagement models."
      />

      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-search-wrapper">
            <Search className="faq-search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search our FAQ..." 
              className="faq-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <motion.div className="faq-content-wrapper" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {categories.map(category => {
              const categoryFaqs = filteredFaqs.filter(f => f.category === category);
              if (categoryFaqs.length === 0) return null;

              return (
                <div key={category} className="faq-category-section">
                  <h3 className="faq-category-title">{category}</h3>
                  <div className="faq-accordion-list">
                    {categoryFaqs.map((faq) => (
                      <motion.div key={faq.id} variants={fadeInUp} className="faq-accordion-item">
                        <button 
                          className="faq-accordion-header"
                          onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                        >
                          <span className="faq-question-text">{faq.q}</span>
                          <ChevronDown className={`faq-chevron-icon ${openId === faq.id ? 'rotate' : ''}`} size={20} />
                        </button>
                        <AnimatePresence>
                          {openId === faq.id && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="faq-accordion-content"
                            >
                              <div className="faq-answer-inner">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="faq-no-results">
                <p>No results found for "{searchTerm}". Please try a different search or contact us directly.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center mb-12">
          <h2 className="section-title">Still have questions?</h2>
          <p className="section-subtitle mx-auto">Our team is ready to provide the clarity you need. Reach out to us through any of the channels below.</p>
        </div>
        <div className="container grid md-grid-3">
          <motion.div className="contact-card" variants={fadeInUp}>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h3 className="card-title">Direct Line</h3>
            <p className="card-text mb-4">+91 11 4567 8900</p>
            <a href="tel:+911145678900" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>Call Now</a>
          </motion.div>
          
          <motion.div className="contact-card" variants={fadeInUp}>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <h3 className="card-title">Email Enquiries</h3>
            <p className="card-text mb-4">lawfirm.delhi.official@gmail.com</p>
            <a href="mailto:lawfirm.delhi.official@gmail.com" className="btn btn-ghost" style={{ width: '100%', textAlign: 'center' }}>Send Email</a>
          </motion.div>
          
          <motion.div className="contact-card" variants={fadeInUp}>
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <h3 className="card-title">WhatsApp</h3>
              <p className="card-text mb-4">Secure Messaging</p>
              <a href={`https://wa.me/919986378144?text=${encodeURIComponent(
                "Hello, I am interested in scheduling a legal consultation with Justice & Associates."
              )}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ width: '100%', textAlign: 'center' }}>Message Us</a>
            </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
