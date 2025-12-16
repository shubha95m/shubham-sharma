window.renderGlass = (DATA, ROOT, STYLE) => {
    STYLE.innerHTML = `
        :root { --bg-color: #030712; --glass-bg: rgba(17, 25, 40, 0.75); --accent: #0ea5e9; --text-main: #f3f4f6; --text-muted: #9ca3af; }
        body { margin: 0; font-family: 'Outfit', sans-serif; background-color: var(--bg-color); color: var(--text-main); 
               background-image: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%); 
               background-attachment: fixed; min-height: 100vh; padding: 2rem; }
        .container { max-width: 1000px; margin: 0 auto; }
        .glass-card { background: var(--glass-bg); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.125); border-radius: 20px; padding: 2.5rem; margin-bottom: 2rem; box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37); transition: 0.3s; }
        .glass-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.3); box-shadow: 0 0 20px rgba(14, 165, 233, 0.2); }
        .hero { text-align: center; margin-bottom: 4rem; margin-top: 2rem; }
        .profile-glow { width: 140px; height: 140px; border-radius: 50%; margin: 0 auto 1.5rem; padding: 4px; background: linear-gradient(45deg, #0ea5e9, #8b5cf6); box-shadow: 0 0 30px rgba(139,92,246,0.5); }
        h1 { font-family: 'Space Grotesk', sans-serif; font-size: 3.5rem; margin-bottom: 0.5rem; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .role-header { display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; }
        .role-title { font-size: 1.4rem; font-weight: 600; color: white; }
        .company-name { color: var(--accent); font-family: 'Space Grotesk'; }
        .section-title { font-family: 'Space Grotesk'; font-size: 2rem; margin-bottom: 2rem; display: flex; gap: 1rem; align-items: center; }
        .section-title span { color: var(--accent); }
        .line { flex: 1; height: 1px; background: linear-gradient(to right, var(--accent), transparent); }
        .skill-chip { display: inline-block; background: rgba(255,255,255,0.05); padding: 0.5rem 1rem; border-radius: 50px; margin: 5px; border: 1px solid rgba(255,255,255,0.1); font-size: 0.9rem; transition: 0.3s; }
        .skill-chip:hover { background: rgba(14, 165, 233, 0.2); border-color: var(--accent); }
        ul { padding-left: 1.2rem; } li { margin-bottom: 0.5rem; color: var(--text-muted); }
        
        @media print {
            body { background: white !important; color: black !important; background-image: none !important; }
            .glass-card { 
                background: white !important; 
                color: black !important; 
                backdrop-filter: none !important; 
                box-shadow: none !important; 
                border: 1px solid #ddd !important;
                page-break-inside: avoid;
            }
            h1, h2, h3, h4, span, div { color: black !important; -webkit-text-fill-color: black !important; }
            .profile-glow { box-shadow: none !important; border: 1px solid #ccc; }
            .skill-chip { border: 1px solid #ccc !important; color: black !important; }
        }
    `;

    ROOT.innerHTML = `
        <div class="container">
            <header class="hero">
                <div class="profile-glow"><img src="${DATA.profile.profilePic}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;"></div>
                <h1>${DATA.profile.name}</h1>
                <div style="font-family:'Space Grotesk'; color:var(--accent); letter-spacing:2px; text-transform:uppercase;">${DATA.profile.taglines.join(' · ')}</div>
                <p style="max-width:600px; margin: 1.5rem auto; color:var(--text-muted);">${DATA.profile.contact.location} · ${DATA.profile.contact.email}</p>
            </header>

            <section>
                 <h2 class="section-title"><span>01.</span> About <div class="line"></div></h2>
                 <div class="glass-card">
                    ${DATA.summary.summary.join('<br><br>')}
                 </div>
            </section>

            <section>
                <h2 class="section-title"><span>02.</span> Highlights <div class="line"></div></h2>
                 <div class="glass-card">
                    <h3 style="color:white; margin-bottom:1rem;">Scope & Impact</h3>
                    <ul>
                         ${DATA.highlights.scope.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                    <br>
                    <h3 style="color:white; margin-bottom:1rem;">Architecture & Design</h3>
                    <ul>
                         ${DATA.highlights.architecture.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                 </div>
                 
                 <div class="glass-card">
                    <h3 style="color:white; margin-bottom:1rem;">Key Platforms</h3>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                        ${DATA.highlights.platforms.map(p => `<div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:8px; font-size:0.9rem;">${p}</div>`).join('')}
                    </div>
                 </div>
            </section>

            <section>
                <h2 class="section-title"><span>03.</span> Arsenal <div class="line"></div></h2>
                <div class="glass-card" style="text-align:center;">
                    ${DATA.skills.map(s => `<span class="skill-chip">${s}</span>`).join('')}
                </div>
            </section>
            
            <section>
                <h2 class="section-title"><span>03.</span> Journey <div class="line"></div></h2>
                ${DATA.journey.map(role => `
                    <div class="glass-card">
                        <div class="role-header">
                            <div>
                                <div class="role-title">${role.role}</div>
                                <div class="company-name">${role.company}</div>
                            </div>
                            <div style="color:var(--text-muted); font-size:0.9rem;">${role.date}</div>
                        </div>
                        <ul>${role.details.map(d => `<li>${d}</li>`).join('')}</ul>
                    </div>
                `).join('')}
            </section>

            <section>
                <h2 class="section-title"><span>04.</span> Education <div class="line"></div></h2>
                ${DATA.education.degrees.map(d => `
                    <div class="glass-card">
                        <div class="role-header">
                            <div class="role-title">${d.degree}</div>
                            <div style="color:var(--text-muted);">${d.year}</div>
                        </div>
                        <div style="color:var(--accent); font-family:'Space Grotesk'">${d.school}</div>
                        <div style="margin-top:0.5rem; color:var(--text-muted)">Grade: ${d.grade}</div>
                    </div>
                `).join('')}
                <div class="glass-card">
                    <h3 style="color:white; margin-bottom:1rem;">Certifications</h3>
                    <ul>
                        ${DATA.education.certifications.map(c => `<li>${c.name} (${c.issuer}) - ${c.year} <span style="color:var(--accent)">[${c.grade}]</span></li>`).join('')}
                    </ul>
                </div>
            </section>
        </div>
    `;
};
