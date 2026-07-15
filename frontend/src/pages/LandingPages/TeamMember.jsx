import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, BookOpen, Award, CheckCircle, Briefcase, Star, Users } from 'lucide-react';
import './TeamMember.css';

const teamData = {
  'pankaj-sinha': {
    name: 'Pankaj Sinha',
    role: 'Advocate, Delhi High Court',
    email: 'sinhapankaj81@gmail.com',
    phone: '+91-9910247816',
    image: '/images/team/pankaj.png',
    bio: 'Pankaj Sinha is a highly experienced Advocate practicing in the Supreme Court of India, Delhi High Court, and Subordinate Courts since 2006. With over 19 years of legal experience, he represents clients in civil and criminal matters, Consumer Forums from District to National level, Central Administrative Tribunal, and cases involving Juveniles in conflict with Law. He also has teaching experience as Guest Faculty Assistant Professor at Law Centre II, Delhi University.',
    education: [
      'L.L.B., Campus Law Centre, New Delhi (2003-2006)',
      'B.A. (History), St. Stephen\'s College, New Delhi (2000-2003)',
      'J.P.M. Senior Secondary School, New Delhi (1988-2000)'
    ],
    expertise: ['Criminal Law', 'Civil Litigation', 'Human Rights', 'Consumer Disputes', 'Administrative Law'],
    experience: [
      'Panel advocate Criminal Law-I in Legal Aid Services of Delhi High Court (2025-2028).',
      'Panel advocate of Punjab & Sind Bank Since May, 2015.',
      'Civil Panel Advocate of Govt. of NCT of Delhi in Delhi High Court since June, 2015.',
      'Legal Consultant with Human Rights Law Network (HRLN) since August 2008 till April, 2015.',
      'Practiced as an Associate under Advocate S C Vashishth, Delhi High Court (2007-2008).',
      'Practiced under Senior Advocate S. K. Rungta, Delhi High Court (2006-2007).'
    ],
    extraCurricular: [
      'Participated as a panelist at the ICON-S 2016 Conference held at Berlin, Germany on "Borders, Otherness and Public Law".',
      'Represented Socio Legal Information Centre (SLIC) in a conference on Access to Justice in Ireland (2014).',
      'Represented International Jurist Organisation in UN Headquarters, NY (2005) & Ottawa (2005).'
    ],
    miscellaneous: [
      'Participating in advocacy initiatives in the disability sector on the Rights of Persons with Disabilities.',
      'Resource person and participant in seminars relating to Human Rights (Women, Dalits, HIV/AIDS).',
      'Edited a book on "Indian Laws for Protecting Children".',
      'Attended Basic Mountaineering and Adventure course ARU Jammu and Kashmir (1999).'
    ]
  },
  'garima': {
    name: 'Garima',
    role: 'Advocate',
    email: 'garima040810@gmail.com',
    phone: '+91 7210067910',
    image: '/images/team/garima.png',
    bio: 'A dedicated and highly motivated legal professional with experience in legal research, drafting, litigation support, and case management. Garima is proficient in handling service matters, criminal cases, and civil litigation. Adept at legal documentation, court procedures, and e-filing, with strong analytical and problem-solving skills.',
    education: [
      'LL.B., Campus Law Centre, Faculty of Law, University of Delhi (2021-2024)',
      'B.A. (Hons.) Political Science, Indraprastha College for Women, University of Delhi (2018-2021)',
      'CBSE (12th Std.), Rajkiya Pratibha Vikas Vidyalaya, Delhi (2017-2018)'
    ],
    expertise: ['Service Matters', 'Criminal Cases', 'Civil Litigation', 'Legal Research'],
    experience: [
      'Medico Legal Associate, Health Rights Associates: Assisting in drafting applications for medical board proceedings, managing end-to-end process of filing applications.',
      'Legal Associate (Advocate Pankaj Sinha): Assisted in handling Service matters, Criminal cases and Civil matters. Provided research support, drafted Writ Petitions and Appeals. Appeared before Delhi High Court and Supreme Court.',
      'Internship at NEEV Foundation for Legal Aid: Filed RTI and Appeals, assisted in legal research and mediation proceedings.'
    ],
    positions: [
      'Member, Enabling Unit, Campus Law Centre (2023)',
      'Member, Legal Aid Society, Campus Law Centre (2021-2024)',
      'Member, Criminal Law Society, Campus Law Centre (2023-2024)',
      'Member, ADR Society Campus Law Centre (2023-2024)',
      'Volunteer in Saksham 2.0 project by Nek Mission Foundation'
    ],
    extraCurricular: [
      'Contributed as a student member at the 3rd International Conference on Artificial Intelligence and International Law at CLC, DU.',
      'Team Leader of a 5 membered team in "Outreach Programme 2023" to dispense legal awareness among slum areas in Delhi with DSLSA.',
      'Student Volunteer, 19th K.K. Luthra Moot Court Competition.',
      'Participated in seminar on "ENVIRONMENTAL JUSTICE" by Project Saksham 3.0 in 2024.'
    ],
    hobbies: ['Photography', 'Designing', 'Baking', 'Badminton']
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
            <div className="profile-photo-large">
              <img 
                src={member.image} 
                alt={member.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
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
