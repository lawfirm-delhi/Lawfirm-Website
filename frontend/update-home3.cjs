const fs = require('fs');

let content = fs.readFileSync('C:/lawfirm/frontend/src/pages/Home.jsx', 'utf8');

const startStr = '<section className="section" id="team">';
const endStr = '        {/* CALL TO ACTION */}';
const startIdx = content.indexOf(startStr);
const endIdx = content.indexOf(endStr);

const newTeamSection = `<section className="section" id="team">
          <div className="container">
            <div className="section-head reveal" style={{ textAlign: 'left', marginLeft: 0 }}>
              <p className="eyebrow">Our Team</p>
              <h2>The partners behind the practice.</h2>
              <p className="section-lede">Eight practices, one bench of partners each recognised individually in their field.</p>
            </div>
            <div className="team-grid" style={{ display: 'flex', justifyContent: 'flex-start', gap: '2rem', flexWrap: 'wrap', width: '100%' }}>
              <Link to="/team/pankaj-sinha" className="team-card reveal" style={{ textDecoration: 'none', color: 'inherit', flex: '0 0 calc(25% - 1.5rem)', minWidth: '200px' }}>
                <div className="team-photo" style={{ backgroundImage: 'url(/team/pankaj.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', aspectRatio: '1/1', borderRadius: '50%' }}></div>
                <h3>Pankaj Sinha</h3>
                <p className="team-role">Advocate</p>
              </Link>
              <Link to="/team/tariq-adeeb" className="team-card reveal" style={{ textDecoration: 'none', color: 'inherit', flex: '0 0 calc(25% - 1.5rem)', minWidth: '200px' }}>
                <div className="team-photo" style={{ backgroundImage: 'url(/team/tariq.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', aspectRatio: '1/1', borderRadius: '50%' }}></div>
                <h3>Tariq Adeeb</h3>
                <p className="team-role">Advocate</p>
              </Link>
              <Link to="/team/kulwinder" className="team-card reveal" style={{ textDecoration: 'none', color: 'inherit', flex: '0 0 calc(25% - 1.5rem)', minWidth: '200px' }}>
                <div className="team-photo" style={{ backgroundImage: 'url(/team/kulwinder.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', aspectRatio: '1/1', borderRadius: '50%' }}></div>
                <h3>Kulwinder</h3>
                <p className="team-role">Advocate</p>
              </Link>
              <Link to="/team/garima" className="team-card reveal" style={{ textDecoration: 'none', color: 'inherit', flex: '0 0 calc(25% - 1.5rem)', minWidth: '200px' }}>
                <div className="team-photo" style={{ backgroundImage: 'url(/team/garima.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', aspectRatio: '1/1', borderRadius: '50%' }}></div>
                <h3>Garima</h3>
                <p className="team-role">Advocate</p>
              </Link>
              <Link to="/team/humaira" className="team-card reveal" style={{ textDecoration: 'none', color: 'inherit', flex: '0 0 calc(25% - 1.5rem)', minWidth: '200px' }}>
                <div className="team-photo" style={{ backgroundImage: 'url(/team/humaira.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', aspectRatio: '1/1', borderRadius: '50%' }}></div>
                <h3>Humaira</h3>
                <p className="team-role">Advocate</p>
              </Link>
            </div>
          </div>
        </section>

  
`;

content = content.slice(0, startIdx) + newTeamSection + content.slice(endIdx);
fs.writeFileSync('C:/lawfirm/frontend/src/pages/Home.jsx', content);
