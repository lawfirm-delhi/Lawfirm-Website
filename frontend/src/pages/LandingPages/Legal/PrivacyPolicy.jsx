import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../Shared/PageWrapper';
import PageHero from '../Shared/PageHero';

export default function PrivacyPolicy() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <PageWrapper title="Privacy Policy">
      <PageHero 
        title="Privacy Policy"
        subtitle="Last updated: July 2026. This Privacy Policy describes how Justice & Associates collects, uses, and shares your personal data."
      />
      <section className="landing-section">
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--body)', fontSize: '1.1rem', lineHeight: '1.8' }}>
          <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h2 style={{ color: 'var(--heading)', marginBottom: '1rem', fontSize: '1.8rem' }}>1. Information We Collect</h2>
            <p style={{ marginBottom: '2rem' }}>
              We may collect personal information such as your name, contact details, and any sensitive legal information you voluntarily provide to us during consultations or representation. We also collect usage data through cookies to improve our website experience.
            </p>

            <h2 style={{ color: 'var(--heading)', marginBottom: '1rem', fontSize: '1.8rem' }}>2. How We Use Your Data</h2>
            <p style={{ marginBottom: '2rem' }}>
              Your data is primarily used to provide legal services, communicate with you regarding your case, and send you relevant legal updates if you subscribe to our newsletter. We adhere strictly to attorney-client privilege.
            </p>

            <h2 style={{ color: 'var(--heading)', marginBottom: '1rem', fontSize: '1.8rem' }}>3. Data Security</h2>
            <p style={{ marginBottom: '2rem' }}>
              We employ industry-standard security measures, including end-to-end encryption and secure servers, to protect your personal and confidential information from unauthorized access, disclosure, or destruction.
            </p>

            <h2 style={{ color: 'var(--heading)', marginBottom: '1rem', fontSize: '1.8rem' }}>4. Contact Us</h2>
            <p style={{ marginBottom: '2rem' }}>
              If you have any questions about this Privacy Policy or how we handle your data, please contact our Data Protection Officer at privacy@justiceassociates.example.
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
