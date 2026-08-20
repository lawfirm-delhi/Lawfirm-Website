import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
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

function TestimonialCard({ text, clientType }) {
  return (
    <motion.div className="premium-card" variants={fadeInUp} style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Quote size={40} color="var(--primary-gold)" opacity={0.15} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }} />
      <p className="card-text mb-6" style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '2rem', flexGrow: 1 }}>
        "{text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.1)', marginRight: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-gold)', fontWeight: 'bold' }}>
          C
        </div>
        <div>
          <h4 style={{ color: 'var(--heading)', marginBottom: '0.1rem', fontSize: '1.05rem' }}>Client</h4>
          <p style={{ color: 'var(--primary-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{clientType}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const reviews = [
    {
      text: "The team demonstrated exceptional professionalism, preparedness and commitment throughout the matter. Their ability to understand the complexities of the case and provide clear legal guidance gave us considerable confidence.",
      clientType: "Civil Litigation"
    },
    {
      text: "What stood out was the personal attention given to the matter. The legal position was explained clearly at every stage, and the team remained accessible throughout the proceedings.",
      clientType: "Commercial Dispute"
    },
    {
      text: "The Firm approached the matter strategically and with complete diligence. Their courtroom experience and attention to detail made a significant difference.",
      clientType: "Constitutional Matter"
    }
  ];

  return (
    <PageWrapper title="Testimonials">
      <PageHero 
        title="Testimonials"
        subtitle="At NYATI, we value the trust placed in us by our clients. Every matter represents not merely a legal dispute, but a person, family, business or institution seeking guidance and representation. Our client relationships are built upon trust, accessibility, professional integrity and commitment."
      />

      {/* Main Testimonials Grid */}
      <section className="landing-section" style={{ background: 'var(--bg-primary)' }}>
        <div className="section-header">
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">What Our Clients Say</motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} initial="initial" whileInView="whileInView">Feedback and reflections from our client relationships.</motion.p>
        </div>
        
        <motion.div className="grid-3" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
          {reviews.map((svc, idx) => (
            <div key={idx}>
              <TestimonialCard text={svc.text} clientType={svc.clientType} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Trust Responsibility CTA */}
      <section className="landing-section alt" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">Your Trust Is Our Responsibility</motion.h2>
          <div style={{ width: '60px', height: '3px', background: 'var(--primary-gold)', margin: '0 auto 2rem' }}></div>
          <motion.p variants={fadeInUp} initial="initial" whileInView="whileInView" style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            We are grateful to every client who has entrusted NYATI with their legal affairs. We remain committed to earning that trust through every matter we undertake.
          </motion.p>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="landing-section" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)', padding: '3rem 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', px: '2rem' }}>
          <motion.p 
            variants={fadeInUp} 
            initial="initial" 
            whileInView="whileInView" 
            style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}
          >
            Client testimonials displayed on the website should be published only with the appropriate consent and in compliance with applicable professional and ethical rules governing advocates.
          </motion.p>
        </div>
      </section>
    </PageWrapper>
  );
}
