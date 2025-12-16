window.renderClassic = (DATA, ROOT, STYLE) => {
    STYLE.innerHTML = `
        :root { --accent: #38bdf8; --bg: #0f172a; --card: #1e293b; --text: #f1f5f9; }
        body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; padding: 0; margin: 0; line-height: 1.6; }
        .hero-sec { height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: radial-gradient(circle, rgba(56, 189, 248, .1), transparent 50%); }
        .hero-sec h1 { font-family: 'Space Grotesk'; font-size: 2.5rem; margin: 0; text-transparent: linear-gradient(135deg, white, var(--accent)); background-clip: text; -webkit-background-clip: text; color: transparent; background-image: linear-gradient(135deg, white, var(--accent)); }
        .container { max-width: 900px; margin: 0 auto; padding: 4rem 2rem; }
        .classic-card { background: var(--card); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.05); }
        .sec-title { text-align: center; font-family: 'Space Grotesk'; font-size: 1.6rem; margin-bottom: 1.5rem; color: var(--accent); }
        .timeline-entry { position: relative; border-left: 2px solid #334155; padding-left: 2rem; margin-bottom: 2rem; }
        .timeline-entry::before { content:''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--accent); border-radius: 50%; }
        .skill-tag { color: var(--accent); border: 1px solid var(--accent); padding: 5px 15px; border-radius: 20px; font-size: 0.85rem; margin: 5px; display: inline-block; }
        
        @media print {
            body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            .hero-sec, .classic-card, body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
    `;

    ROOT.innerHTML = `
        <div class="hero-sec" id="profile">
            <img src="${DATA.profile.profilePic}" style="width: 180px; height: 180px; border-radius: 50%; border: 3px solid var(--accent); margin-bottom: 2rem; object-fit: cover; box-shadow: 0 0 40px rgba(56, 189, 248, 0.2);">
            <h1>${DATA.profile.name}</h1>
            <p style="font-size:1.2rem; color:#94a3b8; margin-top:1rem;">${DATA.profile.taglines[0]} · ${DATA.profile.taglines[1]}</p>
            <p style="color:#cbd5e1; margin-top:0.5rem;">
                <i class="fas fa-map-marker-alt"></i> ${DATA.profile.contact.location} &ensp;
                <i class="fas fa-envelope"></i> ${DATA.profile.contact.email} &ensp;
                <i class="fas fa-phone"></i> ${DATA.profile.contact.phone}
            </p>
            <div style="margin-top:2.5rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1rem; max-width:600px; margin-left:auto; margin-right:auto;">
                 <a href="#about" style="padding:12px 20px; border:1px solid var(--accent); color:var(--accent); text-decoration:none; border-radius:8px; text-align:center; transition:0.3s; background:rgba(56,189,248,0.05);" onmouseover="this.style.background='var(--accent)'; this.style.color='var(--bg)';" onmouseout="this.style.background='rgba(56,189,248,0.05)'; this.style.color='var(--accent)';">
                    <i class="fas fa-user-circle"></i> Description
                 </a>
                 <a href="#innovation" style="padding:12px 20px; border:1px solid var(--accent); color:var(--accent); text-decoration:none; border-radius:8px; text-align:center; transition:0.3s; background:rgba(56,189,248,0.05);" onmouseover="this.style.background='var(--accent)'; this.style.color='var(--bg)';" onmouseout="this.style.background='rgba(56,189,248,0.05)'; this.style.color='var(--accent)';">
                    <i class="fas fa-lightbulb"></i> Highlights
                 </a>
                 <a href="#skills" style="padding:12px 20px; border:1px solid var(--accent); color:var(--accent); text-decoration:none; border-radius:8px; text-align:center; transition:0.3s; background:rgba(56,189,248,0.05);" onmouseover="this.style.background='var(--accent)'; this.style.color='var(--bg)';" onmouseout="this.style.background='rgba(56,189,248,0.05)'; this.style.color='var(--accent)';">
                    <i class="fas fa-code"></i> Skills
                 </a>
                 <a href="#experience" style="padding:12px 20px; border:1px solid var(--accent); color:var(--accent); text-decoration:none; border-radius:8px; text-align:center; transition:0.3s; background:rgba(56,189,248,0.05);" onmouseover="this.style.background='var(--accent)'; this.style.color='var(--bg)';" onmouseout="this.style.background='rgba(56,189,248,0.05)'; this.style.color='var(--accent)';">
                    <i class="fas fa-briefcase"></i> Experience
                 </a>
                 <a href="#education" style="padding:12px 20px; border:1px solid var(--accent); color:var(--accent); text-decoration:none; border-radius:8px; text-align:center; transition:0.3s; background:rgba(56,189,248,0.05);" onmouseover="this.style.background='var(--accent)'; this.style.color='var(--bg)';" onmouseout="this.style.background='rgba(56,189,248,0.05)'; this.style.color='var(--accent)';">
                    <i class="fas fa-graduation-cap"></i> Education
                 </a>
            </div>
        </div>
        <div class="container" id="pro">
            <div id="about">
                <h2 class="sec-title">Description</h2>
                <div class="classic-card">
                    ${DATA.summary.summary.map(s => `<p style="margin-bottom:1rem;color:#cbd5e1;">${s}</p>`).join('')}
                </div>
            </div>

            <div id="innovation">
                <h2 class="sec-title">Highlights</h2>
                <div class="classic-card">
                     <h3 style="color:var(--accent); font-family: 'Space Grotesk';">Scope & Architecture</h3>
                     <ul style="color:#cbd5e1; padding-left:1.2rem; margin-bottom:2rem;">
                        ${DATA.highlights.scope.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
                        ${DATA.highlights.architecture.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
                     </ul>
    
                     <h3 style="color:var(--accent); font-family: 'Space Grotesk';">Key Innovation</h3>
                     <ul style="padding-left: 1.5rem; line-height: 1.8; columns: 2; column-gap: 2rem; color: #cbd5e1;">
                        ${DATA.highlights.platforms.map(p => `<li style="margin-bottom: 0.5rem; break-inside: avoid;">${p}</li>`).join('')}
                     </ul>
                </div>
            </div>

            <div id="skills">
                <h2 class="sec-title">Skills</h2>
                <div style="text-align:center;">
                    ${DATA.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
            </div>

            <div id="experience">
                <h2 class="sec-title">Experience</h2>
                <div>
                    ${DATA.journey.map(j => `
                        <div class="timeline-entry">
                            <h3 style="margin:0; font-family:'Space Grotesk'; font-size:1.2rem;">${j.role}</h3>
                            <div style="color:var(--accent); margin-bottom:0.5rem;">${j.company} · ${j.date}</div>
                            <div class="classic-card" style="padding:1.5rem;">
                                <ul style="padding-left:1.2rem; color:#cbd5e1;">${j.details.map(d => `<li>${d}</li>`).join('')}</ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div id="education">
                <h2 class="sec-title">Education</h2>
                <div class="classic-card" style="padding: 1.5rem;">
                    ${DATA.education.degrees.map(d => `
                        <div style="padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <strong style="color: var(--text);">${d.degree}</strong> 
                            <span style="color: #94a3b8; font-size: 0.9rem;"> | ${d.school} | ${d.year} | ${d.grade}</span>
                        </div>
                    `).join('')}
                    ${DATA.education.certifications && DATA.education.certifications.length > 0 ? `
                    <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: var(--accent); font-size: 0.95rem;">Certifications:</strong>
                        <div style="color: #cbd5e1; margin-top: 0.5rem; font-size: 0.9rem;">
                            ${DATA.education.certifications.map(c => `${c.name} (${c.issuer}, ${c.year})`).join(' • ')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};
