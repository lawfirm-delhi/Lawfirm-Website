import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Target, Clock, Award, CheckCircle, Scale, Globe, Users } from 'lucide-react';
import PageWrapper from '../Shared/PageWrapper';
import PageHero from '../Shared/PageHero';

// Animation variants
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

// Counter Hook
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, hasStarted]);

  return [count, setHasStarted];
}

function StatCard({ icon: Icon, target, suffix = '', title }) {
  const [count, setHasStarted] = useCounter(target);

  return (
    <motion.div 
      className="premium-card text-center"
      style={{ alignItems: 'center' }}
      variants={fadeInUp}
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      <Icon className="card-icon mx-auto mb-4" size={40} />
      <div className="notranslate" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>
        {count}{suffix}
      </div>
      <div className="card-title" style={{ fontSize: '1.2rem', marginBottom: 0 }}>{title}</div>
    </motion.div>
  );
}

export default function WhyUs() {
  const features = [
    { icon: Shield, title: "Confidential Legal Advice", desc: "Absolute privacy and attorney-client privilege strictly maintained at all times." },
    { icon: Award, title: "Experienced Partners", desc: "Decades of combined experience navigating complex domestic and international law." },
    { icon: CheckCircle, title: "Transparent Communication", desc: "Clear, jargon-free updates and honest assessments of your legal position." },
    { icon: Globe, title: "Nationwide Representation", desc: "Capable of handling cross-border and multi-jurisdictional disputes efficiently." },
    { icon: Target, title: "Proven Results", desc: "A track record of high-stakes victories, favorable settlements, and successful closures." },
    { icon: Users, title: "Personalized Strategy", desc: "We don't use boilerplate solutions. Every case is handled with bespoke legal strategies." }
  ];



  return (
    <PageWrapper title="Why Choose Us">
      <PageHero 
        title="Excellence in Legal Strategy."
        subtitle="Discover why Fortune 500 companies, high-net-worth individuals, and leading institutions trust Justice & Associates with their most critical legal matters."
      />

      {/* Our Philosophy */}
      <section className="landing-section">
        <div className="grid-2">
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <h2 className="section-title text-left" style={{ textAlign: 'left' }}>Our Philosophy</h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--primary-gold)', marginBottom: '2rem' }}></div>
            <p className="card-text mb-4" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              We believe that exceptional legal representation requires more than just knowing the law. It requires strategic vision, uncompromising integrity, and a relentless commitment to our clients' success.
            </p>
            <p className="card-text mb-6" style={{ marginBottom: '2rem' }}>
              Our firm was built on the principle that every client deserves partner-level attention and bespoke legal solutions. We do not offer generic advice; we engineer legal strategies designed to achieve definitive results in high-stakes environments.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Uncompromising Integrity', 'Fierce Advocacy', 'Strategic Foresight'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'var(--heading)' }}>
                  <CheckCircle size={20} color="var(--primary-gold)" style={{ marginRight: '1rem' }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}
            style={{ position: 'relative', height: '100%', minHeight: '400px', borderRadius: '16px', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Scale size={120} color="var(--primary-gold)" opacity={0.2} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Clients Choose Us */}
      <section className="landing-section alt">
        <div className="section-header">
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView">Why Clients Choose Us</motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} initial="initial" whileInView="whileInView">The pillars of our practice that set us apart.</motion.p>
        </div>
        <motion.div className="grid-3" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
          {features.map((feat, idx) => (
            <motion.div key={idx} className="premium-card" variants={fadeInUp}>
              <feat.icon className="card-icon" />
              <h3 className="card-title">{feat.title}</h3>
              <p className="card-text">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Statistics / Counters */}
      <section className="landing-section" style={{ background: 'var(--bg-gradient)' }}>
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <StatCard icon={Award} target={25} suffix="+" title="Years Experience" />
          <StatCard icon={Target} target={98} suffix="%" title="Success Rate" />
          <StatCard icon={Users} target={150} suffix="+" title="Expert Lawyers" />
          <StatCard icon={Globe} target={12} title="Global Offices" />
        </div>
      </section>



      {/* CTA */}
      <section className="landing-section text-center">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Ready to Discuss Your Case?</h2>
          <p className="hero-subtitle" style={{ marginBottom: '2rem' }}>Schedule a confidential consultation with our senior partners.</p>
          <Link to="/consultation" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Book Consultation
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
