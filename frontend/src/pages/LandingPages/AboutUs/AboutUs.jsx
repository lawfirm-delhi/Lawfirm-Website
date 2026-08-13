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
          <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div 
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.h2 variants={fadeInUp} style={{ color: 'var(--primary-gold)', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Est. 2007 · New Delhi
              </motion.h2>
              <motion.h3 variants={fadeInUp} style={{ fontSize: '2.5rem', color: 'var(--heading)', marginBottom: '1.5rem' }}>
                A Distinguished 19-Year Legacy of Exceptional Advocacy
              </motion.h3>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                NYATI (formerly known as PK Sinha and Associates) is a premier, full-service legal firm delivering exceptional advocacy and strategic legal consultancy. Founded and led by Advocate Pankaj Sinha, the firm was built on a foundation of integrity, deep legal expertise, and unrelenting dedication, successfully navigating complex legal landscapes for nearly two decades.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                As we transition into our new identity as NYATI, the vision of our founder remains our guiding light. While our name evolves to meet the dynamic needs of modern jurisprudence, our core values remain unchanged. We continue to represent a diverse clientele across multiple judicial forums, offering seamless legal representation from foundational trial courts to higher appellate bodies.
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
                <img src="/images/logo.png" alt="Nyati Law Chamber Logo" style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '2rem' }} />
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
              { icon: Users, title: 'Empathy & Assertiveness', desc: 'We believe that every client deserves a listening ear and an individualized strategy, backed by an aggressive, intellectually sharp defense.' },
              { icon: Shield, title: 'Rigorous Research', desc: 'Justice is a meticulous process of ethical practice, thorough research, and unyielding perseverance. We leave no stone unturned.' },
              { icon: Target, title: 'Client-Centric Trust', desc: 'We believe in absolute transparency and an ethical approach. Clients receive realistic legal assessments and a dedicated ally.' },
              { icon: Award, title: 'Professional Excellence', desc: 'Under the guidance of Advocate Pankaj Sinha, we commit to demystifying the legal process and maintaining the highest standards.' }
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
      
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={stagger}
              style={{ padding: '2.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
            >
              <motion.div variants={fadeInUp} style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-gold)', marginBottom: '1.5rem' }}>
                <Target size={24} />
              </motion.div>
              <motion.h3 variants={fadeInUp} style={{ fontSize: '1.75rem', color: 'var(--heading)', marginBottom: '1rem' }}>Our Mission</motion.h3>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                To provide accessible, top-tier legal advocacy and result-oriented consultancy that safeguards our clients' interests. Under the guidance of Advocate Pankaj Sinha, we commit to demystifying the legal process, offering clear strategic guidance, and maintaining the highest standards of professional excellence in every court we enter.
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={stagger}
              style={{ padding: '2.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
            >
              <motion.div variants={fadeInUp} style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-gold)', marginBottom: '1.5rem' }}>
                <Globe size={24} />
              </motion.div>
              <motion.h3 variants={fadeInUp} style={{ fontSize: '1.75rem', color: 'var(--heading)', marginBottom: '1rem' }}>Our Vision</motion.h3>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                To be recognized as a benchmark of legal integrity and innovation across India. We aim to bridge the gap between traditional litigation and forward-thinking consultancy, empowering individuals, corporate bodies, and public servants with definitive justice.
              </motion.p>
            </motion.div>
          </div>
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
            <h2 style={{ color: '#E2E8F0', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Message from the Founder's Desk</h2>
            <p style={{ color: 'var(--primary-gold)', fontSize: '1.3rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: 1.6 }}>
              "In the pursuit of justice, experience is irreplaceable, but adaptability is indispensable."
            </p>
            <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'left', marginBottom: '1.5rem' }}>
              When I established this legal practice 19 years ago as PK Sinha and Associates, the vision was simple yet profound: to build a law firm rooted deeply in absolute integrity, relentless legal research, and unwavering dedication to the people we represent.
            </p>
            <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'left', marginBottom: '1.5rem' }}>
              Over the past two decades, the judicial landscape has evolved significantly, and so have we. Today, as we step into a new era under our new identity, NYATI, our foundational promise remains completely untouched. The name Nyati represents our commitment to modern, swift, and definitive justice, bridging the gap between traditional litigation and forward-thinking consultancy.
            </p>
            <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'left', marginBottom: '2rem' }}>
              Whether you are navigating a complex appellate matter, fighting a sensitive service dispute before the CAT, or seeking proactive legal consultancy to mitigate risk before it reaches a courtroom, NYATI stands ready as your dedicated ally. We don’t just represent cases; we carry the responsibility of your trust, ensuring that your rights are aggressively defended and your interests are thoroughly protected.
            </p>
            <p style={{ color: '#E2E8F0', fontSize: '1.1rem', fontWeight: 600, marginTop: '2rem' }}>
              Advocate Pankaj Sinha
            </p>
            <p style={{ color: 'var(--primary-gold)', fontSize: '0.95rem' }}>
              Founder, NYATI (Formerly PK Sinha and Associates)
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
