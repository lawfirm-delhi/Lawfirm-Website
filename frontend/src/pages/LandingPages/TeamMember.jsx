import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, BookOpen, Award, CheckCircle, Briefcase, Star, Users } from 'lucide-react';
import './TeamMember.css';

const teamData = {
  'pankaj-sinha': {
    name: 'Pankaj Sinha',
    role: 'Advocate',
    email: 'sinhapankaj81@gmail.com',
    phone: '+91-9910247816',
    image: '/team/pankaj.jpeg',
    bio: 'A seasoned legal professional with over 19 years of litigation experience across constitutional, civil, criminal, consumer, service, and human rights matters. Has represented clients before the Supreme Court of India, Delhi High Court, Central Administrative Tribunal (CAT), Consumer Commissions, District & Sessions Courts, and various statutory authorities. Empanelled with the Delhi High Court Legal Services Committee, Government of NCT of Delhi, and Punjab & Sind Bank. Also served as a Guest Faculty at the Faculty of Law, University of Delhi, combining extensive courtroom advocacy with academic and legal research expertise.',
    education: [
      'LL.B. � Campus Law Centre, Faculty of Law, University of Delhi',
      'B.A. (History) � St. Stephen\'s College, University of Delhi',
      'CBSE (Arts) � J.P.M. Senior Secondary School, New Delhi'
    ],
    expertise: ['Constitutional, Civil & Criminal Litigation', 'Consumer & Service Law', 'Human Rights & Disability Rights', 'Legal Research & Case Strategy', 'Legal Drafting (Petitions, Appeals, Writs & Written Submissions)', 'Court Advocacy & Client Representation'],
    experience: []
  },
  'garima': {
    name: 'Garima',
    role: 'Advocate',
    email: 'garima040810@gmail.com',
    phone: '+91 7210067910',
    image: '/team/garima.jpeg',
    bio: 'A dedicated legal professional with experience in litigation, legal research, drafting, and case management. Has worked on service, civil, criminal, and medico-legal matters, with practical exposure before the Supreme Court of India, Delhi High Court, Central Administrative Tribunal (CAT), and District Courts. Skilled in drafting petitions, affidavits, appeals, and legal applications, with experience in e-filing, client counselling, and legal documentation.',
    education: [
      'LL.B. � Campus Law Centre, Faculty of Law, University of Delhi',
      'B.A. (Hons.) Political Science � Indraprastha College for Women, University of Delhi',
      'CBSE Class XII � Rajkiya Pratibha Vikas Vidyalaya, Delhi'
    ],
    expertise: ['Litigation Support', 'Legal Research & Case Analysis', 'Legal Drafting (Writ Petitions, Appeals, Affidavits & Applications)', 'Civil, Criminal, Service & Medico-Legal Matters', 'E-Filing & Court Documentation', 'Client Counselling & Case Management'],
    experience: []
  },
  'tariq-adeeb': {
    name: 'Tariq Adeeb',
    role: 'Advocate',
    email: 'contact@justiceassociates.com',
    phone: '',
    image: '/team/tariq.jpeg',
    bio: 'A seasoned legal professional with over 20 years of experience in litigation, legal advisory, and dispute resolution. Specializes in civil, criminal, constitutional, commercial, and regulatory matters, with extensive practice before the Supreme Court of India, High Courts, Tribunals, and other judicial forums. Experienced in legal drafting, arbitration, mediation, project management, and advising government bodies on complex legal and policy issues, with a strong commitment to delivering strategic and client-focused legal solutions.',
    education: [
      'LL.B. � MJP Rohilkhand University',
      'Post Graduate (Economics) � MJP Rohilkhand University (Specialization: International Trade)'
    ],
    expertise: ['Constitutional, Civil & Criminal Litigation', 'Arbitration, Mediation & Conciliation', 'Legal Drafting (Petitions, Contracts & Legal Instruments)', 'Banking, Insolvency & Commercial Laws', 'Intellectual Property & Foreign Exchange Laws', 'Legal Advisory, Policy Review & Case Strategy'],
    experience: []
  },
  'kulwinder': {
    name: 'Kulwinder',
    role: 'Advocate',
    email: 'contact@justiceassociates.com',
    phone: '',
    image: '/team/kulwinder.jpeg',
    bio: 'A dedicated LL.B. graduate and enrolled Advocate with a unique blend of legal and technology expertise, backed by 17 years of experience in IT as a Portfolio/Program Manager. Experienced in legal drafting, litigation support, and court proceedings before the Delhi High Court and District Courts. Combines strong stakeholder management, strategic problem-solving, and legal knowledge to deliver practical, client-focused legal solutions.',
    education: [
      'LL.B.'
    ],
    expertise: ['Litigation Support', 'Legal Drafting (Written Statements, Writ Petitions, Affidavits & Applications)', 'Legal Research & Case Analysis', 'Client Counselling & Case Strategy', 'Court Proceedings & Advocacy', 'Stakeholder & Project Management'],
    experience: []
  },
  'humaira': {
    name: 'Humaira',
    role: 'Advocate',
    email: 'contact@justiceassociates.com',
    phone: '',
    image: '/team/humaira.jpeg',
    bio: 'A dedicated legal professional with experience in litigation, legal research, drafting, and dispute resolution. Has assisted in matters before the Supreme Court, Delhi High Court, NCLT, Consumer Commissions, and District Courts. Skilled in preparing petitions, appeals, written submissions, and case briefs, with a commitment to delivering practical, strategic, and client-focused legal solutions.',
    education: [
      'LL.B. � Campus Law Centre, Faculty of Law, University of Delhi',
      'M.Com � Dr. Ram Manohar Lohia Avadh University',
      'B.Com � Dr. Ram Manohar Lohia Avadh University'
    ],
    expertise: ['Litigation Support', 'Legal Research & Case Analysis', 'Legal Drafting (Petitions, Appeals & Written Submissions)', 'Civil, Criminal & Consumer Law', 'Client Counselling & Case Strategy'],
    experience: []
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
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '50%' }} 
              />
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
              <div className="profile-column">
                <div className="profile-section">
                  <h2><BookOpen size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-gold)' }}/> Education</h2>
                  <ul className="profile-list">
                    {member.education.map((edu, idx) => (
                      <li key={idx}>{edu}</li>
                    ))}
                  </ul>
                </div>
                
                {member.experience && (
                  <div className="profile-section">
                    <h2><Briefcase size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-gold)' }}/> Work Experience</h2>
                    <ul className="profile-list">
                      {member.experience.map((exp, idx) => (
                        <li key={idx}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {member.extraCurricular && (
                  <div className="profile-section">
                    <h2><Award size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-gold)' }}/> Extra-Curricular Activities</h2>
                    <ul className="profile-list">
                      {member.extraCurricular.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="profile-column">
                <div className="profile-section">
                  <h2><CheckCircle size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-gold)' }}/> Practice Areas</h2>
                  <div className="expertise-tags">
                    {member.expertise.map((exp, idx) => (
                      <span key={idx} className="expertise-tag">{exp}</span>
                    ))}
                  </div>
                </div>

                {member.positions && (
                  <div className="profile-section">
                    <h2><Users size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-gold)' }}/> Positions of Responsibility</h2>
                    <ul className="profile-list">
                      {member.positions.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {member.miscellaneous && (
                  <div className="profile-section">
                    <h2><Star size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-gold)' }}/> Miscellaneous</h2>
                    <ul className="profile-list">
                      {member.miscellaneous.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {member.hobbies && (
                  <div className="profile-section">
                    <h2>Hobbies</h2>
                    <div className="expertise-tags">
                      {member.hobbies.map((hobby, idx) => (
                        <span key={idx} className="expertise-tag">{hobby}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
