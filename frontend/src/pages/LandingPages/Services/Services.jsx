import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, Scale, ShieldCheck, Search, Users, ClipboardList, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export default function Services() {
  const services = [
    {
      icon: Users,
      title: "Legal Consultation",
      desc: "Comprehensive advisory on business structuring, regulatory compliance, and risk mitigation.",
      benefits: ["Strategic Foresight", "Risk Assessment", "Compliance Checks"]
    },
    {
      icon: Scale,
      title: "Litigation Support",
      desc: "Robust representation across all judicial tiers, focusing on commercial and civil disputes.",
      benefits: ["Trial Preparation", "Appellate Strategy", "Expert Testimony"]
    },
    {
      icon: Briefcase,
      title: "Corporate Advisory",
      desc: "End-to-end legal support for M&A, joint ventures, and corporate restructuring.",
      benefits: ["Deal Structuring", "Negotiation", "Regulatory Filings"]
    },
    {
      icon: Search,
      title: "Due Diligence",
      desc: "Meticulous investigation and legal audits for mergers, acquisitions, and major investments.",
      benefits: ["Asset Verification", "Liability Assessment", "IP Audits"]
    },
    {
      icon: FileText,
      title: "Contract Drafting",
      desc: "Precise drafting, reviewing, and negotiation of complex commercial agreements.",
      benefits: ["Clarity & Precision", "Loophole Closure", "Dispute Prevention"]
    },
    {
      icon: ShieldCheck,
      title: "Regulatory Compliance",
      desc: "Ensuring your business operations adhere to complex domestic and international laws.",
      benefits: ["Policy Review", "Data Protection", "Anti-Bribery (FCPA/UKBA)"]
    }
  ];

  return (
    <PageWrapper title="Our Services">
      <PageHero 
        title="Comprehensive Legal Services."
        subtitle="We provide elite, end-to-end legal solutions tailored for corporations, financial institutions, and high-net-worth individuals."
      />

      {/* Main Services Grid */}
      <section className="landing-section">
        <div className="section-header">
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">How We Assist You</motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} initial="initial" whileInView="whileInView">Precision engineered legal services for complex challenges.</motion.p>
        </div>
        
        <motion.div className="grid-3" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
          {services.map((svc, idx) => (
            <motion.div key={idx} className="premium-card" variants={fadeInUp}>
              <svc.icon className="card-icon" />
              <h3 className="card-title">{svc.title}</h3>
              <p className="card-text mb-6" style={{ marginBottom: '2rem' }}>{svc.desc}</p>
              
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <h4 style={{ color: 'var(--primary-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Key Benefits</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {svc.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                      <CheckCircle size={14} color="var(--primary-gold)" style={{ marginRight: '0.5rem' }} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Comparison/Approach Section */}
      <section className="landing-section alt">
        <div className="grid-2">
          <motion.div 
            variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}
            style={{ position: 'relative', height: '100%', minHeight: '400px', borderRadius: '16px', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 className="card-title text-primary-gold mb-4 text-3xl" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>The Justice Difference</h3>
                <p className="card-text" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>Unlike traditional firms that react to legal issues, we proactively engineer strategies to prevent them. Our services are designed not just to defend, but to advance your strategic objectives.</p>
              </div>
              <ClipboardList size={200} color="var(--primary-gold)" opacity={0.05} style={{ position: 'absolute', right: '-20px', bottom: '-20px' }} />
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <h2 className="section-title text-left" style={{ textAlign: 'left' }}>Our Approach</h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--primary-gold)', marginBottom: '2rem' }}></div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--heading)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Initial Assessment</h4>
              <p style={{ color: 'var(--muted)' }}>We conduct a deep dive into your business operations and the specific legal challenges you face.</p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--heading)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Strategic Blueprinting</h4>
              <p style={{ color: 'var(--muted)' }}>Our partners draft a bespoke legal blueprint outlining the precise steps, timelines, and resources required.</p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--heading)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Aggressive Execution</h4>
              <p style={{ color: 'var(--muted)' }}>Whether in the boardroom or the courtroom, we execute the strategy with relentless precision.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-section text-center">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>Require Specialized Legal Services?</h2>
          <Link to="/consultation" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Book Consultation
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
