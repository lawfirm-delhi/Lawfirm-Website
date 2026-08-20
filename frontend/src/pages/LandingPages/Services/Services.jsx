import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, Scale, ShieldCheck, Search, Users, ClipboardList, CheckCircle, AlertTriangle, Award } from 'lucide-react';
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
      title: "Legal Consultation & Opinion",
      desc: "Independent and practical legal advice on complex legal questions, disputes, transactions and regulatory issues.",
      benefits: ["Independent Advice", "Risk Analysis", "Regulatory Guidance"]
    },
    {
      icon: Scale,
      title: "Litigation & Dispute Resolution",
      desc: "Strategic assistance in negotiation, mediation, conciliation and arbitration with the objective of resolving disputes efficiently wherever possible.",
      benefits: ["Strategic Negotiation", "Mediation & Conciliation", "Efficient Settlements"]
    },
    {
      icon: Briefcase,
      title: "Corporate & Business Legal Support",
      desc: "Legal assistance to businesses and organisations in relation to contracts, disputes, regulatory matters, compliance and litigation management.",
      benefits: ["Contract Drafting & Review", "Corporate Governance", "Compliance Audits"]
    },
    {
      icon: AlertTriangle,
      title: "Emergency Legal Assistance",
      desc: "Time-sensitive legal intervention in matters involving arrest, urgent injunctions, demolition, eviction, coercive administrative action and other circumstances requiring immediate legal strategy.",
      benefits: ["Urgent Injunctions", "Arrest & Eviction Defence", "24/7 Rapid Response"]
    },
    {
      icon: Award,
      title: "Appeals & Higher Court Strategy",
      desc: "Assistance in developing and implementing litigation strategy for appeals, revisions, writ proceedings, Special Leave Petitions and other proceedings before superior courts.",
      benefits: ["Writ Proceedings", "Special Leave Petitions", "Appellate Court Advocacy"]
    }
  ];

  return (
    <PageWrapper title="Our Services">
      <PageHero 
        title="Services"
        subtitle="Legal Services Designed Around Your Needs. NYATI Law Chamber provides end-to-end legal services with a focus on clarity, strategy, advocacy and effective resolution."
      />

      {/* Main Services Grid */}
      <section className="landing-section">
        <div className="section-header">
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">How We Assist You</motion.h2>
        </div>
        
        <motion.div className="grid-3" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
          {services.map((svc, idx) => (
            <motion.div key={idx} className="premium-card" variants={fadeInUp}>
              <svc.icon className="card-icon" />
              <h3 className="card-title">{svc.title}</h3>
              <p className="card-text mb-6" style={{ marginBottom: 0 }}>{svc.desc}</p>
            </motion.div>
          ))}
        </motion.div>
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
