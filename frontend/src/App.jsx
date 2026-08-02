import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminPortal/AdminDashboard';
import AdminLogin from './pages/AdminPortal/AdminLogin';
import AdminProfiles from './pages/AdminPortal/AdminProfiles';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Profile from './pages/ClientPortal/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';

// Landing Pages
import AboutUs from './pages/LandingPages/AboutUs/AboutUs';
import WhyUs from './pages/LandingPages/WhyUs/WhyUs';
import PracticeAreas from './pages/LandingPages/PracticeAreas/PracticeAreas';
import Team from './pages/LandingPages/Team/Team';
import Services from './pages/LandingPages/Services/Services';
import Testimonials from './pages/LandingPages/Testimonials/Testimonials';
import FAQ from './pages/LandingPages/FAQ/FAQ';
import TeamMember from './pages/LandingPages/TeamMember';
import PrivacyPolicy from './pages/LandingPages/Legal/PrivacyPolicy';
import TermsOfUse from './pages/LandingPages/Legal/TermsOfUse';

import { ErrorBoundary } from './ErrorBoundary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  const [isSolid, setIsSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('English');
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsSolid(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    // Inject Google Translate script and styles if not present
    if (!document.getElementById('google-translate-script')) {
      const style = document.createElement('style');
      style.innerHTML = `
        #google_translate_element { display: none !important; }
        .skiptranslate { display: none !important; }
        body { top: 0px !important; }
      `;
      document.head.appendChild(style);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({pageLanguage: 'en', autoDisplay: false}, 'google_translate_element');
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }
    
    // Sync state with cookie
    if (document.cookie.includes('googtrans=/en/hi')) {
      setLang('Hindi');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    if (newLang === 'Hindi') {
      document.cookie = 'googtrans=/en/hi; path=/';
      window.location.reload();
    } else {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      window.location.reload();
    }
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className={`site-header ${isSolid ? 'is-solid' : ''}`} id="siteHeader">
        <nav className="nav-bar" aria-label="Primary">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/images/logo.png" alt="NYATI Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            </span>
            <span className="brand-text">
              <span className="brand-name">NYATI</span>
              <span className="brand-sub">Law Chamber</span>
            </span>
          </Link>

          <div className={`nav-menu ${menuOpen ? 'is-open' : ''}`} id="navMenu">
            <div className="nav-links">
              <Link to="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link>
              <Link to="/why-us" onClick={() => setMenuOpen(false)}>Why Us</Link>
              <Link to="/practice-areas" onClick={() => setMenuOpen(false)}>Practice Areas</Link>
              <Link to="/team" onClick={() => setMenuOpen(false)}>Our Team</Link>
              <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link to="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link>
              <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
            </div>
            <div className="mobile-auth-nav">
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} style={{ color: 'var(--primary-gold)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '500', textDecoration: 'none' }}>
                    Welcome, {user.full_name || 'User'}
                  </Link>
                  <button className="btn btn-ghost" onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>

          <div className="nav-actions">
            <div className="desktop-auth-nav">
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <Link to="/profile" style={{ color: 'var(--primary-gold)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: '500', textDecoration: 'none' }}>
                    Welcome, {user.full_name || 'User'}
                  </Link>
                  <button className="btn btn-ghost" onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
            <button className={`nav-toggle ${menuOpen ? 'is-active' : ''}`} aria-expanded={menuOpen} onClick={() => { setMenuOpen(!menuOpen); }} aria-label="Open menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </header>
      
      <main id="main">
        {children}
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand brand-footer" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="brand-mark" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="/images/logo.png" alt="NYATI Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                </span>
                <span className="brand-name">NYATI Law Chamber</span>
              </div>
              <p className="footer-tagline">
                {lang === 'English' 
                  ? '"Counsel that stands where the law is tested."' 
                  : ' न्याय और सत्य की दिशा में आपका साथी।'}
              </p>
              <div className="footer-lang">
                <select aria-label="Select language" value={lang} onChange={handleLangChange}>
                  <option value="English">English</option>
                  <option value="Hindi">हिंदी</option>
                </select>
              </div>
            </div>

            <div className="footer-col">
              <h4>Firm</h4>
              <ul>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/why-us">Why Choose Us</Link></li>
                <li><Link to="/team">Our Team</Link></li>
                <li><Link to="/#insights">Insights</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Practice</h4>
              <ul>
                <li><Link to="/practice-areas">Corporate &amp; Commercial</Link></li>
                <li><Link to="/practice-areas">Litigation &amp; Disputes</Link></li>
                <li><Link to="/practice-areas">Intellectual Property</Link></li>
                <li><Link to="/practice-areas">Real Estate</Link></li>
              </ul>
            </div>

            <div className="footer-col footer-contact">
              <h4>Contact</h4>
              <ul>
                <li>4th Floor, Meridian House<br/>Barakhamba Road, New Delhi</li>
                <li>+91 11 4567 8900</li>
                <li>enquiries@justiceassociates.example</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 NYATI Law Chamber. All rights reserved.</span>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function MainApp() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      {pathname.startsWith('/admin') ? (
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/profiles" element={<AdminProfiles />} />
            <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/practice-areas" element={<PracticeAreas />} />
            <Route path="/team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/team/:slug" element={<TeamMember />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <Toaster position="top-center" />
          <MainApp />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
