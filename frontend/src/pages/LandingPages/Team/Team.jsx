import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Shared/PageWrapper';
import PageHero from '../Shared/PageHero';

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

function LawyerCard({ lawyer }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{ height: '100%' }}
    >
      <motion.div
        className="premium-card"
        style={{ 
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        whileHover={{ 
          y: -8, 
          boxShadow: '0 20px 35px -10px rgba(0,0,0,0.2), 0 0 15px rgba(200,164,106,0.1)',
          borderColor: 'rgba(200,164,106,0.3)'
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div style={{ height: '300px', background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
          {lawyer.image ? (
            <img src={lawyer.image} alt={lawyer.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: lawyer.objectPosition || 'center' }} />
          ) : (
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '280px', background: 'linear-gradient(to top, var(--bg-secondary), transparent)', borderRadius: '100px 100px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '20px' }}>
               <svg width="120" height="120" viewBox="0 0 24 24" fill="var(--primary-gold)" opacity="0.3">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
               </svg>
            </div>
          )}
        </div>
        
        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title" style={{ marginBottom: '0.2rem' }}>{lawyer.name}</h3>
          <p style={{ color: 'var(--primary-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{lawyer.designation}</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={`mailto:${lawyer.email}`} style={{ color: 'var(--muted)' }}><Mail size={18} /></a>
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
    { 
      id: 'pankaj-sinha', 
      name: 'Pankaj Sinha', 
      designation: 'Founding Director | Senior Litigation Counsel', 
      email: 'sinhapankaj81@gmail.com',
      image: '/team/pankaj.jpeg',
      objectPosition: 'center 15%'
    },
    { 
      id: 'tariq-adeeb', 
      name: 'Tariq Adeeb', 
      designation: 'Founding Director | Senior Litigation Counsel', 
      email: 'lawfirm.delhi.official@gmail.com',
      image: '/team/tariq.jpeg',
      objectPosition: 'center 10%'
    },
    { 
      id: 'garima', 
      name: 'Garima', 
      designation: 'Associate Litigation Lawyer', 
      email: 'garima040810@gmail.com',
      image: '/team/garima.jpeg',
      objectPosition: 'center 68%'
    },
    { 
      id: 'humaira', 
      name: 'Humaira Salam', 
      designation: 'Associate Litigation Lawyer', 
      email: 'lawfirm.delhi.official@gmail.com',
      image: '/team/humaira.jpeg',
      objectPosition: 'center 20%'
    },
    { 
      id: 'kulwinder', 
      name: 'Kulvinder Sehjal', 
      designation: 'Associate Litigation Lawyer', 
      email: 'lawfirm.delhi.official@gmail.com',
      image: '/team/kulwinder.jpeg',
      objectPosition: 'center 45%'
    }
  ];

  return (
    <PageWrapper title="Our Team">
      <PageHero 
        title="Our Team"
        subtitle="NYATI comprises experienced advocates and legal professionals who combine legal knowledge, courtroom experience, research capabilities and strategic thinking to address complex legal challenges."
      />

      <section className="landing-section" style={{ background: 'var(--bg-primary)' }}>
        <div className="section-header">
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">Founding Directors</motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} initial="initial" whileInView="whileInView">Founding leadership and Senior Litigation Counsel.</motion.p>
        </div>
        
        <motion.div 
          className="grid-3" 
          variants={stagger} 
          initial="initial" 
          whileInView="animate" 
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}
        >
          {lawyers.filter(l => l.designation.includes('Founding Director')).map(lawyer => (
            <div key={lawyer.id} style={{ maxWidth: '350px', width: '100%' }}>
              <LawyerCard lawyer={lawyer} />
            </div>
          ))}
        </motion.div>

        <div className="section-header" style={{ marginTop: '4rem' }}>
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">Associate Litigation Lawyers</motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} initial="initial" whileInView="whileInView">Dynamic associate legal professionals.</motion.p>
        </div>

        <motion.div 
          className="grid-3" 
          variants={stagger} 
          initial="initial" 
          whileInView="animate" 
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}
        >
          {lawyers.filter(l => l.designation.includes('Associate')).map(lawyer => (
            <div key={lawyer.id} style={{ maxWidth: '350px', width: '100%' }}>
              <LawyerCard lawyer={lawyer} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Our Wider Team */}
      <section className="landing-section alt" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">Our Wider Team</motion.h2>
          <div style={{ width: '60px', height: '3px', background: 'var(--primary-gold)', margin: '0 auto 2rem' }}></div>
          <motion.p variants={fadeInUp} initial="initial" whileInView="whileInView" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            NYATI works through a collaborative team structure involving advocates, associates, researchers and professionals with expertise across different areas of law.
          </motion.p>
          <motion.p variants={fadeInUp} initial="initial" whileInView="whileInView" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            For matters requiring specialized expertise or proceedings outside Delhi, the Firm may work with local counsel and professional associates, enabling coordinated legal representation across jurisdictions.
          </motion.p>
        </div>
      </section>

      {/* One Team. One Objective. */}
      <section className="landing-section" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">One Team. One Objective.</motion.h2>
          <div style={{ width: '60px', height: '3px', background: 'var(--primary-gold)', margin: '0 auto 2rem' }}></div>
          <motion.p className="card-text" variants={fadeInUp} initial="initial" whileInView="whileInView" style={{ fontSize: '1.3rem', color: 'var(--primary-gold)', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: 600 }}>
            Regardless of the size or complexity of a matter, our team works towards one objective:
          </motion.p>
          <motion.p className="hero-subtitle" variants={fadeInUp} initial="initial" whileInView="whileInView" style={{ fontSize: '1.2rem', color: 'var(--heading)', fontWeight: 500 }}>
            To protect the client's legal interests through informed advice, diligent preparation and effective advocacy.
          </motion.p>
        </div>
      </section>
    </PageWrapper>
  );
}
