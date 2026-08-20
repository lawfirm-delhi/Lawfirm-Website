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
      category: "Practice & Firm", 
      q: "What areas of law does NYATI Law Chamber practise?", 
      a: "NYATI has a broad litigation and legal practice covering civil, criminal, constitutional, commercial, corporate, property, service, regulatory and administrative matters, along with arbitration, mediation and other dispute-resolution mechanisms." 
    },
    { 
      id: 2, 
      category: "Practice & Firm", 
      q: "Where is NYATI Law Chamber located?", 
      a: "NYATI Law Chamber is based in New Delhi and undertakes matters before courts, tribunals and authorities in Delhi and, through appropriate professional arrangements, other jurisdictions." 
    },
    { 
      id: 3, 
      category: "Practice & Firm", 
      q: "Does NYATI represent clients before the Supreme Court of India?", 
      a: "Yes. The Firm's founding directors have experience in matters before the Supreme Court of India, as well as the Delhi High Court, various High Courts, District Courts, Tribunals and other judicial and quasi-judicial authorities." 
    },
    { 
      id: 4, 
      category: "Consultations", 
      q: "Can I consult NYATI before filing a case?", 
      a: "Yes. In fact, early legal consultation can be extremely valuable. We can assess the legal position, available remedies, potential risks, documentation and appropriate litigation or settlement strategy before proceedings are initiated." 
    },
    { 
      id: 5, 
      category: "Consultations", 
      q: "Does NYATI handle urgent legal matters?", 
      a: "Yes. Subject to the nature of the matter, we assist with urgent legal situations including bail, arrest-related matters, urgent injunctions, eviction or demolition issues, coercive administrative action and other time-sensitive legal proceedings." 
    },
    { 
      id: 6, 
      category: "Practice & Firm", 
      q: "Does NYATI provide legal opinions?", 
      a: "Yes. The Firm provides legal opinions and advisory services on matters falling within its areas of practice, based upon the facts and documents made available for consideration." 
    },
    { 
      id: 7, 
      category: "Practice & Firm", 
      q: "Does NYATI handle matters outside Delhi?", 
      a: "Yes. Depending upon the nature of the matter and applicable professional requirements, NYATI can coordinate representation and legal assistance in other jurisdictions through its professional network and local counsel arrangements." 
    },
    { 
      id: 8, 
      category: "Practice & Firm", 
      q: "Does the Firm handle arbitration and mediation?", 
      a: "Yes. NYATI assists clients with arbitration, mediation, conciliation and related court proceedings, including interim measures, appointment of arbitrators, challenges and enforcement-related proceedings." 
    },
    { 
      id: 9, 
      category: "Engagement & Fees", 
      q: "How do I engage NYATI for a legal matter?", 
      a: "You may contact the Firm through the contact details provided on this website. After understanding the nature of the matter and reviewing the relevant information and documents, the Firm can advise you regarding the appropriate legal course of action." 
    },
    { 
      id: 10, 
      category: "Engagement & Fees", 
      q: "Will my information remain confidential?", 
      a: "Client confidentiality and professional responsibility are fundamental to the lawyer-client relationship. Information shared with the Firm is handled with appropriate professional care and in accordance with applicable law and professional obligations." 
    },
    { 
      id: 11, 
      category: "Engagement & Fees", 
      q: "How are legal fees determined?", 
      a: "Professional fees depend upon factors including the nature and complexity of the matter, the forum, the work involved, the urgency and the anticipated duration of the engagement. The applicable fee structure will be discussed with the client before engagement, subject to applicable professional rules." 
    },
    { 
      id: 12, 
      category: "Engagement & Fees", 
      q: "Does contacting NYATI automatically create a lawyer-client relationship?", 
      a: "No. An initial enquiry or communication does not, by itself, constitute formal engagement or establish an advocate-client relationship. Such a relationship arises only upon appropriate acceptance of the engagement and completion of the necessary formalities." 
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
        subtitle="Frequently Asked Questions about NYATI Law Chamber's services, consultations, fees, and client confidentiality."
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
      <section className="faq-contact-section">
        <div className="faq-contact-header">
          <h2 className="faq-contact-title">Still have questions?</h2>
          <p className="faq-contact-subtitle">Our team is ready to provide the clarity you need. Reach out to us through any of the channels below.</p>
        </div>
        <div className="faq-contact-grid">
          <motion.div className="faq-contact-card" variants={fadeInUp}>
            <div className="faq-contact-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h3 className="faq-contact-card-title">Direct Line</h3>
            <p className="faq-contact-card-text">+91 11 4567 8900</p>
            <a href="tel:+911145678900" className="btn btn-primary faq-contact-btn">Call Now</a>
          </motion.div>
          
          <motion.div className="faq-contact-card" variants={fadeInUp}>
            <div className="faq-contact-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <h3 className="faq-contact-card-title">Email Enquiries</h3>
            <p className="faq-contact-card-text">lawfirm.delhi.official@gmail.com</p>
            <a href="mailto:lawfirm.delhi.official@gmail.com" className="btn btn-ghost faq-contact-btn">Send Email</a>
          </motion.div>
          
          <motion.div className="faq-contact-card" variants={fadeInUp}>
            <div className="faq-contact-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </div>
            <h3 className="faq-contact-card-title">WhatsApp</h3>
            <p className="faq-contact-card-text">Secure Messaging</p>
            <a href={`https://wa.me/919986378144?text=${encodeURIComponent(
              "Hello, I am interested in scheduling a legal consultation with NYATI Law Chamber."
            )}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost faq-contact-btn">Message Us</a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
