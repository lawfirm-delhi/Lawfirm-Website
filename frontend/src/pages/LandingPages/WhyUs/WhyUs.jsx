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
    { 
      icon: Award, 
      title: "Experience That Matters", 
      desc: "With more than four decades of collective litigation experience at senior judicial and quasi-judicial forums, our lawyers bring practical courtroom knowledge and strategic insight to complex legal matters." 
    },
    { 
      icon: Target, 
      title: "Strategic Legal Thinking", 
      desc: "We do not believe in a one-size-fits-all approach. Every dispute presents different facts, risks and opportunities. Our strategy is developed after understanding the client's objectives, the legal position and the broader implications of the matter." 
    },
    { 
      icon: Scale, 
      title: "Strong Litigation Practice", 
      desc: "Our experience before the Supreme Court of India, High Courts, District Courts, Tribunals and other forums enables us to handle matters across different stages—from legal consultation and pre-litigation strategy to trial, appeal and final adjudication." 
    },
    { 
      icon: Users, 
      title: "Personalized Attention", 
      desc: "Every client and every dispute is different. We believe that clients deserve accessibility, clarity and meaningful involvement in the legal process." 
    },
    { 
      icon: Shield, 
      title: "Integrity & Transparency", 
      desc: "Trust is the foundation of an effective lawyer-client relationship. We maintain professional transparency in our advice, strategy, communication and conduct." 
    },
    { 
      icon: Globe, 
      title: "Multi-Dimensional Legal Expertise", 
      desc: "Our practice extends across civil, criminal, constitutional, commercial, corporate, regulatory and administrative law, allowing us to address complex matters that may involve multiple areas of law." 
    },
    { 
      icon: Clock, 
      title: "Diligence & Responsiveness", 
      desc: "Legal disputes often demand timely action. We place strong emphasis on preparation, documentation, deadlines, procedural compliance and timely communication." 
    },
    { 
      icon: CheckCircle, 
      title: "A Long-Term Legal Partnership", 
      desc: "Our objective is not merely to appear in a case. We seek to understand our clients' legal requirements and remain a dependable legal partner through changing circumstances and evolving challenges." 
    }
  ];



  return (
    <PageWrapper title="Why Choose Us">
      <PageHero 
        title="Why NYATI?"
        subtitle="Choosing the right legal partner is critical to achieving a favorable outcome. Discover the pillars that define our practice."
      />

      {/* Our Philosophy */}
      <section className="landing-section">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Our Philosophy</h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--primary-gold)', marginBottom: '2rem' }}></div>
            <p className="card-text mb-4" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-gold)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              Understand. Strategize. Advocate. Resolve.
            </p>
            <p className="card-text mb-6" style={{ marginBottom: '2rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
              We listen before we advise, analyze before we act and strategize before we litigate. Every matter is approached with the objective of protecting our client's legal rights, interests and long-term objectives.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'inline-flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
              {['Understand', 'Strategize', 'Advocate', 'Resolve'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', color: 'var(--heading)', fontSize: '1.15rem', fontWeight: 600 }}>
                  <CheckCircle size={22} color="var(--primary-gold)" style={{ marginRight: '0.75rem' }} />
                  {item}
                </li>
              ))}
            </ul>
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
          <StatCard icon={Award} target={19} suffix="+" title="Years of Legacy" />
          <StatCard icon={Target} target={98} suffix="%" title="Client Satisfaction" />
          <StatCard icon={Users} target={5} title="Dedicated Advocates" />
        </div>
      </section>



      {/* CTA */}
      <section className="landing-section text-center">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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
