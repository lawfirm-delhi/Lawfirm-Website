import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../Shared/PageWrapper';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: '120px 20px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vw',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', textAlign: 'center' }}>
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <img src="/images/logo.png" alt="NYATI Law Chamber Logo" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              color: 'var(--heading)', 
              fontFamily: 'var(--font-display)', 
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}>
              Fiat Justitia
              <span style={{ display: 'block', fontSize: '40%', color: 'var(--primary-gold)', marginTop: '0.5rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Let Justice Be Done</span>
            </h1>
            
            <div style={{ width: '80px', height: '2px', background: 'var(--primary-gold)', margin: '2rem auto' }} />

            <p style={{ 
              color: 'var(--body)', 
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
              lineHeight: 1.8, 
              maxWidth: '800px', 
              margin: '0 auto' 
            }}>
              Based in the heart of New Delhi, NYATI Law Chamber is a full-service litigation and legal practice committed to providing strategic, dependable and result-oriented legal solutions. With a combination of experienced advocacy, strategic thinking, personalized attention and professional integrity, NYATI seeks to provide not merely legal representation, but trusted legal partnership.
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
