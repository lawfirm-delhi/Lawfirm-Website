import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import ClientLogin from './pages/Auth/ClientLogin';
import ClientRegister from './pages/Auth/ClientRegister';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/AdminPortal/AdminDashboard';
import AdminRoute from './components/AdminRoute';

// Landing Pages
import WhyUs from './pages/LandingPages/WhyUs/WhyUs';
import PracticeAreas from './pages/LandingPages/PracticeAreas/PracticeAreas';
import Team from './pages/LandingPages/Team/Team';
import Services from './pages/LandingPages/Services/Services';
import Testimonials from './pages/LandingPages/Testimonials/Testimonials';
import FAQ from './pages/LandingPages/FAQ/FAQ';
import TeamMember from './pages/LandingPages/TeamMember';
import PrivacyPolicy from './pages/LandingPages/Legal/PrivacyPolicy';
import TermsOfUse from './pages/LandingPages/Legal/TermsOfUse';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErrorBoundary } from './ErrorBoundary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  const { user, logout } = useAuth();
  const [isSolid, setIsSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('English');

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
            <span className="brand-mark" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3V27M6 9L2 17.5C2 20 4.5 21.5 6 21.5C7.5 21.5 10 20 10 17.5L6 9ZM24 9L20 17.5C20 20 22.5 21.5 24 21.5C25.5 21.5 28 20 28 17.5L24 9ZM6 9L15 6L24 9M9 27H21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="brand-text">
              <span className="brand-name">Justice &amp; Associates</span>
              <span className="brand-sub">Advocates &amp; Solicitors</span>
            </span>
          </Link>

          <div className={`nav-menu ${menuOpen ? 'is-open' : ''}`} id="navMenu">
            <div className="nav-links">
              <Link to="/why-us" onClick={() => setMenuOpen(false)}>Why Us</Link>
              <Link to="/practice-areas" onClick={() => setMenuOpen(false)}>Practice Areas</Link>
              <Link to="/team" onClick={() => setMenuOpen(false)}>Our Team</Link>
              <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link to="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link>
              <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>

            </div>
            <div className="mobile-auth-nav">
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? '/admin' : '/'} className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                    Hi, {user.full_name || user.fullName || 'User'}
                  </Link>
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="btn btn-ghost" style={{ color: '#ef4444' }}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Client Login</Link>
                  <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Create Account</Link>
                </>
              )}
            </div>
          </div>

          <div className="nav-actions">
            <div className="desktop-auth-nav">
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? '/admin' : '/'} className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                    Hi, {user.full_name || user.fullName || 'User'}
                  </Link>
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="btn btn-ghost" style={{ color: '#ef4444' }}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Client Login</Link>
                  <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Create Account</Link>
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
              <div className="brand brand-footer">
                <span className="brand-mark" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 30 30" fill="none"><path d="M15 3V27M6 9L2 17.5C2 20 4.5 21.5 6 21.5C7.5 21.5 10 20 10 17.5L6 9ZM24 9L20 17.5C20 20 22.5 21.5 24 21.5C25.5 21.5 28 20 28 17.5L24 9ZM6 9L15 6L24 9M9 27H21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span className="brand-name">Justice &amp; Associates</span>
              </div>
              <p className="footer-tagline">
                {lang === 'English' 
                  ? '"Counsel that stands where the law is tested."' 
                  : '"कानूनी सलाह जो परीक्षण की कसौटी पर खरी उतरती है।"'}
              </p>
              <div className="footer-lang">
                <select aria-label="Select language" value={lang} onChange={handleLangChange}>
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी</option>
                </select>
              </div>
            </div>

            <div className="footer-col">
              <h4>Firm</h4>
              <ul>
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
            <span>© 2026 Justice &amp; Associates. All rights reserved.</span>
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
  const isAuthPage = pathname === '/signin' || pathname === '/signup' || pathname === '/forgot-password';

  return (
    <>
      <ScrollToTop />
      {isAuthPage ? (
        <Routes>
          <Route path="/signin" element={<ClientLogin />} />
          <Route path="/signup" element={<ClientRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      ) : pathname.startsWith('/admin') ? (
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/practice-areas" element={<PracticeAreas />} />
            <Route path="/team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/team/:slug" element={<TeamMember />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
