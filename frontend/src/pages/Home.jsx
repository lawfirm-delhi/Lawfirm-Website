import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView, animate } from 'framer-motion';
import ConsultationWizard from '../components/ConsultationWizard';
function CounterNumber({ value, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1], // using the premium ease curve
        onUpdate(v) {
          setDisplayValue(Math.floor(v));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref} className="notranslate">{prefix}{displayValue}{suffix}</span>;
}

export default function Home() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const basicRevealElements = document.querySelectorAll('.reveal');
    const premiumCards = document.querySelectorAll('.why-card, .practice-tab, .stat-card, .team-card, .service-card, .testimonial-card, .blog-card, .faq-item, .consultation-form');
    
    if (!prefersReducedMotion) {
      // Basic Reveal
      const basicObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      
      basicRevealElements.forEach(el => basicObserver.observe(el));

      // Premium Card Staggered Reveal
      let delay = 0;
      let delayTimeout = null;
      const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-revealed');
            }, delay);
            delay += 150;
            clearTimeout(delayTimeout);
            delayTimeout = setTimeout(() => { delay = 0; }, 300);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      premiumCards.forEach(card => cardObserver.observe(card));
      
      // Mobile Scroll Focus Observer
      const mobileFocusObserver = new IntersectionObserver((entries) => {
        if (window.innerWidth > 768) return; // Only apply on mobile screens
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-mobile-focused');
          } else {
            entry.target.classList.remove('is-mobile-focused');
          }
        });
      }, { threshold: 0.5, rootMargin: "-15% 0px -15% 0px" });
      
      premiumCards.forEach(card => mobileFocusObserver.observe(card));

      // Hover 3D Tilt for Premium Cards
      const handleMouseMove = (e) => {
        const card = e.currentTarget;
        if (!card.classList.contains('is-revealed')) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3; 
        const rotateY = ((x - centerX) / centerX) * 3;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-8px)`;
      };
      const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        if (card.classList.contains('is-revealed')) {
          card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)`;
        }
      };

      premiumCards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        basicObserver.disconnect();
        cardObserver.disconnect();
        mobileFocusObserver.disconnect();
        premiumCards.forEach(card => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    } else {
      basicRevealElements.forEach(el => el.classList.add('is-visible'));
      premiumCards.forEach(card => card.classList.add('is-revealed'));
    }
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-left">
            <p className="eyebrow eyebrow-light">Welcome to Nyati Law Chamber</p>
            <p className="tagline">"Counsel that stands where the law is tested."</p>
            <h1 className="hero-headline">Precision advocacy for businesses that cannot afford to be wrong.</h1>
            <p className="hero-support">NYATI advises boards, promoters, and institutions on the matters that define them — from courtroom litigation to the fine print of a billion‑rupee merger.</p>
            <div className="hero-cta-row">
              <a href="#consultation" className="btn btn-primary">Book a Consultation</a>
              <a href="#practice-areas" className="btn btn-ghost">Explore Practice Areas</a>
            </div>
            <dl className="hero-mini-stats">
              <div>
                <dt><CounterNumber value={500} suffix="+" /></dt>
                <dd>Cases Handled</dd>
              </div>
              <div>
                <dt><CounterNumber value={19} suffix="+" /></dt>
                <dd>Years at the Bar</dd>
              </div>
              <div>
                <dt><CounterNumber value={50} suffix="+" /></dt>
                <dd>Corporate Clients</dd>
              </div>
            </dl>
          </div>

          <div className="hero-right">
            <div className="hero-art-frame">
              <svg className="hero-visual" viewBox="0 0 420 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a classical courthouse facade with a balanced scale of justice">
                <defs>
                  <radialGradient id="auraGrad" cx="50%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#A38342" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#A38342" stopOpacity="0"/>
                  </radialGradient>
                  <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B89955"/>
                    <stop offset="100%" stopColor="#8A6D33"/>
                  </linearGradient>
                  <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#A38342" stopOpacity="0"/>
                    <stop offset="50%" stopColor="#A38342" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#A38342" stopOpacity="0"/>
                  </linearGradient>
                  <clipPath id="frameClip"><rect x="0" y="0" width="420" height="460" rx="4"/></clipPath>
                </defs>

                <rect width="420" height="460" fill="transparent"/>
                <circle className="hero-visual-bg" cx="210" cy="150" r="180" fill="url(#auraGrad)"/>

                <g clipPath="url(#frameClip)">
                  <circle className="hero-visual-star" cx="60" cy="70" r="1.4" fill="#A38342"/>
                  <circle className="hero-visual-star" cx="340" cy="55" r="1.6" fill="#A38342"/>
                  <circle className="hero-visual-star" cx="300" cy="110" r="1.1" fill="#A38342"/>

                  <path d="M70 190 L210 120 L350 190 Z" fill="#1E293B" stroke="#36455E" strokeWidth="1"/>
                  <rect x="60" y="188" width="300" height="14" fill="#0F172A" stroke="#36455E" strokeWidth="0.75"/>

                  <g>
                    <rect className="hero-visual-column" x="88" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
                    <rect className="hero-visual-column" x="146" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
                    <rect className="hero-visual-column" x="204" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
                    <rect className="hero-visual-column" x="262" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
                    <rect className="hero-visual-column" x="320" y="205" width="16" height="150" fill="url(#pillarGrad)"/>
                  </g>

                  <rect x="60" y="355" width="300" height="10" fill="#1E293B"/>
                  <rect x="45" y="365" width="330" height="10" fill="#0F172A"/>
                  <rect x="30" y="375" width="360" height="10" fill="#090D17"/>

                  <rect className="hero-visual-sweep" x="0" y="0" width="120" height="460" fill="url(#sweepGrad)"/>

                  <g className="hero-visual-beam">
                    <line x1="140" y1="150" x2="280" y2="150" stroke="#36455E" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="210" y1="118" x2="210" y2="150" stroke="#36455E" strokeWidth="2.5"/>
                    <circle className="hero-visual-glow" cx="210" cy="118" r="46" fill="#36455E" opacity="0.15"/>
                    <circle cx="210" cy="118" r="7" fill="#36455E"/>

                    <line x1="140" y1="150" x2="140" y2="172" stroke="#36455E" strokeWidth="1.6"/>
                    <path d="M124 172 Q140 194 156 172" stroke="#36455E" strokeWidth="1.6" fill="none"/>
                    <line x1="124" y1="172" x2="156" y2="172" stroke="#36455E" strokeWidth="1.6"/>

                    <line x1="280" y1="150" x2="280" y2="172" stroke="#36455E" strokeWidth="1.6"/>
                    <path d="M264 172 Q280 194 296 172" stroke="#36455E" strokeWidth="1.6" fill="none"/>
                    <line x1="264" y1="172" x2="296" y2="172" stroke="#36455E" strokeWidth="1.6"/>
                  </g>
                </g>
                <rect x="1" y="1" width="418" height="458" fill="none" stroke="#A38342" strokeOpacity="0.1"/>
              </svg>
              <div className="hero-art-caption">
                <span>Est. Delhi, 2007</span>
                <span>Fiat Justitia</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span></span></div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section why-us" id="why-us">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Why Choose Us</p>
            <h2>Judgment, discretion, and depth — in that order.</h2>
            <p className="section-lede">Clients retain us for the outcome, but they stay for how we get there: rigorous preparation, candid counsel, and lawyers who pick up the phone.</p>
          </div>

          <div className="why-grid">
            <div className="why-card reveal">
              <span className="why-index">01</span>
              <h3>Sector Depth</h3>
              <p>Partners who have spent a career inside a single industry, not generalists borrowing expertise for the engagement.</p>
            </div>
            <div className="why-card reveal">
              <span className="why-index">02</span>
              <h3>Direct Partner Access</h3>
              <p>Every matter is led — not merely supervised — by a partner from the first call to the final signature.</p>
            </div>
            <div className="why-card reveal">
              <span className="why-index">03</span>
              <h3>Transparent Fees</h3>
              <p>Fixed-fee and staged pricing agreed before work begins, with no invoice that surprises a client.</p>
            </div>
            <div className="why-card reveal">
              <span className="why-index">04</span>
              <h3>National Reach</h3>
              <p>Standing counsel relationships across every High Court bench that matters to a growing enterprise.</p>
            </div>
            <div className="why-card reveal">
              <span className="why-index">05</span>
              <h3>Confidential by Default</h3>
              <p>Matter walls and encrypted document rooms as standard practice, not a premium add-on.</p>
            </div>
            <div className="why-card reveal">
              <span className="why-index">06</span>
              <h3>Built for the Long Term</h3>
              <p>Most clients arrive for one matter and stay as retained counsel for the decade that follows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="section practice-areas" id="practice-areas">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Practice Areas</p>
            <h2>Counsel across the full life of a business.</h2>
            <p className="section-lede">From incorporation to exit, and from the boardroom to the bench — eight practices working as one firm.</p>
          </div>

          <div className="practice-grid">
            {['Corporate & Commercial', 'Mergers & Acquisitions', 'Litigation & Disputes', 'Intellectual Property', 'Real Estate & Construction', 'Taxation', 'Employment & Labour', 'Family & Estate Planning'].map((area, i) => (
              <a href="#consultation" className="practice-tab reveal" key={i}>
                <span className="tab-fold" aria-hidden="true"></span>
                <h3>{area}</h3>
                <p>Strategic guidance and representation tailored to your unique requirements.</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* STATS BAND */}
      <section className="stats-band">
        <div className="container">
          <div className="stats-band-head reveal">
            <p className="eyebrow">By the Numbers</p>
            <h2>A record clients can verify.</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card reveal">
              <span className="stat-num"><CounterNumber value={500} suffix="+" /></span>
              <span className="stat-label">Cases Successfully Handled</span>
            </div>
            <div className="stat-card reveal">
              <span className="stat-num"><CounterNumber value={15} suffix="+" /></span>
              <span className="stat-label">Years of Experience</span>
            </div>
            <div className="stat-card reveal">
              <span className="stat-num"><CounterNumber value={95} suffix="%" /></span>
              <span className="stat-label">Client Satisfaction Rate</span>
            </div>
            <div className="stat-card reveal">
              <span className="stat-num"><CounterNumber value={50} suffix="+" /></span>
              <span className="stat-label">Corporate Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section" id="team">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Our Team</p>
              <h2>The partners behind the practice.</h2>
              <p className="section-lede">Eight practices, one bench of partners each recognised individually in their field.</p>
            </div>
            <div className="team-grid" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', width: '100%' }}>
              {[
                { name: 'Pankaj Sinha', slug: 'pankaj-sinha', image: 'pankaj' },
                { name: 'Tariq Adeeb', slug: 'tariq-adeeb', image: 'tariq', backgroundPosition: 'center 10%' },
                { name: 'Garima', slug: 'garima', image: 'garima' },
                { name: 'Humaira', slug: 'humaira', image: 'humaira', backgroundPosition: 'center 20%' },
                { name: 'Kulwinder', slug: 'kulwinder', image: 'kulwinder' }
              ].map((member, i) => (
                <Link to={`/team/${member.slug}`} className="team-card reveal" key={i} style={{ textDecoration: 'none', color: 'inherit', flex: '0 1 220px', minWidth: '200px' }}>
                  <div className="team-photo" style={{ backgroundImage: `url(/team/${member.image}.jpeg)`, backgroundSize: 'cover', backgroundPosition: member.backgroundPosition || 'center', width: '100%', aspectRatio: '1/1', borderRadius: '50%' }}></div>
                  <h3>{member.name}</h3>
                  <p className="team-role">Advocate</p>
                </Link>
              ))}
            </div>
            
            <div className="section-cta reveal" style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link to="/team" className="btn btn-primary">
                View More
              </Link>
            </div>
          </div>
        </section>

      {/* CALL TO ACTION */}
      <section className="section consultation-cta" id="consultation">
        <div className="container" style={{textAlign: 'center'}}>
           <div className="reveal">
              <p className="eyebrow" style={{justifyContent: 'center'}}>Your Legal Matter Deserves Expert Attention</p>
              <h2>Schedule a confidential consultation today.</h2>
              <p className="section-lede" style={{margin: '0 auto 2.5rem'}}>Receive strategic legal guidance from experienced professionals dedicated to protecting your interests.</p>
              <div style={{ marginTop: '4rem', textAlign: 'left' }}>
                <ConsultationWizard />
              </div>
           </div>
        </div>
      </section>
    </>
  );
}
