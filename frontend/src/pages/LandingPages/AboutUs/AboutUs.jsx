import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, Target, Shield, Award, Globe, Users } from 'lucide-react';
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

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <PageHero 
        title="Our Firm"
        subtitle="Precision advocacy for businesses that cannot afford to be wrong."
        badge="About Us"
      />

      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div 
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.h2 variants={fadeInUp} style={{ color: 'var(--primary-gold)', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Est. 2011 · New Delhi
              </motion.h2>
              <motion.h3 variants={fadeInUp} style={{ fontSize: '2.5rem', color: 'var(--heading)', marginBottom: '1.5rem' }}>
                A Legacy of Excellence in Corporate Law
              </motion.h3>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Founded on the principles of rigorous intellectual inquiry and unwavering commitment to client success, Nyati Law Chamber has established itself as a premier litigation and corporate advisory firm.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                We advise boards, promoters, and institutions on the matters that define them — from complex courtroom litigation to the fine print of multi-jurisdictional mergers. Our attorneys bring decades of collective experience, combining deep legal scholarship with aggressive, pragmatic courtroom strategies.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative', width: '100%', aspectRatio: '4/5', background: 'var(--bg-gradient)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-gold)', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'radial-gradient(circle at 50% 50%, var(--primary-gold) 0%, transparent 70%)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', color: 'var(--primary-gold)' }}>
                <Scale size={80} strokeWidth={1} style={{ marginBottom: '2rem' }} />
                <h4 style={{ fontSize: '2rem', color: 'white', textAlign: 'center', padding: '0 2rem' }}>Fiat Justitia</h4>
                <p style={{ marginTop: '1rem', opacity: 0.8 }}>Let Justice Be Done</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={stagger}
            style={{ marginBottom: '4rem' }}
          >
            <motion.p variants={fadeInUp} className="eyebrow" style={{ color: 'var(--primary-gold)' }}>Core Values</motion.p>
            <motion.h2 variants={fadeInUp} style={{ fontSize: '2.5rem', color: 'var(--heading)' }}>What Drives Us</motion.h2>
          </motion.div>

          <motion.div 
            className="grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: Target, title: 'Precision Advocacy', desc: 'Every legal argument is meticulously researched, tested, and polished. We leave nothing to chance.' },
              { icon: Shield, title: 'Absolute Discretion', desc: 'Our clients entrust us with their most sensitive matters. We protect that trust with uncompromising confidentiality.' },
              { icon: Users, title: 'Strategic Partnership', desc: 'We do not just offer legal opinions; we offer strategic business counsel tailored to your commercial objectives.' },
              { icon: Award, title: 'Relentless Pursuit', desc: 'Whether at the negotiating table or before the Supreme Court, we relentlessly pursue the best possible outcome.' }
            ].map((value, i) => (
              <motion.div key={i} variants={fadeInUp} className="premium-card text-center" style={{ padding: '3rem 2rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary-gold)' }}>
                  <value.icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--heading)', marginBottom: '1rem' }}>{value.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="section" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <Globe size={48} color="var(--primary-gold)" style={{ margin: '0 auto 2rem' }} />
            <h2 style={{ color: '#E2E8F0', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Global Standards, Local Expertise</h2>
            <p style={{ color: '#94A3B8', fontSize: '1.15rem', lineHeight: 1.8 }}>
              Based in New Delhi with an expansive network across major Indian jurisdictions, we seamlessly navigate complex domestic regulations while adhering to global standards of legal practice.
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
