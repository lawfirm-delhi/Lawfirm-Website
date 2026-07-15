import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Scale, Briefcase, Calculator, Landmark, Shield, BookOpen, Search, X } from 'lucide-react';
import PageWrapper from '../Shared/PageWrapper';
import PageHero from '../Shared/PageHero';

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function PracticeAreas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);

  const practiceAreas = [
    { 
      id: 'corporate', icon: Building2, title: "Corporate Law", 
      desc: "Mergers, acquisitions, corporate governance, and complex commercial transactions for Fortune 500 companies.",
      details: "Our corporate practice is unparalleled. We advise on restructuring, compliance, and international trade.",
      services: ["M&A", "Joint Ventures", "Corporate Restructuring", "Private Equity"]
    },
    { 
      id: 'litigation', icon: Scale, title: "Litigation & Disputes", 
      desc: "High-stakes commercial litigation, class actions, and appellate advocacy in federal and state courts.",
      details: "We have a track record of winning landmark cases that set legal precedents.",
      services: ["Commercial Litigation", "Appellate Practice", "Class Actions", "White Collar Defense"]
    },
    { 
      id: 'arbitration', icon: Briefcase, title: "Arbitration", 
      desc: "International and domestic arbitration representing sovereign states and multinational corporations.",
      details: "Specializing in ICC, LCIA, and SIAC arbitration rules.",
      services: ["Investor-State Arbitration", "Commercial Arbitration", "Enforcement of Awards"]
    },
    { 
      id: 'taxation', icon: Calculator, title: "Taxation", 
      desc: "Strategic tax planning, transfer pricing, and representation in complex tax controversies.",
      details: "We help multinational corporations optimize their global tax footprint.",
      services: ["Corporate Tax", "International Tax", "Tax Controversy", "Wealth Planning"]
    },
    { 
      id: 'real-estate', icon: Landmark, title: "Real Estate", 
      desc: "Acquisitions, financing, development, and leasing of commercial real estate globally.",
      details: "Advising REITs, developers, and institutional investors.",
      services: ["Commercial Leasing", "Real Estate Finance", "Zoning & Land Use"]
    },
    { 
      id: 'ip', icon: Shield, title: "Intellectual Property", 
      desc: "Patent litigation, trademark enforcement, and IP portfolio management for tech innovators.",
      details: "Protecting the core assets of leading technology and pharmaceutical companies.",
      services: ["Patent Prosecution", "IP Litigation", "Trademark Registration", "Copyrights"]
    }
  ];

  const filteredAreas = practiceAreas.filter(area => 
    area.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    area.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper title="Practice Areas">
      <PageHero 
        title="Our Expertise."
        subtitle="Comprehensive legal solutions spanning across corporate, commercial, and contentious matters. We deliver strategic counsel where it matters most."
      />

      <section className="landing-section">
        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 4rem', position: 'relative' }}>
          <Search size={20} color="var(--muted)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search practice areas (e.g. Litigation, Corporate)..."
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

        {/* Grid */}
        <motion.div className="grid-3" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
          {filteredAreas.map((area) => (
            <motion.div 
              key={area.id} 
              className="premium-card" 
              variants={fadeInUp}
              onClick={() => setSelectedArea(area)}
              style={{ cursor: 'pointer' }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)', borderColor: 'var(--primary-gold)' }}
            >
              <area.icon className="card-icon" />
              <h3 className="card-title">{area.title}</h3>
              <p className="card-text">{area.desc}</p>
              <div style={{ marginTop: '1.5rem', color: 'var(--primary-gold)', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                Explore Practice <span style={{ marginLeft: '0.5rem' }}>→</span>
              </div>
            </motion.div>
          ))}
          {filteredAreas.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              No practice areas match your search.
            </div>
          )}
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedArea && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(11, 22, 40, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedArea(null)}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '3rem',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <button 
                onClick={() => setSelectedArea(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '0.5rem' }}
              >
                <X size={24} />
              </button>
              
              <selectedArea.icon size={48} color="var(--primary-gold)" style={{ marginBottom: '1.5rem' }} />
              <h2 className="section-title text-left" style={{ textAlign: 'left', marginBottom: '1rem' }}>{selectedArea.title}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--body)', marginBottom: '2rem', lineHeight: 1.6 }}>
                {selectedArea.details}
              </p>
              
              <h4 style={{ color: 'var(--heading)', marginBottom: '1rem', fontSize: '1.2rem' }}>Key Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                {selectedArea.services.map((svc, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', color: 'var(--muted)' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--primary-gold)', borderRadius: '50%', marginRight: '10px' }}></div>
                    {svc}
                  </li>
                ))}
              </ul>
              
              <Link to="/consultation" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }} onClick={() => setSelectedArea(null)}>
                Consult an Expert
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
