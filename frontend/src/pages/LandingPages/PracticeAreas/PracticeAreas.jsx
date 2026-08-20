import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Scale, Briefcase, Calculator, Landmark, Shield, BookOpen, Search, X, Gavel, Handshake, Heart } from 'lucide-react';
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
      id: 'civil', 
      icon: Scale, 
      title: "Civil Litigation", 
      desc: "Property disputes, recovery claims, eviction matters, and contractual disagreements.",
      details: "We represent clients across all levels of civil courts in disputes involving property title, declaration, recovery, contract enforcement, and estate partition.",
      services: [
        "Property and ownership disputes",
        "Possession and eviction matters",
        "Recovery and money claims",
        "Injunctions and specific performance",
        "Contractual disputes",
        "Partition and succession disputes",
        "Declaration and cancellation proceedings",
        "Civil appeals and revisions",
        "Execution proceedings"
      ]
    },
    { 
      id: 'criminal', 
      icon: Gavel, 
      title: "Criminal Law", 
      desc: "Criminal trials, bail hearings, white-collar offences, and appellate representation.",
      details: "Our criminal defense team handles everything from bail applications to trial proceedings, quashing petitions, and appeals in state and economic offences.",
      services: [
        "Criminal trials and proceedings",
        "Bail and anticipatory bail",
        "Quashing of criminal proceedings",
        "Criminal appeals and revisions",
        "Complaints and criminal investigations",
        "White-collar and economic offences",
        "Cheating, fraud and breach of trust matters",
        "Cyber-related criminal matters",
        "Criminal writ proceedings"
      ]
    },
    { 
      id: 'constitutional', 
      icon: Landmark, 
      title: "Constitutional & Public Law", 
      desc: "Writ petitions, fundamental rights protection, judicial reviews, and public interest litigation.",
      details: "We challenge arbitrary administrative actions and represent clients before the High Courts and Supreme Court in constitutional disputes, writ matters, and civil rights actions.",
      services: [
        "Writ petitions",
        "Fundamental rights matters",
        "Constitutional challenges",
        "Judicial review",
        "Administrative actions",
        "Government and regulatory decisions",
        "Public interest matters",
        "Service and employment-related constitutional issues"
      ]
    },
    { 
      id: 'commercial', 
      icon: Building2, 
      title: "Commercial & Corporate Litigation", 
      desc: "Contractual disputes, corporate governance, insolvency matters, and commercial recoveries.",
      details: "Providing robust advocacy in commercial courts and tribunals on matters concerning business agreements, partnerships, shareholder rights, and corporate insolvency.",
      services: [
        "Commercial disputes",
        "Contractual and business disputes",
        "Commercial recovery proceedings",
        "Shareholder and partnership disputes",
        "Corporate governance issues",
        "Insolvency-related litigation",
        "Arbitration-related court proceedings",
        "Commercial appeals and enforcement proceedings"
      ]
    },
    { 
      id: 'property', 
      icon: Briefcase, 
      title: "Property & Real Estate", 
      desc: "Landlord-tenant litigation, property due diligence, construction disputes, and title verification.",
      details: "Advising developers, landowners, and tenants on municipal regulations, development agreements, property acquisition checks, and real estate litigation.",
      services: [
        "Title and ownership disputes",
        "Land and property litigation",
        "Landlord-tenant disputes",
        "Eviction proceedings",
        "Development and construction disputes",
        "Property documentation and due diligence",
        "Possession and injunction matters",
        "Regulatory and municipal property disputes"
      ]
    },
    { 
      id: 'adr', 
      icon: Handshake, 
      title: "Arbitration, Mediation & ADR", 
      desc: "Appointment of arbitrators, interim measures, enforcement, and negotiated settlements.",
      details: "Managing domestic and international arbitration proceedings, arbitrator appointments, and representing clients in mediation and pre-litigation settlements.",
      services: [
        "Arbitration proceedings",
        "Appointment of arbitrators",
        "Interim measures",
        "Enforcement of arbitral awards",
        "Challenges to arbitral awards",
        "Mediation and negotiated settlements",
        "Conciliation proceedings",
        "Pre-litigation dispute resolution"
      ]
    },
    { 
      id: 'service', 
      icon: BookOpen, 
      title: "Service & Employment Law", 
      desc: "Disciplinary proceedings, seniority disputes, termination, and service writs.",
      details: "Specialized representation for public sector and government employees in service disputes, retirement benefits, disciplinary actions, and Central Administrative Tribunal (CAT) applications.",
      services: [
        "Service disputes",
        "Disciplinary proceedings",
        "Promotion and seniority disputes",
        "Termination and employment disputes",
        "Government and public-sector employment matters",
        "Pension and retirement-related disputes",
        "Service appeals and writ proceedings"
      ]
    },
    { 
      id: 'regulatory', 
      icon: Shield, 
      title: "Regulatory & Administrative Law", 
      desc: "Statutory compliance, administrative hearings, licensing, and representation before regulators.",
      details: "Representing organizations and individuals in licensing disputes, compliance audits, and statutory appeals before regulatory commissions and boards.",
      services: [
        "Regulatory compliance",
        "Government notifications and orders",
        "Licensing and regulatory disputes",
        "Administrative actions",
        "Statutory appeals and remedies",
        "Representation before regulatory authorities"
      ]
    },
    { 
      id: 'matrimonial', 
      icon: Heart, 
      title: "Matrimonial, Consumer & Civil Rights", 
      desc: "Family law, matrimonial disputes, consumer protection, and deficiency of service claims.",
      details: "Providing advocacy in family court matters, consumer protection commissions, and seeking legal remedies for deficiency in services or civil rights violations.",
      services: [
        "Matrimonial Disputes",
        "Consumer disputes",
        "Deficiency in services",
        "Unfair trade practices",
        "Compensation claims",
        "Civil rights and legal remedies",
        "Appeals before consumer forums and higher courts"
      ]
    }
  ];

  const filteredAreas = practiceAreas.filter(area => 
    area.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    area.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper title="Practice Areas">
      <PageHero 
        title="Practice Areas"
        subtitle="Comprehensive Legal Expertise. Focused Advocacy. NYATI Law Chamber provides legal advice, representation and litigation services across a broad spectrum of practice areas."
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
