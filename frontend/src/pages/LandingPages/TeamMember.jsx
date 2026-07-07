import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import './TeamMember.css';

const teamData = {
  'arjun-mehta': {
    name: 'Arjun Mehta',
    role: 'Managing Partner',
    email: 'arjun.mehta@justiceassociates.example',
    phone: '+91 98765 43210',
    bio: 'Arjun Mehta is the Managing Partner at Justice & Associates, bringing over 20 years of unparalleled expertise in corporate law, mergers and acquisitions, and complex commercial litigation. Recognized consistently as a top-tier litigator, he has successfully represented Fortune 500 companies in high-stakes legal battles across multiple jurisdictions. Arjun\'s strategic vision and dedication to client success form the cornerstone of our firm\'s philosophy.',
    education: ['LL.M., Harvard Law School', 'LL.B., National Law School of India University'],
    expertise: ['Corporate Law', 'Mergers & Acquisitions', 'Commercial Litigation']
  },
  'priya-sharma': {
    name: 'Priya Sharma',
    role: 'Head of Litigation',
    email: 'priya.sharma@justiceassociates.example',
    phone: '+91 98765 43211',
    bio: 'Priya Sharma leads our Litigation practice with a fierce commitment to justice and an exceptional track record in the courtroom. With over 15 years of experience handling civil, criminal, and constitutional matters, she is known for her meticulous preparation and persuasive advocacy. Priya has been instrumental in several landmark Supreme Court judgments and continues to be a formidable force in complex dispute resolution.',
    education: ['LL.M., University of Oxford', 'B.A. LL.B. (Hons.), NALSAR University of Law'],
    expertise: ['Civil Litigation', 'Criminal Defense', 'Constitutional Law']
  },
  'rohan-kapoor': {
    name: 'Rohan Kapoor',
    role: 'Partner, Corporate Practice',
    email: 'rohan.kapoor@justiceassociates.example',
    phone: '+91 98765 43212',
    bio: 'Rohan Kapoor is a Partner in the Corporate Practice group, specializing in private equity, venture capital, and cross-border transactions. He regularly advises startups, established corporations, and investors on complex structuring, compliance, and regulatory frameworks. Rohan\'s pragmatic approach and deep understanding of the business landscape allow him to deliver innovative legal solutions that drive corporate growth.',
    education: ['J.D., Columbia Law School', 'B.Com, Shri Ram College of Commerce'],
    expertise: ['Private Equity', 'Venture Capital', 'Corporate Structuring']
  },
  'ananya-desai': {
    name: 'Ananya Desai',
    role: 'Partner, IP & Technology',
    email: 'ananya.desai@justiceassociates.example',
    phone: '+91 98765 43213',
    bio: 'Ananya Desai heads our Intellectual Property and Technology law division. She is a pioneer in advising tech companies on data privacy, cybersecurity, and patent law. With the rapid evolution of digital landscapes, Ananya provides critical counsel on software licensing, trademark protection, and IP infringement disputes. Her forward-thinking strategies ensure our clients\' innovations are securely protected worldwide.',
    education: ['LL.M. in IP Law, Stanford University', 'LL.B., Government Law College, Mumbai'],
    expertise: ['Intellectual Property', 'Data Privacy', 'Technology Law']
  }
};

export default function TeamMember() {
  const { slug } = useParams();
  const member = teamData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!member) {
    return (
      <div className="team-member-page not-found">
        <div className="container">
          <h2>Profile Not Found</h2>
          <Link to="/" className="btn btn-outline" style={{ marginTop: '1rem' }}>Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="team-member-page">
      <div className="container">
        <Link to="/#team" className="back-link">
          <ArrowLeft size={18} /> Back to Team
        </Link>
        
        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="profile-photo-large">
              {/* Using the same gradient style as the homepage photos */}
            </div>
            <div className="profile-contact">
              <a href={`mailto:${member.email}`} className="contact-item">
                <Mail size={18} />
                {member.email}
              </a>
              <a href={`tel:${member.phone}`} className="contact-item">
                <Phone size={18} />
                {member.phone}
              </a>
              <a href="#" className="contact-item">
                LinkedIn Profile
              </a>
            </div>
          </div>
          
          <div className="profile-content">
            <h1 className="profile-name">{member.name}</h1>
            <p className="profile-role">{member.role}</p>
            
            <div className="profile-section">
              <h2>Biography</h2>
              <p className="profile-bio">{member.bio}</p>
            </div>
            
            <div className="profile-grid">
              <div className="profile-section">
                <h2>Areas of Expertise</h2>
                <ul className="profile-list">
                  {member.expertise.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="profile-section">
                <h2>Education</h2>
                <ul className="profile-list">
                  {member.education.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="profile-cta">
              <h3>Work with {member.name.split(' ')[0]}</h3>
              <p>Schedule a consultation to discuss your legal matters with our expert team.</p>
              <Link to="/consultation" className="btn btn-primary">Book Consultation</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
