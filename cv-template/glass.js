window.renderGlass = (DATA, ROOT, STYLE) => {
    // Robust Scoping: specific body class (ONLY for main app)
    if (ROOT.id === 'app-root') {
        document.body.className = 'glass-theme';
    }

    STYLE.innerHTML = `
        body.glass-theme { 
            margin: 0; font-family: 'Outfit', sans-serif; 
            background-color: #030712; 
            color: #f3f4f6; 
            background-image: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%); 
            background-attachment: fixed; min-height: 100vh; padding: 2rem; 
            --bg-color: #030712; --glass-bg: rgba(17, 25, 40, 0.75); --accent: #0ea5e9; --text-main: #f3f4f6; --text-muted: #9ca3af;
        }
        .glass-theme .container { max-width: 1000px; margin: 0 auto; }
        .glass-theme .glass-card { background: rgba(17, 25, 40, 0.75); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.125); border-radius: 20px; padding: 1.2rem; margin-bottom: 1rem; box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37); transition: 0.3s; }
        .glass-theme .glass-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.3); box-shadow: 0 0 20px rgba(14, 165, 233, 0.2); }
        .glass-theme .hero { text-align: center; margin-bottom: 2rem; margin-top: 0.5rem; }
        .glass-theme .profile-glow { width: 140px; height: 140px; border-radius: 50%; margin: 0 auto 1.5rem; padding: 4px; background: linear-gradient(45deg, #0ea5e9, #8b5cf6); box-shadow: 0 0 30px rgba(139,92,246,0.5); }
        .glass-theme h1 { font-family: 'Space Grotesk', sans-serif; font-size: 3rem; margin-bottom: 0.5rem; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
        .glass-theme .role-header { display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; }
        .glass-theme .role-title { font-size: 1.2rem; font-weight: 700; color: white; }
        .glass-theme .company-name { color: #0ea5e9; font-family: 'Space Grotesk'; font-weight: 600; }
        .glass-theme .section-title { font-family: 'Space Grotesk'; font-size: 1.3rem; margin-bottom: 0.7rem; display: flex; gap: 1rem; align-items: center; color: #f3f4f6; font-weight: 700; }
        .glass-theme .section-title span { color: #22d3ee; font-weight: 700; font-size: 1.8rem; }
        .glass-theme .line { flex: 1; height: 1px; background: linear-gradient(to right, #0ea5e9, transparent); }
        .glass-theme .skill-chip { display: inline-block; background: rgba(255,255,255,0.05); padding: 0.3rem 0.6rem; border-radius: 50px; margin: 2px; border: 1px solid rgba(255,255,255,0.1); font-size: 0.8rem; transition: 0.3s; }
        .glass-theme .skill-chip:hover { background: rgba(14, 165, 233, 0.2); border-color: #0ea5e9; }
        .glass-theme ul { padding-left: 1.2rem; line-height: 1.5; } .glass-theme li { margin-bottom: 0.3rem; color: #f3f4f6; }
        
        /* Explicitly force bright colors for this dark theme */
        .glass-theme p, .glass-theme span, .glass-theme div, .glass-theme li, .glass-theme ul, .glass-theme ol { color: #f3f4f6; }

        @media print {
            body.glass-theme { background: white !important; color: black !important; background-image: none !important; }
            .glass-theme .glass-card { 
                background: white !important; 
                color: black !important; 
                backdrop-filter: none !important; 
                box-shadow: none !important; 
                border: 1px solid #ddd !important;
                page-break-inside: avoid;
            }
            .glass-theme h1, .glass-theme h2, .glass-theme h3, .glass-theme h4, .glass-theme span, .glass-theme div { color: black !important; -webkit-text-fill-color: black !important; }
            .glass-theme .profile-glow { box-shadow: none !important; border: 1px solid #ccc; }
            .glass-theme .skill-chip { border: 1px solid #ccc !important; color: black !important; }
        }
    `;

    ROOT.innerHTML = `
        <div class="container">
            <header class="hero" id="profile">
                <div class="profile-glow"><img src="${DATA.profile.profilePic}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;"></div>
                <h1>${DATA.profile.name}</h1>
                <div style="font-family:'Space Grotesk'; color:var(--accent); letter-spacing:2px; text-transform:uppercase;">${DATA.profile.taglines.join(' · ')}</div>
                <p style="max-width:600px; margin: 1.5rem auto; color:var(--text-muted);">
                    <i class="fas fa-map-marker-alt"></i> ${DATA.profile.contact.location} &ensp;|&ensp; 
                    <i class="fas fa-envelope"></i> ${DATA.profile.contact.email} &ensp;|&ensp;
                    <i class="fas fa-phone"></i> ${DATA.profile.contact.phone}
                </p>
            </header>

            <section id="about">
                 <h2 class="section-title"><span>01.</span> About <div class="line"></div></h2>
                 <div class="glass-card" style="line-height: 1.6;">
                    ${DATA.summary.summary.join('<br>')}
                 </div>
            </section>

            <section id="innovation">
                <h2 class="section-title"><span>02.</span> Highlights <div class="line"></div></h2>
                 <div class="glass-card">
                    <h3 style="color:white; margin-bottom:0.6rem; font-size:1.1rem; font-weight:600;">Scope & Impact</h3>
                    <ul>
                         ${DATA.highlights.scope.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                    <h3 style="color:white; margin-bottom:0.6rem; margin-top:1rem; font-size:1.1rem; font-weight:600;">Architecture & Design</h3>
                    <ul>
                         ${DATA.highlights.architecture.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                 </div>
                 
                 <div class="glass-card">
                    <h3 style="color:white; margin-bottom:0.6rem; font-size:1.1rem; font-weight:600;">Key Platforms</h3>
                    <ul style="padding-left: 1.5rem; line-height: 1.5; columns: 2; column-gap: 2rem; color: var(--text-main);">
                        ${DATA.highlights.platforms.map(p => `<li style="margin-bottom: 0.3rem; break-inside: avoid;">${p}</li>`).join('')}
                    </ul>
                 </div>
            </section>

            <section id="skills">
                <h2 class="section-title"><span>03.</span> Arsenal <div class="line"></div></h2>
                <div class="glass-card" style="text-align:center;">
                    ${(() => {
            if (Array.isArray(DATA.skills)) {
                return DATA.skills.map(s => `<span class="skill-chip">${s}</span>`).join('');
            } else {
                let html = '';
                if (DATA.skills.technical && DATA.skills.technical.length > 0) {
                    html += `<div style="margin-bottom:0.6rem;"><h4 style="color:var(--accent); margin-bottom:0.3rem; font-size:1rem; font-weight:600;">Technical Skills</h4><div>${DATA.skills.technical.map(s => `<span class="skill-chip">${s}</span>`).join('')}</div></div>`;
                }
                if (DATA.skills.process && DATA.skills.process.length > 0) {
                    html += `<div><h4 style="color:var(--text-muted); margin-bottom:0.3rem; font-size:1rem; font-weight:600;">Process & Methodology</h4><div>${DATA.skills.process.map(s => `<span class="skill-chip" style="border-color:var(--text-muted); color:var(--text-muted);">${s}</span>`).join('')}</div></div>`;
                }
                return html;
            }
        })()}
                </div>
            </section>
            
            <section id="experience">
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

            <section id="education">
                <h2 class="section-title"><span>04.</span> Education <div class="line"></div></h2>
                <div class="glass-card">
                    ${DATA.education.degrees.map(d => `
                        <div style="margin-bottom: 0.6rem;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.1rem;">
                                <div class="role-title" style="font-size: 1.05rem;">${d.degree}</div>
                                <div style="color:var(--text-muted); font-size: 0.8rem;">${d.year}</div>
                            </div>
                            <div style="color:var(--accent); font-family:'Space Grotesk'; font-size: 0.85rem;">${d.school}</div>
                            <div style="margin-top:0.1rem; color:var(--text-muted); font-size: 0.75rem;">Grade: ${d.grade}</div>
                        </div>
                    `).join('')}
                    
                    <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.4rem; margin-top: 0.2rem;">
                        <h3 style="color:white; margin-bottom:0.2rem; font-size: 0.95rem;">Certifications</h3>
                        <ul style="margin: 0; padding-left: 1.2rem;">
                            ${DATA.education.certifications.map(c => `<li style="margin-bottom: 0.1rem; font-size: 0.8rem;">${c.name} (${c.issuer}) - ${c.year} <span style="color:var(--accent)">[${c.grade}]</span></li>`).join('')}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    `;
};
