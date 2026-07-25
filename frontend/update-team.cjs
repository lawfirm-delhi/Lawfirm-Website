const fs = require('fs');

const teamMemberPath = 'C:/lawfirm/frontend/src/pages/LandingPages/TeamMember.jsx';
let tmContent = fs.readFileSync(teamMemberPath, 'utf8');

const newTeamData = `const teamData = {
  'pankaj-sinha': {
    name: 'Pankaj Sinha',
    role: 'Advocate',
    email: 'sinhapankaj81@gmail.com',
    phone: '+91-9910247816',
    image: '/team/pankaj.jpeg',
    bio: 'A seasoned legal professional with over 19 years of litigation experience across constitutional, civil, criminal, consumer, service, and human rights matters. Has represented clients before the Supreme Court of India, Delhi High Court, Central Administrative Tribunal (CAT), Consumer Commissions, District & Sessions Courts, and various statutory authorities. Empanelled with the Delhi High Court Legal Services Committee, Government of NCT of Delhi, and Punjab & Sind Bank. Also served as a Guest Faculty at the Faculty of Law, University of Delhi, combining extensive courtroom advocacy with academic and legal research expertise.',
    education: [
      'LL.B. – Campus Law Centre, Faculty of Law, University of Delhi',
      'B.A. (History) – St. Stephen\\'s College, University of Delhi',
      'CBSE (Arts) – J.P.M. Senior Secondary School, New Delhi'
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
      'LL.B. – Campus Law Centre, Faculty of Law, University of Delhi',
      'B.A. (Hons.) Political Science – Indraprastha College for Women, University of Delhi',
      'CBSE Class XII – Rajkiya Pratibha Vikas Vidyalaya, Delhi'
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
      'LL.B. – MJP Rohilkhand University',
      'Post Graduate (Economics) – MJP Rohilkhand University (Specialization: International Trade)'
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
      'LL.B. – Campus Law Centre, Faculty of Law, University of Delhi',
      'M.Com – Dr. Ram Manohar Lohia Avadh University',
      'B.Com – Dr. Ram Manohar Lohia Avadh University'
    ],
    expertise: ['Litigation Support', 'Legal Research & Case Analysis', 'Legal Drafting (Petitions, Appeals & Written Submissions)', 'Civil, Criminal & Consumer Law', 'Client Counselling & Case Strategy'],
    experience: []
  }
};`;

const startData = tmContent.indexOf('const teamData = {');
const endData = tmContent.indexOf('};', startData) + 2;
tmContent = tmContent.slice(0, startData) + newTeamData + tmContent.slice(endData);
fs.writeFileSync(teamMemberPath, tmContent);


const teamPath = 'C:/lawfirm/frontend/src/pages/LandingPages/Team/Team.jsx';
let tContent = fs.readFileSync(teamPath, 'utf8');

const newLawyers = `const lawyers = [
      { 
        id: 'pankaj-sinha', 
        name: 'Pankaj Sinha', 
        designation: 'Advocate', 
        practiceArea: 'Litigation, Civil & Criminal', 
        experience: '19+ Years', 
        education: 'L.L.B Campus Law Centre, New Delhi',
        email: 'sinhapankaj81@gmail.com',
        image: '/team/pankaj.jpeg'
      },
      { 
        id: 'tariq-adeeb', 
        name: 'Tariq Adeeb', 
        designation: 'Advocate', 
        practiceArea: 'Civil, Criminal & Constitutional Law', 
        experience: '20+ Years', 
        education: 'LL.B., Post Graduate (Economics)',
        email: 'contact@justiceassociates.com',
        image: '/team/tariq.jpeg'
      },
      { 
        id: 'kulwinder', 
        name: 'Kulwinder', 
        designation: 'Advocate', 
        practiceArea: 'IT & Legal Expertise', 
        experience: '17+ Years IT, Legal practice', 
        education: 'LL.B.',
        email: 'contact@justiceassociates.com',
        image: '/team/kulwinder.jpeg'
      },
      { 
        id: 'garima', 
        name: 'Garima', 
        designation: 'Advocate', 
        practiceArea: 'Civil, Criminal & Medico-Legal', 
        experience: '2+ Years', 
        education: 'L.L.B Campus Law Centre, Delhi',
        email: 'garima040810@gmail.com',
        image: '/team/garima.jpeg'
      },
      { 
        id: 'humaira', 
        name: 'Humaira', 
        designation: 'Advocate', 
        practiceArea: 'Litigation, NCLT & Consumer', 
        experience: 'Legal practice', 
        education: 'LL.B., M.Com',
        email: 'contact@justiceassociates.com',
        image: '/team/humaira.jpeg'
      }
    ];`;
const startL = tContent.indexOf('const lawyers = [');
const endL = tContent.indexOf('];', startL) + 2;
tContent = tContent.slice(0, startL) + newLawyers + tContent.slice(endL);
fs.writeFileSync(teamPath, tContent);
console.log('done!');
