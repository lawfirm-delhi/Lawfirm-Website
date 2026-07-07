import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../Shared/PageWrapper';
import PageHero from '../Shared/PageHero';

export default function TermsOfUse() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <PageWrapper title="Terms of Use">
      <PageHero 
        title="Terms of Use"
        subtitle="Last updated: July 2026. Please read these terms and conditions carefully before using our website."
      />
      <section className="landing-section">
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--body)', fontSize: '1.1rem', lineHeight: '1.8' }}>
          <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h2 style={{ color: 'var(--heading)', marginBottom: '1rem', fontSize: '1.8rem' }}>1. No Attorney-Client Relationship</h2>
            <p style={{ marginBottom: '2rem' }}>
              The materials on this website are intended for general informational purposes only and do not constitute legal advice. Accessing this website or contacting us through it does not create an attorney-client relationship.
            </p>

            <h2 style={{ color: 'var(--heading)', marginBottom: '1rem', fontSize: '1.8rem' }}>2. Use of Website Content</h2>
            <p style={{ marginBottom: '2rem' }}>
              All content on this website, including text, graphics, logos, and articles, is the property of Justice & Associates and is protected by copyright laws. You may not reproduce, distribute, or modify any content without our prior written consent.
            </p>

            <h2 style={{ color: 'var(--heading)', marginBottom: '1rem', fontSize: '1.8rem' }}>3. Limitation of Liability</h2>
            <p style={{ marginBottom: '2rem' }}>
              Justice & Associates makes no warranties, expressed or implied, regarding the accuracy or completeness of the information provided on this website. We shall not be held liable for any damages arising from your use of this site.
            </p>

            <h2 style={{ color: 'var(--heading)', marginBottom: '1rem', fontSize: '1.8rem' }}>4. Governing Law</h2>
            <p style={{ marginBottom: '2rem' }}>
              These Terms of Use shall be governed by and construed in accordance with the laws of the jurisdiction in which our firm is headquartered, without regard to its conflict of law provisions.
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
