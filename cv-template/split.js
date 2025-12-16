window.renderSplit = (DATA, ROOT, STYLE) => {
    STYLE.innerHTML = `
        :root { --sidebar-bg: #0f172a; --content-bg: #ffffff; --text-main: #334155; --text-muted: #64748b; --accent: #2563eb; --sidebar-text: #f8fafc; --border: #e2e8f0; }
        body { margin: 0 !important; font-family: 'Outfit', sans-serif; background: var(--content-bg); color: var(--text-main); min-height: 100vh; display: block !important; }
        .sidebar { width: 320px !important; background: var(--sidebar-bg); color: var(--sidebar-text); padding: 3rem 2rem; position: fixed !important; left: 0 !important; top: 0 !important; height: 100vh; overflow-y: auto; text-align: center; z-index: 10; box-sizing: border-box; }
        .main-content { margin-left: 320px !important; padding: 2rem 5rem; min-height: 100vh; max-width: calc(100vw - 320px) !important; box-sizing: border-box; }
        .profile-img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.1); object-fit: cover; margin-bottom: 1.5rem; }
        .sidebar h1 { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; margin: 0; }
        .nav-link { display: block; padding: 0.8rem 0; color: rgba(255,255,255,0.6); text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.05); transition: 0.3s; }
        .nav-link:hover, .nav-link.active { color: white; padding-left: 10px; }
        .contact-item { margin-top: 1rem; font-size: 0.9rem; color: rgba(255,255,255,0.7); display: flex; align-items: center; justify-content: center; gap: 10px; }
        .section { margin-bottom: 2.5rem; opacity: 0; animation: fadeIn 0.8s forwards; }
        @keyframes fadeIn { to { opacity: 1; } }
        h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; color: var(--sidebar-bg); border-bottom: 2px solid var(--accent); padding-bottom: 0.4rem; display: inline-block; margin-bottom: 1.2rem; }
        .timeline-item { border-left: 2px solid var(--border); padding-left: 1.5rem; margin-bottom: 1.8rem; position: relative; }
        .timeline-icon { position: absolute; left: -17px; top: 0; width: 32px; height: 32px; background: var(--accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; box-shadow: 0 0 0 4px white; }
        .timeline-content h3 { margin: 0; font-size: 1.1rem; color: var(--text-main); font-weight: 600; }
        .company { color: var(--accent); font-weight: 600; font-family: 'Space Grotesk', sans-serif; }
        .date { font-size: 0.9rem; color: var(--text-muted); margin-left: 10px; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 1rem; }
        .skill-card { background: #f1f5f9; padding: 1rem; border-radius: 8px; text-align: center; min-width: 100px; flex: 1; }
        .skill-icon { font-size: 1.5rem; color: var(--accent); margin-bottom: 0.5rem; }
        @media (max-width: 900px) { body { flex-direction: column; } .sidebar { width: 100%; position: relative; height: auto; } .main-content { margin-left: 0; padding: 2rem; } }
        
        @media print {
            body { display: block; height: auto; overflow: visible; }
            .sidebar { position: relative; width: 100%; height: auto; overflow: visible; padding: 2rem; }
            .main-content { margin-left: 0; padding: 2rem; max-width: 100%; }
            .section { page-break-inside: avoid; opacity: 1; animation: none; }
            .timeline-item, .card { page-break-inside: avoid; }
            a { text-decoration: none; color: inherit; }
            .contact-info a { color: black !important; }
        }
    `;

    ROOT.innerHTML = `
        <aside class="sidebar" id="profile">
            <img src="${DATA.profile.profilePic}" class="profile-img">
            <h1>${DATA.profile.name}</h1>
            <p style="opacity: 0.8; margin-top: 0.5rem;">${DATA.profile.taglines[0]}</p>
            <nav style="margin: 3rem 0; text-align: left;">
                <a href="#about" class="nav-link">About Me</a>
                <a href="#experience" class="nav-link">Experience</a>
                <a href="#skills" class="nav-link">Skills</a>
                <a href="#education" class="nav-link">Education</a>
            </nav>
            <div class="contact-info">
                 <div style="margin-bottom: 2rem; text-align: left; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                    <h5 style="color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 1px;">Career Focus</h5>
                    <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: rgba(255,255,255,0.8); line-height: 1.5;">
                        ${DATA.highlights.careerFocus.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
                <div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${DATA.profile.contact.location}</div>
                <div class="contact-item"><i class="fas fa-envelope"></i> ${DATA.profile.contact.email}</div>
                <div class="contact-item"><i class="fas fa-phone"></i> ${DATA.profile.contact.phone}</div>
                 <div style="margin-top: 1.5rem; display:flex; gap:15px; justify-content:center;">
                    ${DATA.profile.social.map(s => `<a href="${s.url}" target="_blank" style="color:white; font-size:1.2rem;"><i class="${s.icon}"></i></a>`).join('')}
                </div>
            </div>
        </aside>
        <main class="main-content">
            <section id="about" class="section">
                <h2>Professional Summary</h2>
                <div style="line-height: 1.8; font-size: 1.05rem;">
                    ${DATA.summary.summary.map(p => `<p style="margin-bottom:1rem;">${p}</p>`).join('')}
                </div>
                
                <div id="exec-highlights" style="margin-top: 3rem;">
                    <h3 style="color:var(--text-main); font-family: 'Space Grotesk'; border-left: 4px solid var(--accent); padding-left: 1rem; margin-bottom: 1.5rem;">Executive Highlights</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h4 style="color:var(--accent); margin-bottom: 1rem;">Scope & Impact</h4>
                            <ul style="line-height: 1.6; color: var(--text-muted); padding-left: 1rem; font-size: 0.95rem;">
                                ${DATA.highlights.scope.map(i => `<li style="margin-bottom:0.5rem;">${i}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <h4 style="color:var(--accent); margin-bottom: 1rem;">Architecture & Design</h4>
                            <ul style="line-height: 1.6; color: var(--text-muted); padding-left: 1rem; font-size: 0.95rem;">
                                ${DATA.highlights.architecture.map(i => `<li style="margin-bottom:0.5rem;">${i}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="skills" class="section">
                <h2>Technical Skills</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${DATA.skills.map(s => `
                        <span style="background: #f1f5f9; color: var(--text-main); padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.9rem; border: 1px solid var(--border);">${s}</span>
                    `).join('')}
                </div>
            </section>
            <section id="experience" class="section">
                <h2>Professional Journey</h2>
                ${DATA.journey.map(role => `
                    <div class="timeline-item">
                        <div class="timeline-icon"><i class="fas fa-briefcase"></i></div>
                        <div class="timeline-content">
                            <h3>${role.role}</h3>
                            <span class="company">${role.company}</span> <span class="date">${role.date}</span>
                            <ul style="margin-top: 0.8rem; padding-left: 1.2rem; line-height: 1.6; color: var(--text-muted);">
                                ${role.details.map(d => `<li>${d}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </section>

            <section id="innovation" class="section">
                <h2>Key Platforms & Innovation</h2>
                <ul style="padding-left: 1.5rem; line-height: 1.8; color: var(--text-muted); columns: 2; column-gap: 2rem;">
                    ${DATA.highlights.platforms.map(p => `
                        <li style="margin-bottom: 0.5rem; break-inside: avoid;">${p}</li>
                    `).join('')}
                </ul>
            </section>
            <section id="education" class="section">
                <h2>Education</h2>
                ${DATA.education.degrees.map(d => `
                    <div style="padding: 0.6rem 0; border-bottom: 1px solid var(--border);">
                        <strong style="color: var(--text-main);">${d.degree}</strong> 
                        <span style="color: var(--text-muted); font-size: 0.9rem;"> | ${d.school} | ${d.year} | ${d.grade}</span>
                    </div>
                `).join('')}
                <div style="margin-top: 1rem; padding: 0.8rem; background: #f8fafc; border-radius: 6px; font-size: 0.9rem;">
                    <strong>Certifications:</strong> ${DATA.education.certifications.map(c => `${c.name} (${c.issuer}, ${c.year})`).join(' • ')}
                </div>
            </section>
        </main>
    `;
};
