import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Mail, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Shared/PageWrapper';
import PageHero from '../Shared/PageHero';

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

function LawyerCard({ lawyer }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={fadeInUp}
      style={{ perspective: 1000, height: '100%' }}
    >
      <motion.div
        className="premium-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d",
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 20px rgba(200,164,106,0.2)',
          borderColor: 'rgba(200,164,106,0.4)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div style={{ height: '300px', background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
          {/* Silhouette Placeholder */}
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '280px', background: 'linear-gradient(to top, var(--bg-secondary), transparent)', borderRadius: '100px 100px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '20px' }}>
             <svg width="120" height="120" viewBox="0 0 24 24" fill="var(--primary-gold)" opacity="0.3">
               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
             </svg>
          </div>
        </div>
        
        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title" style={{ marginBottom: '0.2rem' }}>{lawyer.name}</h3>
          <p style={{ color: 'var(--primary-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{lawyer.designation}</p>
          
          <div style={{ marginBottom: '1.5rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--muted)' }}>Practice:</span>
              <span style={{ color: 'var(--heading)', fontWeight: 500, textAlign: 'right' }}>{lawyer.practiceArea}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--muted)' }}>Experience:</span>
              <span style={{ color: 'var(--heading)', fontWeight: 500, textAlign: 'right' }}>{lawyer.experience}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--muted)' }}>Education:</span>
              <span style={{ color: 'var(--heading)', fontWeight: 500, textAlign: 'right' }}>{lawyer.education}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'var(--muted)' }}><Mail size={18} /></a>
              <a href="#" style={{ color: 'var(--muted)' }}><Globe size={18} /></a>
            </div>
            <Link to={`/team/${lawyer.id}`} style={{ color: 'var(--primary-gold)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
              View Profile <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  const lawyers = [
    { id: '1', name: 'Jonathan Sterling', designation: 'Senior Partner', practiceArea: 'Corporate Law', experience: '25+ Years', education: 'Harvard Law School' },
    { id: '2', name: 'Eleanor Vance', designation: 'Partner', practiceArea: 'Litigation & Disputes', experience: '18 Years', education: 'Yale Law School' },
    { id: '3', name: 'Marcus Chen', designation: 'Managing Partner', practiceArea: 'Intellectual Property', experience: '20 Years', education: 'Stanford Law School' },
    { id: '4', name: 'Sarah Kensington', designation: 'Senior Associate', practiceArea: 'International Arbitration', experience: '12 Years', education: 'Oxford University' },
    { id: '5', name: 'David Roth', designation: 'Partner', practiceArea: 'Taxation', experience: '22 Years', education: 'NYU School of Law' },
    { id: '6', name: 'Aisha Rahman', designation: 'Associate', practiceArea: 'Real Estate', experience: '8 Years', education: 'Columbia Law School' }
  ];

  return (
    <PageWrapper title="Our Team">
      <PageHero 
        title="Legal Brilliance."
        subtitle="Meet the exceptional minds driving our firm's success. Our team brings decades of high-stakes experience from the world's most prestigious institutions."
      />

      <section className="landing-section">
        <div className="section-header">
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">Leadership & Partners</motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} initial="initial" whileInView="whileInView">The strategists behind our landmark victories.</motion.p>
        </div>
        
        <motion.div 
          className="grid-3" 
          variants={stagger} 
          initial="initial" 
          whileInView="animate" 
          viewport={{ once: true, margin: "-50px" }}
        >
          {lawyers.map(lawyer => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </motion.div>
      </section>

      {/* Recruitment CTA */}
      <section className="landing-section alt text-center">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 className="section-title mb-6">Join Our Ranks</h2>
          <p className="hero-subtitle mb-8">We are always looking for exceptional talent to join our growing international practice. Discover a career defined by excellence.</p>
          <a href="#" className="btn btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            View Opportunities
          </a>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
