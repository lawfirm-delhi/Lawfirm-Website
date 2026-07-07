import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Quote, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Shared/PageWrapper';
import PageHero from '../Shared/PageHero';

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

function TestimonialCard({ name, role, company, practiceArea, text, rating = 5 }) {
  return (
    <motion.div className="premium-card" variants={fadeInUp} style={{ position: 'relative' }}>
      <Quote size={40} color="var(--primary-gold)" opacity={0.15} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }} />
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} fill="var(--primary-gold)" color="var(--primary-gold)" style={{ marginRight: '4px' }} />
        ))}
      </div>
      <p className="card-text mb-6" style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.7 }}>
        "{text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--bg-tertiary)', border: '2px solid var(--primary-gold)', marginRight: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-gold)', fontWeight: 'bold' }}>
          {name.charAt(0)}
        </div>
        <div>
          <h4 style={{ color: 'var(--heading)', marginBottom: '0.2rem' }}>{name}</h4>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{role}{company ? `, ${company}` : ''}</p>
          <p style={{ color: 'var(--primary-gold)', fontSize: '0.8rem', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{practiceArea}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const reviews = [
    { name: "Robert Caldwell", role: "CEO", company: "Meridian Tech", practiceArea: "Corporate M&A", text: "Justice & Associates executed our cross-border acquisition with flawless precision. Their strategic foresight saved us millions in potential liabilities." },
    { name: "Elena Rostova", role: "Founder", company: "Rostova Holdings", practiceArea: "Real Estate", text: "When the zoning board rejected our $500M development, Justice & Associates stepped in. Not only did they win the appeal, they secured favorable terms for future expansions." },
    { name: "David Chen", role: "Private Client", practiceArea: "Tax Controversy", text: "The IRS audit was a nightmare until I retained this firm. Their tax controversy team handled everything and reduced my penalty exposure to zero." },
    { name: "Sarah Jenkins", role: "General Counsel", company: "AeroDynamics", practiceArea: "Intellectual Property", text: "Their IP litigation team successfully defended our core patents against a major competitor. Aggressive, highly prepared, and incredibly strategic." },
    { name: "Marcus Thorne", role: "Managing Director", company: "Thorne Capital", practiceArea: "Arbitration", text: "In our ICC arbitration in Geneva, their partners out-maneuvered opposing counsel at every turn. A masterclass in international dispute resolution." },
    { name: "Dr. Alistair Webb", role: "Chief of Surgery", practiceArea: "White Collar Defense", text: "Confidentiality and integrity were my highest priorities. Justice & Associates handled my case with absolute discretion and secured an unconditional dismissal." }
  ];

  return (
    <PageWrapper title="Client Success Stories">
      <PageHero 
        title="Results That Speak."
        subtitle="We measure our success not by the hours we bill, but by the decisive victories we secure for our clients."
      />

      {/* Video Testimonials */}
      <section className="landing-section">
        <div className="section-header">
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">Featured Client Stories</motion.h2>
        </div>
        <div className="grid-2">
          {[1, 2].map((video) => (
            <motion.div 
              key={video}
              variants={fadeInUp} 
              initial="initial" 
              whileInView="whileInView" 
              viewport={{ once: true }}
              style={{ position: 'relative', height: '350px', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(11,22,40,0.9), rgba(11,22,40,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(200,164,106,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary-gold)', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}>
                    <Play fill="var(--primary-gold)" color="var(--primary-gold)" size={30} style={{ marginLeft: '5px' }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                  <h3 className="card-title " style={{ marginBottom: '0.2rem', color: 'var(--heading)' }}>{video === 1 ? 'Meridian Tech Acquisition' : 'Rostova Development Appeal'}</h3>
                  <p style={{ color: 'var(--primary-gold)' }}>Watch Case Study</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="landing-section alt">
        <motion.div className="grid-3" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
          {reviews.map((review, idx) => (
            <TestimonialCard key={idx} {...review} />
          ))}
        </motion.div>
      </section>

      {/* Awards */}
      <section className="landing-section">
        <div className="section-header">
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">Industry Recognition</motion.h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
          {[
            "Chambers Global Band 1", 
            "Legal 500 Tier 1", 
            "Best Lawyers in America", 
            "IFLR1000 Top Tier"
          ].map((award, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              style={{ textAlign: 'center', width: '200px' }}
            >
              <Award size={60} color="var(--primary-gold)" strokeWidth={1} style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ color: 'var(--heading)', fontSize: '1rem', fontWeight: 500 }}>{award}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>2025 - 2026</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
