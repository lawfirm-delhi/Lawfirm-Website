import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Shared/PageWrapper';
import PageHero from '../Shared/PageHero';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <motion.div 
      variants={fadeInUp}
      style={{ 
        borderBottom: '1px solid var(--border)',
        marginBottom: '1rem'
      }}
    >
      <button 
        onClick={onClick}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 0',
          background: 'transparent',
          border: 'none',
          color: 'var(--heading)',
          fontSize: '1.1rem',
          fontWeight: 500,
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown color="var(--primary-gold)" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ color: 'var(--muted)', paddingBottom: '1.5rem', lineHeight: 1.6 }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState(null);

  const faqs = [
    { id: 1, category: "Consultations", q: "How do I schedule an initial consultation?", a: "You can schedule a consultation using our online portal or by calling our firm directly. Our intake specialists will gather preliminary details to pair you with the most appropriate senior partner." },
    { id: 2, category: "Billing", q: "What is your billing structure?", a: "We operate primarily on a retainer and hourly billing model. For certain corporate transactions and M&A deals, we may agree on flat-fee or hybrid fee structures. A detailed fee agreement is provided before representation begins." },
    { id: 3, category: "Cases", q: "Do you handle international legal disputes?", a: "Yes. A significant portion of our practice is dedicated to cross-border disputes, international arbitration, and multinational corporate advisory." },
    { id: 4, category: "Documents", q: "How are confidential documents handled?", a: "We utilize military-grade encrypted servers for all document storage. Client portal access is secured with multi-factor authentication (MFA) to ensure absolute attorney-client privilege." },
    { id: 5, category: "Consultations", q: "Is the first consultation free?", a: "Because we dedicate partner-level resources to initial strategy assessments, we charge a standard consultation fee. This fee is credited toward your retainer if you choose to retain our firm." },
    { id: 6, category: "Lawyers", q: "Will my case be handed off to a junior associate?", a: "No. While associates may assist with research and drafting, a Senior Partner will remain the lead counsel and primary point of contact for the entirety of your case." }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper title="Help Center & FAQ">
      <PageHero 
        title="How Can We Help?"
        subtitle="Find answers to common questions regarding our practice, billing, and representation procedures."
      />

      <section className="landing-section">
        {/* Search */}
        <div style={{ maxWidth: '600px', margin: '0 auto 4rem', position: 'relative' }}>
          <Search size={20} color="var(--muted)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1.2rem 1rem 1.2rem 3.5rem',
              borderRadius: '30px',
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--heading)',
              fontSize: '1.1rem',
              outline: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
        </div>

        {/* FAQ Accordion */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <FAQItem 
                key={faq.id} 
                question={faq.q} 
                answer={faq.a} 
                isOpen={openId === faq.id}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              No frequently asked questions match your search.
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="landing-section alt">
        <div className="section-header">
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">Still Need Help?</motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} initial="initial" whileInView="whileInView">Our client relations team is available 24/7 for urgent inquiries.</motion.p>
        </div>

        <div className="grid-3">
          <motion.div className="premium-card text-center" style={{ alignItems: 'center' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <Phone className="card-icon mx-auto" />
            <h3 className="card-title">Call Us</h3>
            <p className="card-text mb-4">+91 11 4567 8900</p>
            <a href="tel:+911145678900" className="btn btn-ghost" style={{ width: '100%', textAlign: 'center' }}>Call Now</a>
          </motion.div>
          
          <motion.div className="premium-card text-center" style={{ alignItems: 'center' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <Mail className="card-icon mx-auto" />
            <h3 className="card-title">Email Us</h3>
            <p className="card-text mb-4">support@justice.example</p>
            <a href="mailto:support@justice.example" className="btn btn-ghost" style={{ width: '100%', textAlign: 'center' }}>Send Email</a>
          </motion.div>
          
          <motion.div className="premium-card text-center" style={{ alignItems: 'center' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <MessageCircle className="card-icon mx-auto" />
            <h3 className="card-title">WhatsApp</h3>
            <p className="card-text mb-4">Secure Messaging</p>
            <a href="#" className="btn btn-ghost" style={{ width: '100%', textAlign: 'center' }}>Message Us</a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
