import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import './TeamMember.css';

const teamData = {
  'pankaj-sinha': {
    name: 'Pankaj Sinha',
    role: 'Founding Director | Senior Litigation Counsel',
    email: 'sinhapankaj81@gmail.com',
    phone: '+91-9910247816',
    image: '/team/pankaj.jpeg',
    objectPosition: 'center 15%',
    bio: 'Pankaj Sinha is a distinguished litigation lawyer with over 20 years of professional experience, known for his unwavering commitment to justice, human rights, disability rights, and the protection of vulnerable and marginalized sections of society. Throughout his extensive legal career, he has appeared before the Supreme Court of India, Delhi High Court, various High Courts, Tribunals and other judicial forums, handling complex constitutional, civil, criminal, commercial and public-law matters. His professional journey has been marked by a strong advocacy for fundamental rights, dignity, equality, access to justice and the rule of law. His two decades of practice reflect not merely extensive litigation experience but a sustained commitment to using the law as an instrument of social justice, accountability and protection of individual rights with number of Landmark cases in his account.'
  },
  'tariq-adeeb': {
    name: 'Tariq Adeeb',
    role: 'Founding Director | Senior Litigation Counsel',
    email: 'lawfirm.delhi.official@gmail.com',
    phone: '',
    image: '/team/tariq.jpeg',
    objectPosition: 'center 10%',
    bio: 'Tariq Adeeb, is a seasoned litigation lawyer and legal consultant with over 20 years of professional experience, with a practice spanning constitutional, civil, criminal, commercial and public law before the Supreme Court of India, Delhi High Court, various High Courts, Tribunals and other judicial forums. Throughout his career, he has been recognized for his determined advocacy on behalf of deprived, marginalized and vulnerable sections of society, while simultaneously developing substantial expertise in complex commercial disputes, contractual matters, corporate and regulatory issues, and strategic legal advisory. His two decades of practice reflect a distinctive combination of courtroom advocacy, commercial acumen, governmental legal consultancy and rights-based litigation with number of Landmark cases under his umbrella.'
  },
  'garima': {
    name: 'Garima',
    role: 'Associate Litigation Lawyer',
    email: 'garima040810@gmail.com',
    phone: '+91 7210067910',
    image: '/team/garima.jpeg',
    objectPosition: 'center 68%',
    bio: 'She is young dynamic lawyer who bring enthusiasm, diligence and a strong commitment to legal practice. She is actively involved in legal research, drafting pleadings, case preparation, court proceedings, documentation and client coordination, while working closely with senior advocates. Her professionalism, cooperative approach and readiness to assist the team contribute significantly to the smooth and effective functioning of the litigation practice.'
  },
  'humaira': {
    name: 'Humaira Salam',
    role: 'Associate Litigation Lawyer',
    email: 'lawfirm.delhi.official@gmail.com',
    phone: '',
    image: '/team/humaira.jpeg',
    objectPosition: 'center 20%',
    bio: 'She is a young hardworking and result oriented lawyer who form an integral part of the firm’s professional team. She has gained practical exposure to court proceedings, legal research, drafting of pleadings and applications, preparation of case briefs, compilation of records and day-to-day litigation management which demonstrate a keen willingness to learn and develop her advocacy skills while ensuring that matters are prepared with diligence and precision.'
  },
  'kulwinder': {
    name: 'Kulvinder Sehjal',
    role: 'Associate Litigation Lawyer',
    email: 'lawfirm.delhi.official@gmail.com',
    phone: '',
    image: '/team/kulwinder.jpeg',
    objectPosition: 'center 40%',
    bio: 'An enthusiastic member of the legal team with 17 years of IT experience who brings an exceptional hunger to learn, grow and understand every aspect of the legal profession. With an open mind and a strong willingness to take on new responsibilities, she is keen to gain practical exposure to legal research, drafting, court proceedings, case preparation, and client interaction and litigation strategy. Her curiosity, dedication and readiness to learn make her a promising addition to the team, with the potential to develop into a well-rounded and accomplished litigation professional.'
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
        <Link to="/team" className="back-link">
          <ArrowLeft size={18} /> Back to Team
        </Link>
        
        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="profile-photo-large" style={{ overflow: 'hidden' }}>
              <img 
                src={member.image} 
                alt={member.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: member.objectPosition || 'center', borderRadius: '50%' }} 
              />
            </div>
            <div className="profile-contact">
              {member.email && (
                <a href={`mailto:${member.email}`} className="contact-item">
                  <Mail size={18} />
                  {member.email}
                </a>
              )}
              {member.phone && (
                <a href={`tel:${member.phone}`} className="contact-item">
                  <Phone size={18} />
                  {member.phone}
                </a>
              )}
            </div>
          </div>
          
          <div className="profile-content">
            <h1 className="profile-name">{member.name}</h1>
            <p className="profile-role">{member.role}</p>
            
            <div className="profile-section" style={{ marginTop: '2rem' }}>
              <h2>Biography</h2>
              <p className="profile-bio" style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                {member.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
