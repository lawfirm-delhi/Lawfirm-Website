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
        title="About Us"
        subtitle="Strategic, dependable and result-oriented legal solutions."
        badge="About Us"
      />

      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <motion.div 
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.h2 variants={fadeInUp} style={{ color: 'var(--primary-gold)', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Our Profile
              </motion.h2>
              <motion.h3 variants={fadeInUp} style={{ fontSize: '2.5rem', color: 'var(--heading)', marginBottom: '1.5rem' }}>
                Network for Your Advocacy, Trust and Integrity
              </motion.h3>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                NYATI stands for <strong>“Network for Your Advocacy, Trust and Integrity”</strong>—values that define our approach to the practice of law and our relationship with every client.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Based in the heart of New Delhi, NYATI Law Chamber is a full-service litigation and legal practice committed to providing strategic, dependable and result-oriented legal solutions. Built on a foundation of integrity, deep legal expertise and unwavering dedication, the Firm has developed extensive experience in navigating complex legal and regulatory landscapes for more than two decades.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Our practice encompasses civil, criminal, constitutional, human rights and disability along with matters dealing with people with HIV and refugees reflecting our strong commitment to human rights, dignity, equality, and access to justice. The firm also handles commercial, corporate, regulatory, and administrative matters, enabling us to provide comprehensive legal advice and representation to individuals, businesses, institutions, and organizations across a broad spectrum of legal issues.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                At NYATI, we believe that effective legal representation goes beyond knowledge of the law. It requires understanding the client, appreciating the larger circumstances of a dispute, identifying the real legal and commercial risks, and developing a strategy that is both practical and legally sustainable.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Our advocates approach every matter with transparency, diligence, discretion and commitment, while keeping the client's interests at the centre of the legal process.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                The Firm is led by its Founding Directors, <strong>Mr. Pankaj Sinha</strong> and <strong>Mr. Tariq Adeeb</strong>, who collectively bring more than four decades of professional experience in litigation represented their clients before the Supreme Court of India, Delhi High Court, various High Courts, District Courts, Tribunals, Commissions and other judicial and quasi-judicial authorities.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                With a combination of experienced advocacy, strategic thinking, personalized attention and professional integrity, NYATI seeks to provide not merely legal representation, but trusted legal partnership.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'sticky', top: '100px', width: '100%', aspectRatio: '4/5', background: 'var(--bg-gradient)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-gold)', overflow: 'hidden' }}
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


    </PageWrapper>
  );
}
