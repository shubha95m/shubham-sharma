window.renderSplit = (DATA, ROOT, STYLE) => {
    // Robust Scoping: specific body class (ONLY for main app)
    if (ROOT.id === 'app-root') {
        document.body.className = 'split-theme';
    }

    STYLE.innerHTML = `
        body.split-theme { 
            margin: 0 !important; 
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: #f1f5f9; 
            color: #0f172a; 
            min-height: 100vh; 
            display: block !important; 
            padding: 1.5rem 0.5rem;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            --sidebar-bg: #0f172a; 
            --content-bg: #ffffff; 
            --text-main: #0f172a; 
            --text-muted: #334155; 
            --accent: #2563eb; 
            --sidebar-text: #ffffff; 
            --border: #cbd5e1;
        }

        /* Screen Sheet container calibrated strictly to standard paper proportions */
        .split-theme .split-cv-container {
            max-width: 860px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .split-theme .split-sheet {
            background: #ffffff;
            display: flex;
            flex-direction: row;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border-radius: 2px;
            box-sizing: border-box;
            min-height: 1120px;
            overflow: hidden;
        }

        /* Screen Visual Divider between pages */
        .split-theme .screen-divider {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
            color: #64748b;
            font-size: 0.76rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            padding: 0.4rem 0;
            border-top: 1px dashed #cbd5e1;
            border-bottom: 1px dashed #cbd5e1;
        }

        /* Left Dark Sidebar */
        .split-theme .split-sidebar {
            width: 255px;
            min-width: 255px;
            max-width: 255px;
            background: #0f172a;
            color: #ffffff;
            padding: 20px 16px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
        }

        .split-theme .sidebar-profile {
            text-align: center;
            margin-bottom: 10px;
        }

        .split-theme .profile-img {
            width: 84px !important;
            height: 84px !important;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.15);
            object-fit: cover;
            margin: 0 auto 8px auto;
            display: block;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .split-theme .sidebar-h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.35rem;
            margin: 0 0 2px 0;
            color: #ffffff;
            font-weight: 700;
            line-height: 1.15;
            letter-spacing: -0.01em;
        }

        .split-theme .sidebar-tagline {
            color: #93c5fd;
            font-size: 0.82rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 4px;
        }

        .split-theme .sidebar-spec-badge {
            background: linear-gradient(135deg, rgba(37,99,235,0.25) 0%, rgba(30,58,138,0.35) 100%);
            border: 1px solid rgba(59,130,246,0.4);
            border-radius: 4px;
            padding: 3px 6px;
            font-size: 0.67rem;
            color: #bfdbfe;
            line-height: 1.25;
            text-align: center;
            margin-top: 4px;
        }

        .split-theme .sidebar-divider {
            width: 40px;
            height: 2px;
            background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%);
            margin: 8px auto;
            border-radius: 2px;
        }

        .split-theme .contact-box {
            text-align: left;
            margin-bottom: 10px;
            background: rgba(255, 255, 255, 0.04);
            padding: 8px 10px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .split-theme .contact-row {
            font-size: 0.71rem;
            color: #e2e8f0;
            margin-bottom: 3.5px;
            display: flex;
            align-items: center;
            gap: 7px;
            word-break: break-word;
        }
        .split-theme .contact-row i {
            color: #60a5fa;
            width: 12px;
            text-align: center;
            font-size: 0.74rem;
            flex-shrink: 0;
        }
        .split-theme .contact-row a {
            color: #e2e8f0;
            text-decoration: none;
            transition: color 0.2s;
        }
        .split-theme .contact-row a:hover {
            color: #93c5fd;
            text-decoration: underline;
        }

        .split-theme .sidebar-sec-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 0.75rem;
            text-transform: uppercase;
            color: #93c5fd;
            letter-spacing: 0.8px;
            font-weight: 700;
            margin: 9px 0 5px 0;
            padding-bottom: 3px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .split-theme .sidebar-sec-title.emerald {
            color: #6ee7b7;
        }

        .split-theme .sidebar-bullets {
            margin: 0;
            padding-left: 14px;
            font-size: 0.69rem;
            color: #e2e8f0;
            line-height: 1.32;
        }
        .split-theme .sidebar-bullets li {
            margin-bottom: 3.5px;
        }

        .split-theme .skills-cloud {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            line-height: 1.35;
        }
        .split-theme .skill-pill {
            background: rgba(59, 130, 246, 0.18);
            border: 1px solid rgba(59, 130, 246, 0.35);
            color: #ffffff;
            padding: 2px 5.5px;
            border-radius: 4px;
            font-size: 0.66rem;
            font-weight: 500;
        }
        .split-theme .skill-pill.process {
            background: rgba(16, 185, 129, 0.18);
            border: 1px solid rgba(16, 185, 129, 0.35);
        }

        .split-theme .cert-card {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 6px;
            padding: 7px 9px;
            margin-bottom: 7px;
        }
        .split-theme .cert-name {
            font-size: 0.73rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 2px;
            line-height: 1.25;
        }
        .split-theme .cert-meta {
            font-size: 0.66rem;
            color: #94a3b8;
            line-height: 1.25;
        }

        .split-theme .sidebar-footer {
            margin-top: auto;
            padding-top: 6px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.65rem;
            color: #64748b;
            text-align: center;
            font-style: italic;
        }

        /* Right Main Content */
        .split-theme .split-main {
            flex: 1;
            background: #ffffff;
            padding: 18px 22px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .split-theme .main-sec {
            margin-bottom: 10px;
        }

        .split-theme .main-sec-head {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 0.98rem;
            color: #0f172a;
            font-weight: 700;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 2px;
            margin: 0 0 6px 0;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            letter-spacing: -0.01em;
        }
        .split-theme .main-sec-head .sec-tag {
            font-size: 0.67rem;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .split-theme .summary-p {
            font-size: 0.73rem;
            line-height: 1.33;
            color: #1e293b;
            margin: 0 0 4px 0;
            text-align: justify;
        }
        .split-theme .summary-p strong,
        .split-theme .job-bullets strong,
        .split-theme .exec-list strong {
            color: #0f172a;
            font-weight: 700;
        }

        /* Clubbed Executive Highlights Grid */
        .split-theme .exec-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            background: #f8fafc;
            padding: 8px 10px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        .split-theme .exec-col-title {
            font-size: 0.74rem;
            color: #2563eb;
            font-weight: 700;
            margin: 0 0 4px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 2px;
        }
        .split-theme .exec-list {
            margin: 0;
            padding-left: 12px;
            font-size: 0.70rem;
            line-height: 1.28;
            color: #1e293b;
        }
        .split-theme .exec-list li {
            margin-bottom: 3px;
        }

        .split-theme .job-entry {
            margin-bottom: 7px;
        }
        .split-theme .job-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 2px;
        }
        .split-theme .job-role {
            font-size: 0.83rem;
            font-weight: 700;
            color: #0f172a;
        }
        .split-theme .job-company {
            color: #2563eb;
            font-weight: 600;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 0.81rem;
            margin-left: 4px;
        }
        .split-theme .job-date {
            font-size: 0.70rem;
            color: #475569;
            font-weight: 600;
            white-space: nowrap;
        }
        .split-theme .job-bullets {
            margin: 0;
            padding-left: 14px;
            font-size: 0.70rem;
            line-height: 1.27;
            color: #1e293b;
        }
        .split-theme .job-bullets li {
            margin-bottom: 2.8px;
        }

        .split-theme .edu-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding: 3px 0;
            border-bottom: 1px solid #f1f5f9;
            font-size: 0.71rem;
            line-height: 1.3;
        }
        .split-theme .edu-degree {
            font-weight: 700;
            color: #0f172a;
        }
        .split-theme .edu-meta {
            color: #475569;
            font-weight: 500;
        }

        .split-theme .sheet-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #e2e8f0;
            padding-top: 3px;
            margin-top: 3px;
            font-size: 0.65rem;
            color: #64748b;
            font-style: italic;
        }

        /* STRICT PRINT STYLES - A4 PORTRAIT EXACT SPLIT VIEW GUARANTEE */
        @media print {
            @page {
                size: A4 portrait;
                margin: 0 !important; /* Suppresses browser native header (URL/date/title) and footer */
            }
            html {
                font-size: 11.0px !important;
            }
            html, body {
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
                overflow: visible !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            body.split-theme {
                padding: 0 !important;
                margin: 0 !important;
                background: #ffffff !important;
            }
            .split-theme .split-cv-container {
                max-width: 100% !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                gap: 0 !important;
            }
            .split-theme .screen-divider {
                display: none !important;
            }
            .split-theme .split-sheet {
                width: 210mm !important;
                height: 297mm !important;
                max-height: 297mm !important;
                min-height: 297mm !important;
                page-break-after: always !important;
                break-after: page !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                box-sizing: border-box !important;
                overflow: hidden !important;
                display: flex !important;
                flex-direction: row !important;
            }
            .split-theme .split-sheet.page-2 {
                page-break-after: avoid !important;
                break-after: avoid !important;
            }
            .split-theme .split-sidebar {
                background: #0f172a !important;
                width: 66mm !important;
                min-width: 66mm !important;
                max-width: 66mm !important;
                padding: 6.5mm 5mm !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .split-theme .split-main {
                flex: 1 !important;
                width: calc(210mm - 66mm) !important;
                padding: 6mm 7mm !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .split-theme a {
                text-decoration: none !important;
                color: inherit !important;
            }
            .edit-trigger, #control-panel, #template-carousel {
                display: none !important;
            }
        }

        /* PDF Export Mode override */
        body.split-theme.pdf-export-mode {
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
        }
        body.split-theme.pdf-export-mode .screen-divider,
        body.split-theme.pdf-export-mode .edit-trigger,
        body.split-theme.pdf-export-mode #control-panel,
        body.split-theme.pdf-export-mode #template-carousel {
            display: none !important;
        }
        body.split-theme.pdf-export-mode .split-cv-container {
            max-width: 100% !important;
            gap: 0 !important;
        }
        body.split-theme.pdf-export-mode .split-sheet {
            box-shadow: none !important;
            border-radius: 0 !important;
            page-break-after: always !important;
            break-after: page !important;
        }
        body.split-theme.pdf-export-mode .split-sheet.page-2 {
            page-break-after: avoid !important;
            break-after: avoid !important;
        }
    `;

    // ATS Metric Highlighter
    const highlightMetrics = (text) => {
        if (!text) return '';
        return text.replace(/(\b\d+(?:\.\d+)?%|\$\d+[Kk]?\+?(?:\/month)?|\b350\+\s*tools\b|\b150\+\s*skills\b|\b350\+\b|\b150\+\b|\b4,000\+\b|\b4K\+\b|\b99\.5%\b|\b9\.7\s*years\b|\b85%\b|\b90%\b|\b65%\b|\b70-80%\b|\b100%\b|\b98%\b|\b80%\b|\b60%\b|\b55%\b|\b50%\b|\b45%\b|\b40%\b|\b35%\b|\b30%\b|\b25%\b|\b12%\b)/g, '<strong>$1</strong>');
    };

    // Social URLs & Display
    const linkedinObj = DATA.profile.social ? DATA.profile.social.find(s => s.platform.toLowerCase() === 'linkedin') : null;
    const githubObj = DATA.profile.social ? DATA.profile.social.find(s => s.platform.toLowerCase() === 'github') : null;
    const npmObj = DATA.profile.social ? DATA.profile.social.find(s => s.platform.toLowerCase() === 'npm') : null;

    const linkedinUrl = linkedinObj ? linkedinObj.url : 'https://www.linkedin.com/in/shubham-sharma-4a4aaab9';
    const linkedinDisplay = linkedinUrl.replace(/^https?:\/\/(www\.)?/, '');
    const githubUrl = githubObj ? githubObj.url : 'https://github.com/shubha95m';
    const githubDisplay = githubUrl.replace(/^https?:\/\/(www\.)?/, '');
    const npmUrl = npmObj ? npmObj.url : 'https://www.npmjs.com/~shubha20m';
    const npmDisplay = npmUrl.replace(/^https?:\/\/(www\.)?/, '');

    // Journey partitioning: Staff SDET on Page 1; Team Lead, Senior QA, QA, Accenture on Page 2
    const staffRole = DATA.journey && DATA.journey[0] ? DATA.journey[0] : null;
    const leadRole = DATA.journey && DATA.journey[1] ? DATA.journey[1] : null;
    const seniorRole = DATA.journey && DATA.journey[2] ? DATA.journey[2] : null;
    const qaRole = DATA.journey && DATA.journey[3] ? DATA.journey[3] : null;
    const accentureRole = DATA.journey && DATA.journey[4] ? DATA.journey[4] : null;

    ROOT.innerHTML = `
        <div class="split-cv-container">
            <!-- ==================== PAGE 1 ==================== -->
            <div class="split-sheet page-1">
                <!-- PAGE 1 SIDEBAR -->
                <aside class="split-sidebar" id="profile">
                    <div>
                        <div class="sidebar-profile">
                            <img src="${DATA.profile.profilePic}" class="profile-img" alt="${DATA.profile.name}">
                            <h1 class="sidebar-h1">${DATA.profile.name}</h1>
                            <div class="sidebar-tagline">${DATA.profile.taglines[0]}</div>
                            <div class="sidebar-spec-badge">
                                <i class="fas fa-certificate" style="color:#60a5fa; margin-right:3px;"></i> Cloud-Native QE Specialization<br>
                                <span style="opacity:0.85; font-size:0.62rem;">AlphaSense &bull; 2024</span>
                            </div>
                        </div>

                        <div class="sidebar-divider"></div>

                        <!-- Contact Details -->
                        <div class="contact-box">
                            <div class="contact-row"><i class="fas fa-map-marker-alt"></i> <span>${DATA.profile.contact.location}</span></div>
                            <div class="contact-row"><i class="fas fa-envelope"></i> <a href="mailto:${DATA.profile.contact.email}">${DATA.profile.contact.email}</a></div>
                            <div class="contact-row"><i class="fas fa-phone"></i> <span>${DATA.profile.contact.phone}</span></div>
                            <div class="contact-row"><i class="fab fa-linkedin"></i> <a href="${linkedinUrl}" target="_blank">${linkedinDisplay}</a></div>
                            <div class="contact-row"><i class="fab fa-github"></i> <a href="${githubUrl}" target="_blank">${githubDisplay}</a></div>
                            <div class="contact-row"><i class="fab fa-npm"></i> <a href="${npmUrl}" target="_blank">${npmDisplay}</a></div>
                        </div>

                        <!-- Career Focus -->
                        <div class="sidebar-sec-title">
                            <i class="fas fa-bullseye"></i> Career Focus
                        </div>
                        <ul class="sidebar-bullets">
                            ${DATA.highlights.careerFocus.map(f => `<li>${f}</li>`).join('')}
                        </ul>

                        <!-- Technical Skills -->
                        <div class="sidebar-sec-title" id="skills">
                            <i class="fas fa-code"></i> Technical Skills
                        </div>
                        <div class="skills-cloud">
                            ${(DATA.skills.technical || []).map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
                        </div>
                    </div>

                    <div class="sidebar-footer">
                        Page 1 of 2 &bull; Shubham Sharma
                    </div>
                </aside>

                <!-- PAGE 1 MAIN CONTENT -->
                <main class="split-main">
                    <div>
                        <!-- Professional Summary -->
                        <section class="main-sec" id="about">
                            <h2 class="main-sec-head">
                                <span>Professional Summary</span>
                                <span class="sec-tag">Enterprise Cloud-Native QA</span>
                            </h2>
                            ${DATA.summary.summary.map(p => `<p class="summary-p">${highlightMetrics(p)}</p>`).join('')}
                        </section>

                        <!-- Clubbed Executive Highlights & Platform Innovations -->
                        <section class="main-sec" id="exec-highlights">
                            <h2 class="main-sec-head">
                                <span>Executive Highlights</span>
                                <span class="sec-tag">Scope, Architecture & Platforms</span>
                            </h2>
                            <div class="exec-grid">
                                <div>
                                    <div class="exec-col-title">Scope & Enterprise Impact</div>
                                    <ul class="exec-list">
                                        <li>${highlightMetrics("Owned enterprise quality strategy and continuous testing across US & UK regions.")}</li>
                                        <li>${highlightMetrics("Built AI-driven regression platform analyzing 4,000+ test cases via MCP tooling (Grafana, Linear, GitLab) with 85% precision.")}</li>
                                        <li>${highlightMetrics("Created test generation framework using Cursor & Claude AI across polyglot microservices, reducing authoring effort by 80%.")}</li>
                                        <li>${highlightMetrics("Deployed Playwright MCP tooling for rapid test generation, reducing test bootstrap time from days to minutes (90% improvement).")}</li>
                                        <li>${highlightMetrics("Built shared QA platforms consumed org-wide by multiple teams with 99.5% uptime and enterprise reliability.")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <div class="exec-col-title">Architecture & Platform Engineering</div>
                                    <ul class="exec-list">
                                        <li>${highlightMetrics("Architected scalable automation spanning frontend, backend, contract testing, and performance engineering with TDD.")}</li>
                                        <li>${highlightMetrics("Built code-aware test setups aligned with microservices internals, improving failure diagnosis by 60% and flakiness by 50%.")}</li>
                                        <li>${highlightMetrics("Backend E2E generators covering near-complete API surfaces with contract testing, reducing manual effort by 70-80%.")}</li>
                                        <li>${highlightMetrics("Led in-cluster test execution using Kubernetes and Testkube with comprehensive SRE observability and telemetry.")}</li>
                                        <li>${highlightMetrics("Cloud-agnostic execution frameworks using Crossplane and IaC across AWS, Azure, and GCP, reducing cloud costs by 12%.")}</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <!-- Professional Journey: Staff SDET (Full Flagship Leadership) -->
                        <section class="main-sec" id="experience" style="margin-bottom:0;">
                            <h2 class="main-sec-head">
                                <span>Professional Journey</span>
                                <span class="sec-tag">Staff SDET Role</span>
                            </h2>

                            ${staffRole ? `
                                <div class="job-entry" style="margin-bottom:0;">
                                    <div class="job-header">
                                        <div>
                                            <span class="job-role">${staffRole.role}</span>
                                            <span class="job-company">&bull; ${staffRole.company}</span>
                                        </div>
                                        <span class="job-date">${staffRole.date}</span>
                                    </div>
                                    <ul class="job-bullets">
                                        <li>${highlightMetrics(staffRole.details[0])}</li>
                                        <li>${highlightMetrics(staffRole.details[1])}</li>
                                        <li>${highlightMetrics(staffRole.details[2])}</li>
                                        <li>${highlightMetrics(staffRole.details[3])}</li>
                                        <li>${highlightMetrics(staffRole.details[4])}</li>
                                        <li>${highlightMetrics(staffRole.details[5])}</li>
                                    </ul>
                                </div>
                            ` : ''}
                        </section>
                    </div>

                    <div class="sheet-footer">
                        <span>Shubham Sharma &bull; Staff SDET</span>
                        <span>Continued on Page 2 &bull; Experience History</span>
                    </div>
                </main>
            </div>

            <!-- Screen Visual Divider -->
            <div class="screen-divider">
                <i class="fas fa-chevron-down"></i>
                <span>Page 1 of 2 &bull; Scroll for Page 2</span>
                <i class="fas fa-chevron-down"></i>
            </div>

            <!-- ==================== PAGE 2 ==================== -->
            <div class="split-sheet page-2">
                <!-- PAGE 2 SIDEBAR -->
                <aside class="split-sidebar">
                    <div>
                        <!-- Mini Brand Identity -->
                        <div class="sidebar-profile" style="margin-bottom:6px;">
                            <h2 class="sidebar-h1" style="font-size:1.15rem;">${DATA.profile.name}</h2>
                            <div class="sidebar-tagline" style="font-size:0.75rem;">${DATA.profile.taglines[0]} &bull; QA Architect</div>
                        </div>

                        <div class="sidebar-divider" style="margin: 6px auto;"></div>

                        <!-- Process & Methodology Skills -->
                        <div class="sidebar-sec-title emerald">
                            <i class="fas fa-tasks"></i> Process & Methodologies
                        </div>
                        <div class="skills-cloud" style="margin-bottom: 10px;">
                            ${(DATA.skills.process || []).map(skill => `<span class="skill-pill process">${skill}</span>`).join('')}
                        </div>

                        <!-- Certifications -->
                        <div class="sidebar-sec-title">
                            <i class="fas fa-award"></i> Certifications
                        </div>
                        <div class="cert-card">
                            <div class="cert-name">Selenium Professional Certification</div>
                            <div class="cert-meta">VSkills &bull; 2019</div>
                        </div>
                        <div class="cert-card">
                            <div class="cert-name">Cloud-Native Quality Engineering Specialization</div>
                            <div class="cert-meta">AlphaSense &bull; 2024</div>
                            <div style="font-size:0.63rem; color:#cbd5e1; margin-top:2px;">Testkube, Crossplane IaC, SRE Observability</div>
                        </div>

                        <!-- Core Competencies -->
                        <div class="sidebar-sec-title">
                            <i class="fas fa-check-double"></i> Core Competencies
                        </div>
                        <ul class="sidebar-bullets">
                            <li>Autonomous Testing & Agentic MCP Tooling</li>
                            <li>Multi-Cloud Infrastructure (AWS, Azure, GCP)</li>
                            <li>Contract & Microservices API Testing</li>
                            <li>Shift-Left & Test-Driven Development (TDD)</li>
                            <li>SRE Reliability & Test Observability</li>
                        </ul>
                    </div>

                    <!-- Compact Contact & Social in Sidebar Footer -->
                    <div class="contact-box" style="margin-top:auto; margin-bottom:6px;">
                        <div class="contact-row"><i class="fas fa-envelope"></i> <a href="mailto:${DATA.profile.contact.email}">${DATA.profile.contact.email}</a></div>
                        <div class="contact-row"><i class="fas fa-phone"></i> <span>${DATA.profile.contact.phone}</span></div>
                        <div class="contact-row"><i class="fab fa-linkedin"></i> <a href="${linkedinUrl}" target="_blank">linkedin.com/in/shubham-sharma-4a4aaab9</a></div>
                        <div class="contact-row"><i class="fab fa-npm"></i> <a href="${npmUrl}" target="_blank">npmjs.com/~shubha20m</a></div>
                    </div>

                    <div class="sidebar-footer">
                        Page 2 of 2 &bull; Shubham Sharma
                    </div>
                </aside>

                <!-- PAGE 2 MAIN CONTENT -->
                <main class="split-main">
                    <div>
                        <!-- Professional Journey: Team Lead, Senior QA, QA, Accenture -->
                        <section class="main-sec">
                            <!-- Team Lead QA Automation -->
                            ${leadRole ? `
                                <div class="job-entry">
                                    <div class="job-header">
                                        <div>
                                            <span class="job-role">${leadRole.role}</span>
                                            <span class="job-company">&bull; ${leadRole.company}</span>
                                        </div>
                                        <span class="job-date">${leadRole.date}</span>
                                    </div>
                                    <ul class="job-bullets">
                                        <li>${highlightMetrics(leadRole.details[0])}</li>
                                        <li>${highlightMetrics(leadRole.details[1])}</li>
                                        <li>${highlightMetrics(leadRole.details[2])}</li>
                                        <li>${highlightMetrics(leadRole.details[3])}</li>
                                        <li>${highlightMetrics(leadRole.details[4])}</li>
                                        <li>${highlightMetrics(leadRole.details[5])}</li>
                                        <li>${highlightMetrics(leadRole.details[6])}</li>
                                    </ul>
                                </div>
                            ` : ''}

                            <!-- Senior Automation QA -->
                            ${seniorRole ? `
                                <div class="job-entry">
                                    <div class="job-header">
                                        <div>
                                            <span class="job-role">${seniorRole.role}</span>
                                            <span class="job-company">&bull; ${seniorRole.company}</span>
                                        </div>
                                        <span class="job-date">${seniorRole.date}</span>
                                    </div>
                                    <ul class="job-bullets">
                                        <li>${highlightMetrics(seniorRole.details[0])}</li>
                                        <li>${highlightMetrics(seniorRole.details[1])}</li>
                                        <li>${highlightMetrics(seniorRole.details[2])}</li>
                                        <li>${highlightMetrics(seniorRole.details[3])}</li>
                                        <li>${highlightMetrics(seniorRole.details[4])}</li>
                                    </ul>
                                </div>
                            ` : ''}

                            <!-- Automation QA -->
                            ${qaRole ? `
                                <div class="job-entry">
                                    <div class="job-header">
                                        <div>
                                            <span class="job-role">${qaRole.role}</span>
                                            <span class="job-company">&bull; ${qaRole.company}</span>
                                        </div>
                                        <span class="job-date">${qaRole.date}</span>
                                    </div>
                                    <ul class="job-bullets">
                                        <li>${highlightMetrics(qaRole.details[0])}</li>
                                        <li>${highlightMetrics(qaRole.details[1])}</li>
                                        <li>${highlightMetrics(qaRole.details[2])}</li>
                                        <li>${highlightMetrics(qaRole.details[3])}</li>
                                    </ul>
                                </div>
                            ` : ''}

                            <!-- QA Automation / Associate QA -->
                            ${accentureRole ? `
                                <div class="job-entry" style="margin-bottom:0;">
                                    <div class="job-header">
                                        <div>
                                            <span class="job-role">${accentureRole.role}</span>
                                            <span class="job-company">&bull; ${accentureRole.company}</span>
                                        </div>
                                        <span class="job-date">${accentureRole.date}</span>
                                    </div>
                                    <ul class="job-bullets">
                                        <li>${highlightMetrics(accentureRole.details[0])}</li>
                                        <li>${highlightMetrics(accentureRole.details[1])}</li>
                                        <li>${highlightMetrics(accentureRole.details[2])}</li>
                                        <li>${highlightMetrics(accentureRole.details[3])}</li>
                                    </ul>
                                </div>
                            ` : ''}
                        </section>

                        <!-- Education -->
                        <section class="main-sec" id="education" style="margin-bottom:0;">
                            <h2 class="main-sec-head">
                                <span>Education</span>
                                <span class="sec-tag">Academic Credentials</span>
                            </h2>
                            ${DATA.education.degrees.map(d => `
                                <div class="edu-row">
                                    <span class="edu-degree">${d.degree}</span>
                                    <span class="edu-meta">${d.school} &bull; ${d.year} &bull; ${d.grade}</span>
                                </div>
                            `).join('')}
                        </section>
                    </div>

                    <div class="sheet-footer">
                        <span>Shubham Sharma &bull; Staff SDET</span>
                        <span>End of Resume &bull; Page 2 of 2</span>
                    </div>
                </main>
            </div>
        </div>
    `;
};
