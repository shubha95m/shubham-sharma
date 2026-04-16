window.renderSplit = (DATA, ROOT, STYLE) => {
    // Robust Scoping: specific body class (ONLY for main app)
    if (ROOT.id === 'app-root') {
        document.body.className = 'split-theme';
    }

    STYLE.innerHTML = `
        body.split-theme { 
            margin: 0 !important; font-family: 'Outfit', sans-serif; background: #ffffff; color: #020617; min-height: 100vh; display: block !important; 
            --sidebar-bg: #0f172a; --content-bg: #ffffff; --text-main: #020617; --text-muted: #1e293b; --accent: #2563eb; --sidebar-text: #ffffff; --border: #cbd5e1;
        }
        .split-theme .sidebar { width: 320px !important; background: #0f172a; color: #ffffff; padding: 2rem 1.5rem; position: fixed !important; left: 0 !important; top: 0 !important; height: 100vh; overflow-y: auto; text-align: center; z-index: 10; box-sizing: border-box; -ms-overflow-style: none; scrollbar-width: none; }
        .split-theme .sidebar::-webkit-scrollbar { display: none; }
        .split-theme .main-content { margin-left: 320px !important; padding: 2rem 5rem; min-height: 100vh; max-width: calc(100vw - 320px) !important; box-sizing: border-box; }
        .split-theme .sidebar h1 { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; margin: 0; color: #ffffff; }
        .split-theme .profile-img { width: 120px !important; height: 120px !important; border-radius: 50%; border: 4px solid rgba(255,255,255,0.1); object-fit: cover; margin-bottom: 1.5rem; display: block; margin-left: auto; margin-right: auto; }
        .split-theme .nav-link { display: block; padding: 0.8rem 0; color: #cbd5e1; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.1); transition: 0.3s; }
        .split-theme .nav-link:hover, .split-theme .nav-link.active { color: #ffffff; padding-left: 10px; font-weight: 500; }
        .split-theme .contact-item { margin-top: 1rem; font-size: 0.9rem; color: #e2e8f0; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .split-theme .section { margin-bottom: 1rem; opacity: 0; animation: fadeIn 0.8s forwards; }
        @keyframes fadeIn { to { opacity: 1; } }
        .split-theme h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; color: #0f172a; border-bottom: 3px solid #2563eb; padding-bottom: 0.4rem; display: block; margin-top: 0; margin-bottom: 0.6rem; font-weight: 700; width: 100%; }
        /* Removed duplicate profile-img rule to avoid conflict */
        .split-theme .timeline-item { border-left: 2px solid #cbd5e1; padding-left: 1.5rem; margin-bottom: 0.8rem; position: relative; }
        .split-theme .timeline-content h3 { margin: 0; font-size: 1.15rem; color: #020617; font-weight: 700; }
        .split-theme .company { color: #2563eb; font-weight: 600; font-family: 'Space Grotesk', sans-serif; }
        .split-theme .date { font-size: 0.95rem; color: #475569; margin-left: 10px; font-weight: 500; }
        .split-theme .skills-grid { display: flex; flex-wrap: wrap; gap: 1rem; }
        .split-theme .skill-card { background: #e2e8f0; padding: 0.8rem; border-radius: 8px; text-align: center; min-width: 100px; flex: 1; border: 1px solid #cbd5e1; margin-bottom: 0.5rem; }
        .split-theme .skill-icon { font-size: 1.5rem; color: #2563eb; margin-bottom: 0.5rem; }
        .split-theme .text-dark { color: #0f172a !important; }
        .split-theme .main-content ul, .split-theme .main-content li, .split-theme .main-content p { color: #0f172a !important; margin-bottom: 0.3rem; }
        .split-theme .pill { display: inline-block; background: #e2e8f0; padding: 0.5rem 1rem; border-radius: 50px; margin: 0.4rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); color: #0f172a; font-size: 0.9rem; font-weight: 500; border: 1px solid #cbd5e1; vertical-align: middle; }
        .split-theme .skill-container { line-height: 2.8; }
        .split-theme .main-content h1, .split-theme .main-content h2, .split-theme .main-content h3, .split-theme .main-content h4, .split-theme .main-content h5, .split-theme .main-content h6 { color: #0f172a; }
        @media (max-width: 900px) { body.split-theme { flex-direction: column; } .split-theme .sidebar { width: 100%; position: relative; height: auto; } .split-theme .main-content { margin-left: 0; padding: 2rem; } }
        
        @media print {
            body.split-theme { display: block; height: auto; overflow: visible; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            /* Force side-by-side layout in print */
            .split-theme .sidebar { 
                position: fixed !important; 
                left: 0 !important; 
                top: 0 !important; 
                width: 320px !important; 
                height: 100vh !important; 
                overflow: visible !important; 
                display: block !important;
                background: #0f172a !important;
                -webkit-print-color-adjust: exact;
            }
            .split-theme .main-content { 
                margin-left: 320px !important; 
                padding: 2rem 3rem !important; 
                max-width: calc(100% - 320px) !important; 
                width: auto !important;
            }
            .split-theme .section { page-break-inside: avoid; opacity: 1; animation: none; }
            .split-theme .timeline-item, .split-theme .card { page-break-inside: avoid; }
            .split-theme a { text-decoration: none; color: inherit; }
            .split-theme .contact-info a { color: black !important; }
            /* Hide unnecessary UI elements */
            .edit-trigger, #control-panel, #template-carousel { display: none !important; }
        }

        /* PDF Export Mode - Clean layout for Puppeteer PDF generation */
        body.split-theme.pdf-export-mode {
            display: flex !important;
            flex-direction: row !important;
            height: auto !important;
            min-height: 100vh !important;
            width: 1400px !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        body.split-theme.pdf-export-mode .sidebar {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 260px !important;
            min-width: 260px !important;
            max-width: 260px !important;
            height: auto !important;
            min-height: 100vh !important;
            overflow: visible !important;
            flex-shrink: 0 !important;
            padding: 1.2rem 0.8rem !important;
            font-size: 0.8rem !important;
        }
        body.split-theme.pdf-export-mode .sidebar h1 {
            font-size: 1.2rem !important;
        }
        body.split-theme.pdf-export-mode .sidebar h5,
        body.split-theme.pdf-export-mode .sidebar h6 {
            font-size: 0.7rem !important;
        }
        body.split-theme.pdf-export-mode .sidebar li,
        body.split-theme.pdf-export-mode .sidebar p,
        body.split-theme.pdf-export-mode .sidebar span {
            font-size: 0.65rem !important;
            line-height: 1.25 !important;
        }
        body.split-theme.pdf-export-mode .sidebar .contact-item {
            font-size: 0.7rem !important;
            margin-top: 0.4rem !important;
        }
        body.split-theme.pdf-export-mode .profile-img {
            width: 80px !important;
            height: 80px !important;
            margin-bottom: 0.8rem !important;
        }
        body.split-theme.pdf-export-mode .main-content {
            flex: 1 !important;
            margin-left: 0 !important;
            padding: 1.2rem 1.5rem !important;
            height: auto !important;
            min-height: 100vh !important;
            overflow: visible !important;
            width: calc(1400px - 260px) !important;
        }
        body.split-theme.pdf-export-mode .main-content h2 {
            font-size: 1.1rem !important;
            margin-bottom: 0.4rem !important;
        }
        body.split-theme.pdf-export-mode .main-content h3 {
            font-size: 0.95rem !important;
        }
        body.split-theme.pdf-export-mode .main-content h4 {
            font-size: 0.9rem !important;
        }
        body.split-theme.pdf-export-mode .main-content p,
        body.split-theme.pdf-export-mode .main-content li {
            font-size: 0.8rem !important;
            line-height: 1.35 !important;
        }
        body.split-theme.pdf-export-mode .section {
            margin-bottom: 0.6rem !important;
            animation: none !important;
            opacity: 1 !important;
        }
        body.split-theme.pdf-export-mode .timeline-item {
            margin-bottom: 0.5rem !important;
            padding-left: 1rem !important;
        }
        body.split-theme.pdf-export-mode #exec-highlights {
            margin-top: 0.5rem !important;
        }
        body.split-theme.pdf-export-mode .edit-trigger,
        body.split-theme.pdf-export-mode #control-panel,
        body.split-theme.pdf-export-mode #template-carousel {
            display: none !important;
        }
    `;

    ROOT.innerHTML = `
        <aside class="sidebar" id="profile">
            <img src="${DATA.profile.profilePic}" class="profile-img">
            <h1>${DATA.profile.name}</h1>
            <p style="opacity: 1; color: #e2e8f0; margin-top: 0.5rem; font-size: 0.95rem;">${DATA.profile.taglines[0]}</p>

            <!-- Divider -->
            <div style="width: 60px; height: 2px; background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%); margin: 1.5rem auto; border-radius: 2px;"></div>

            <nav style="margin: 1rem 0 1.5rem 0; text-align: left;">
                <a href="#about" class="nav-link">About Me</a>
                <a href="#experience" class="nav-link">Experience</a>
                <a href="#education" class="nav-link">Education</a>
            </nav>
            <div class="contact-info">
                <div style="margin-bottom: 1rem; text-align: left; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                    <h5 style="color: #ffffff !important; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 1px;">Career Focus</h5>
                    <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #ffffff !important; line-height: 1.5;">
                        ${DATA.highlights.careerFocus.map(f => `<li style="color: #ffffff !important;">${f}</li>`).join('')}
                    </ul>
                </div>

                <!-- Skills Section (Technical + Process & Methodology) -->
                ${(() => {
            let html = '';
            if (DATA.skills) {
                html += `<div style="margin-bottom: 1rem; text-align: left; background: rgba(255,255,255,0.05); padding: 1.2rem 1rem; border-radius: 8px;">
                                    <h5 style="color: #ffffff !important; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 1rem; letter-spacing: 1px; font-weight: 700;">Skills</h5>`;

                // Technical Skills
                if (DATA.skills.technical && DATA.skills.technical.length > 0) {
                    html += `
                                <div style="margin-bottom: 1rem;">
                                    <div style="display: flex; align-items: center; margin-bottom: 0.6rem;">
                                        <div style="width: 3px; height: 14px; background: #3b82f6; border-radius: 2px; margin-right: 0.5rem;"></div>
                                        <h6 style="color: #93c5fd; font-size: 0.8rem; margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;">Technical</h6>
                                    </div>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; line-height: 1.8;">
                                        ${DATA.skills.technical.map(skill => `
                                            <span style="background: linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(37,99,235,0.2) 100%); color: #ffffff; padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.8rem; border: 1px solid rgba(59,130,246,0.3); font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">${skill}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            `;
                }

                // Process & Methodology
                if (DATA.skills.process && DATA.skills.process.length > 0) {
                    html += `
                                <div>
                                    <div style="display: flex; align-items: center; margin-bottom: 0.6rem;">
                                        <div style="width: 3px; height: 14px; background: #10b981; border-radius: 2px; margin-right: 0.5rem;"></div>
                                        <h6 style="color: #6ee7b7; font-size: 0.8rem; margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;">Process</h6>
                                    </div>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; line-height: 1.8;">
                                        ${DATA.skills.process.map(skill => `
                                            <span style="background: linear-gradient(135deg, rgba(16,185,129,0.22) 0%, rgba(5,150,105,0.18) 100%); color: #ffffff; padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.8rem; border: 1px solid rgba(16,185,129,0.3); font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">${skill}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            `;
                }

                html += `</div>`;
            }
            return html;
        })()}

                <!-- Certifications Section -->
                ${(() => {
            if (DATA.education && DATA.education.certifications && DATA.education.certifications.length > 0) {
                return `
                            <div style="margin-bottom: 1rem; text-align: left; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                                <h5 style="color: #ffffff !important; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.6rem; letter-spacing: 1px;">Certifications</h5>
                                ${DATA.education.certifications.map(cert => `
                                    <div style="margin-bottom: 0.6rem; font-size: 0.8rem; color: #e2e8f0; line-height: 1.4;">
                                        <div style="color: #ffffff; font-weight: 600; margin-bottom: 0.1rem;">${cert.name}</div>
                                        <div style="color: #cbd5e1; font-size: 0.75rem;">${cert.issuer}, ${cert.year}</div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
            }
            return '';
        })()}

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
                <div style="line-height: 1.5; font-size: 1rem;">
                    ${DATA.summary.summary.map(p => `<p style="margin-bottom:0.3rem;">${p}</p>`).join('')}
                </div>
                
                    <div id="exec-highlights" style="margin-top: 0.8rem;">
                    <h3 style="color:#020617; font-family: 'Space Grotesk'; border-left: 4px solid var(--accent); padding-left: 1rem; margin-bottom: 0.3rem; font-size: 1.1rem; font-weight: 600;">Executive Highlights</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <h4 style="color:var(--accent); margin-top: 0; margin-bottom: 0.2rem; font-size: 1rem; font-weight: 600;">Scope & Impact</h4>
                            <ul class="text-dark" style="line-height: 1.4; padding-left: 1rem; font-size: 0.95rem;">
                                ${DATA.highlights.scope.map(i => `<li style="margin-bottom:0.25rem;">${i}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <h4 style="color:var(--accent); margin-top: 0; margin-bottom: 0.2rem; font-size: 1rem; font-weight: 600;">Architecture & Design</h4>
                            <ul class="text-dark" style="line-height: 1.4; padding-left: 1rem; font-size: 0.95rem;">
                                ${DATA.highlights.architecture.map(i => `<li style="margin-bottom:0.25rem;">${i}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
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
                            <ul class="text-dark" style="margin-top: 0.4rem; padding-left: 1.2rem; line-height: 1.4;">
                                ${role.details.map(d => `<li>${d}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </section>

            <section id="innovation" class="section" style="margin-top: 1.2rem;">
                <h2>Key Platforms & Innovation</h2>
                <ul class="text-dark" style="padding-left: 1.5rem; line-height: 1.4; columns: 2; column-gap: 2rem; margin-top: 0.3rem;">
                    ${DATA.highlights.platforms.map(p => `
                        <li style="margin-bottom: 0.25rem; break-inside: avoid;">${p}</li>
                    `).join('')}
                </ul>
            </section>
            <section id="education" class="section">
                <h2>Education</h2>
                ${DATA.education.degrees.map(d => `
                    <div style="padding: 0.6rem 0; border-bottom: 1px solid #e2e8f0;">
                        <strong style="color: #020617;">${d.degree}</strong>
                        <span style="color: #475569; font-size: 0.9rem; font-weight: 500;"> | ${d.school} | ${d.year} | ${d.grade}</span>
                    </div>
                `).join('')}
            </section>
        </main>
    `;
};
