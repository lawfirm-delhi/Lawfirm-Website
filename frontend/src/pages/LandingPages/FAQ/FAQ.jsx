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
    { id: 1, category: "Consultations", q: "How do I schedule an initial consultation?", a: "You can schedule a consultation using our online portal or by calling our firm directly. Our intake specialists will gather preliminary details to pair you with the most appropriate senior partner." },
    { id: 2, category: "Consultations", q: "Is there a fee for the first meeting?", a: "Initial consultations carry a standard advisory fee, which is fully adjusted against your final billing should you choose to retain our services within 30 days." },
    { id: 3, category: "Services", q: "Do you handle international corporate disputes?", a: "Yes, our Corporate & Commercial bench frequently represents multinational clients in cross-border disputes, international arbitration, and global compliance matters." },
    { id: 4, category: "Services", q: "Can you assist with IP registration outside India?", a: "Through our network of international partner firms, we facilitate end-to-end IP protection across major global jurisdictions including the US, EU, and APAC regions." },
    { id: 5, category: "Process", q: "How will I be kept updated about my case?", a: "You will be assigned a dedicated relationship manager and given access to our secure client portal, where you can track case progress, view filed documents, and schedule calls." },
    { id: 6, category: "Billing", q: "What is your billing structure?", a: "We offer flexible billing models including hourly rates, fixed-fee retainers, and milestone-based billing, tailored to the specific needs and scale of your mandate." }
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

      <section className="section bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input 
                type="text" 
                placeholder="Search our FAQ..." 
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-neutral-200 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <motion.div className="max-w-3xl mx-auto" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {categories.map(category => {
              const categoryFaqs = filteredFaqs.filter(f => f.category === category);
              if (categoryFaqs.length === 0) return null;

              return (
                <div key={category} className="mb-10">
                  <h3 className="text-xl font-serif text-primary-900 mb-6">{category}</h3>
                  <div className="space-y-4">
                    {categoryFaqs.map((faq) => (
                      <motion.div key={faq.id} variants={fadeInUp} className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
                        <button 
                          className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                          onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                        >
                          <span className="font-medium text-neutral-900 pr-8">{faq.q}</span>
                          <ChevronDown className={`text-primary-600 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        <AnimatePresence>
                          {openId === faq.id && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-4 pt-2 text-neutral-600 leading-relaxed border-t border-neutral-50">
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
              <div className="text-center py-12">
                <p className="text-neutral-500 text-lg">No results found for "{searchTerm}". Please try a different search or contact us directly.</p>
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
