window.renderClean = (DATA, ROOT, STYLE) => {
    // Robust Scoping: specific body class (ONLY for main app)
    if (ROOT.id === 'app-root') {
        document.body.className = 'clean-theme';
    }

    STYLE.innerHTML = `
        body.clean-theme { 
            background: #f8fafc; 
            color: #0f172a; 
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 1.5rem 0.5rem; 
            margin: 0; 
            line-height: 1.30;
            -webkit-font-smoothing: antialiased;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            --primary: #2563eb;
            --primary-dark: #1d4ed8;
            --text-main: #0f172a;
            --text-muted: #334155;
            --text-sub: #64748b;
            --border: #e2e8f0;
            --card-bg: #f8fafc;
        }

        .clean-theme .clean-cv-container {
            max-width: 860px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .clean-theme .clean-sheet {
            background: #ffffff;
            padding: 22px 30px 16px 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border-radius: 3px;
            box-sizing: border-box;
            min-height: 1120px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .clean-theme .sheet-content {
            flex: 1;
        }

        /* Screen Visual Divider between pages */
        .clean-theme .screen-divider {
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

        /* Clean Modern Header */
        .clean-theme .clean-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 8px;
            margin-bottom: 7px;
            gap: 14px;
        }

        .clean-theme .header-left {
            flex: 1;
        }

        .clean-theme h1.candidate-name {
            font-size: 1.68rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 2px 0;
            line-height: 1.1;
            letter-spacing: -0.02em;
        }

        .clean-theme .tagline {
            color: #2563eb;
            font-weight: 700;
            font-size: 0.84rem;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            margin-bottom: 4px;
        }

        /* Prominent Cloud-Native QE Specialization Badge */
        .clean-theme .clean-spec-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 1px solid #bfdbfe;
            border-radius: 5px;
            padding: 2.5px 8px;
            font-size: 0.69rem;
            color: #1e40af;
            font-weight: 600;
            line-height: 1.25;
            margin-bottom: 5px;
        }
        .clean-theme .clean-spec-badge i {
            color: #2563eb;
            font-size: 0.74rem;
        }
        .clean-theme .clean-spec-badge strong {
            color: #0f172a;
            font-weight: 700;
        }
        .clean-theme .clean-spec-badge .badge-sub {
            color: #3b82f6;
            font-weight: 500;
            font-size: 0.65rem;
        }

        /* Contact Details & Social Links Row */
        .clean-theme .contact-grid {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 6px 12px;
            font-size: 0.72rem;
            color: #334155;
            font-weight: 500;
        }
        .clean-theme .contact-item {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            white-space: nowrap;
        }
        .clean-theme .contact-item i {
            color: #2563eb;
            font-size: 0.74rem;
        }
        .clean-theme .contact-item i.fa-npm {
            color: #cb3837;
            font-size: 0.90rem;
        }
        .clean-theme .contact-item i.fa-linkedin {
            color: #0a66c2;
        }
        .clean-theme .contact-item i.fa-github {
            color: #1f2328;
        }
        .clean-theme .contact-item a {
            color: #0f172a;
            text-decoration: none;
            transition: color 0.15s;
        }
        .clean-theme .contact-item a:hover {
            color: #2563eb;
            text-decoration: underline;
        }

        .clean-theme .header-avatar {
            width: 76px;
            height: 76px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15), 0 0 0 1px #cbd5e1;
            flex-shrink: 0;
        }

        /* Section Styling */
        .clean-theme .clean-sec {
            margin-bottom: 7px;
        }

        .clean-theme .clean-sec-head {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 10px;
            border-bottom: 1.5px solid #e2e8f0;
            padding-bottom: 2px;
            margin: 0 0 5px 0;
            position: relative;
        }
        .clean-theme .clean-sec-head::after {
            content: '';
            position: absolute;
            bottom: -1.5px;
            left: 0;
            width: 45px;
            height: 1.5px;
            background: #2563eb;
        }

        .clean-theme .clean-sec-title {
            font-size: 0.85rem;
            font-weight: 700;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
        }
        .clean-theme .clean-sec-title i {
            color: #2563eb;
            font-size: 0.80rem;
        }
        .clean-theme .clean-sec-tag {
            font-size: 0.66rem;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            white-space: nowrap;
        }

        /* Summary text */
        .clean-theme .summary-p {
            font-size: 0.72rem;
            line-height: 1.32;
            color: #1e293b;
            margin: 0 0 3px 0;
            text-align: justify;
        }
        .clean-theme .summary-p strong,
        .clean-theme .job-bullets strong,
        .clean-theme .exec-list strong {
            color: #0f172a;
            font-weight: 700;
        }

        /* Skills Pill Layout */
        .clean-theme .skills-block {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }
        .clean-theme .skills-row {
            display: flex;
            align-items: baseline;
            gap: 6px;
        }
        .clean-theme .skills-label {
            font-size: 0.69rem;
            font-weight: 700;
            color: #2563eb;
            min-width: 118px;
            max-width: 118px;
            flex-shrink: 0;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        .clean-theme .skills-label.process-label {
            color: #059669;
        }
        .clean-theme .skills-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 3.5px;
            line-height: 1.25;
        }
        .clean-theme .pill {
            display: inline-block;
            background: #eff6ff;
            color: #1e40af;
            padding: 1px 5px;
            border-radius: 4px;
            font-size: 0.66rem;
            font-weight: 500;
            border: 1px solid #bfdbfe;
        }
        .clean-theme .pill.process {
            background: #f0fdf4;
            color: #166534;
            border: 1px solid #bbf7d0;
        }

        /* Clubbed Executive Highlights Grid (Scope & Architecture/Platforms) */
        .clean-theme .exec-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            background: #f8fafc;
            padding: 6px 8px;
            border-radius: 5px;
            border: 1px solid #e2e8f0;
        }
        .clean-theme .exec-col-title {
            font-size: 0.70rem;
            color: #2563eb;
            font-weight: 700;
            margin: 0 0 2.5px 0;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 1.5px;
        }
        .clean-theme .exec-list {
            margin: 0;
            padding-left: 12px;
            font-size: 0.68rem;
            line-height: 1.26;
            color: #1e293b;
        }
        .clean-theme .exec-list li {
            margin-bottom: 2.2px;
        }

        /* Professional Journey / Jobs */
        .clean-theme .job-entry {
            margin-bottom: 5px;
            padding-bottom: 3px;
            border-bottom: 1px dashed #f1f5f9;
        }
        .clean-theme .job-entry:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .clean-theme .job-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 1.5px;
        }
        .clean-theme .job-role {
            font-size: 0.80rem;
            font-weight: 700;
            color: #0f172a;
        }
        .clean-theme .job-company {
            color: #2563eb;
            font-weight: 600;
            font-size: 0.79rem;
            margin-left: 4px;
        }
        .clean-theme .job-date {
            font-size: 0.68rem;
            color: #475569;
            font-weight: 600;
            white-space: nowrap;
        }
        .clean-theme .job-bullets {
            margin: 0;
            padding-left: 14px;
            font-size: 0.68rem;
            line-height: 1.26;
            color: #1e293b;
        }
        .clean-theme .job-bullets li {
            margin-bottom: 2.2px;
        }

        /* Education & Certifications Row */
        .clean-theme .bottom-grid {
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            gap: 14px;
        }
        .clean-theme .edu-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding: 2.5px 0;
            border-bottom: 1px solid #f1f5f9;
            font-size: 0.68rem;
            line-height: 1.28;
        }
        .clean-theme .edu-degree {
            font-weight: 700;
            color: #0f172a;
        }
        .clean-theme .edu-meta {
            color: #475569;
            font-weight: 500;
        }

        .clean-theme .cert-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 4px 7px;
            margin-bottom: 4px;
        }
        .clean-theme .cert-title {
            font-size: 0.69rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.24;
        }
        .clean-theme .cert-meta {
            font-size: 0.64rem;
            color: #2563eb;
            font-weight: 600;
        }
        .clean-theme .cert-sub {
            font-size: 0.61rem;
            color: #64748b;
            line-height: 1.2;
            margin-top: 1px;
        }

        /* Sheet Footer */
        .clean-theme .sheet-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #e2e8f0;
            padding-top: 3px;
            margin-top: 3px;
            font-size: 0.64rem;
            color: #64748b;
            font-style: italic;
        }

        /* STRICT PRINT STYLES - A4 PORTRAIT EXACT 2-SHEET GUARANTEE */
        @media print {
            @page {
                size: A4 portrait;
                margin: 0 !important; /* Suppresses browser native headers & footers */
            }
            html {
                font-size: 9.6px !important;
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
            body.clean-theme {
                padding: 0 !important;
                margin: 0 !important;
                background: #ffffff !important;
            }
            .clean-theme .clean-cv-container {
                max-width: 100% !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                gap: 0 !important;
            }
            .clean-theme .screen-divider {
                display: none !important;
            }
            .clean-theme .clean-sheet {
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
                padding: 6mm 8mm 4mm 8mm !important;
                box-sizing: border-box !important;
                overflow: hidden !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: space-between !important;
            }
            .clean-theme .clean-sheet.page-2 {
                page-break-after: avoid !important;
                break-after: avoid !important;
            }
            .clean-theme .clean-header {
                padding-bottom: 5px !important;
                margin-bottom: 5px !important;
            }
            .clean-theme .header-avatar {
                width: 68px !important;
                height: 68px !important;
            }
            .clean-theme h1.candidate-name {
                font-size: 1.55rem !important;
            }
            .clean-theme .tagline {
                font-size: 0.80rem !important;
                margin-bottom: 3px !important;
            }
            .clean-theme .clean-sec {
                margin-bottom: 5px !important;
            }
            .clean-theme .clean-sec-head {
                margin-bottom: 3px !important;
            }
            .clean-theme .clean-sec-title {
                font-size: 0.82rem !important;
            }
            .clean-theme .summary-p {
                font-size: 0.70rem !important;
                line-height: 1.28 !important;
                margin-bottom: 2.5px !important;
            }
            .clean-theme .skills-row {
                margin-bottom: 1.5px !important;
            }
            .clean-theme .skills-label {
                min-width: 105px !important;
                font-size: 0.67rem !important;
            }
            .clean-theme .pill {
                font-size: 0.63rem !important;
                padding: 1px 4px !important;
            }
            .clean-theme .exec-grid {
                padding: 5px 7px !important;
                gap: 8px !important;
            }
            .clean-theme .exec-col-title {
                font-size: 0.68rem !important;
                margin-bottom: 2px !important;
            }
            .clean-theme .exec-list {
                font-size: 0.67rem !important;
                line-height: 1.25 !important;
            }
            .clean-theme .exec-list li {
                margin-bottom: 1.8px !important;
            }
            .clean-theme .job-entry {
                margin-bottom: 3px !important;
                padding-bottom: 2px !important;
            }
            .clean-theme .job-role {
                font-size: 0.78rem !important;
            }
            .clean-theme .job-company {
                font-size: 0.76rem !important;
            }
            .clean-theme .job-bullets {
                font-size: 0.67rem !important;
                line-height: 1.25 !important;
            }
            .clean-theme .job-bullets li {
                margin-bottom: 1.8px !important;
            }
            .clean-theme a {
                text-decoration: none !important;
                color: inherit !important;
            }
            .edit-trigger, #control-panel, #template-carousel {
                display: none !important;
            }
        }

        /* PDF Export Mode Override */
        body.clean-theme.pdf-export-mode {
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
        }
        body.clean-theme.pdf-export-mode .screen-divider,
        body.clean-theme.pdf-export-mode .edit-trigger,
        body.clean-theme.pdf-export-mode #control-panel,
        body.clean-theme.pdf-export-mode #template-carousel {
            display: none !important;
        }
        body.clean-theme.pdf-export-mode .clean-cv-container {
            max-width: 100% !important;
            gap: 0 !important;
        }
        body.clean-theme.pdf-export-mode .clean-sheet {
            box-shadow: none !important;
            border-radius: 0 !important;
            page-break-after: always !important;
            break-after: page !important;
        }
        body.clean-theme.pdf-export-mode .clean-sheet.page-2 {
            page-break-after: avoid !important;
            break-after: avoid !important;
        }
    `;

    // ATS Metric Highlighter
    const highlightMetrics = (text) => {
        if (!text) return '';
        return text.replace(/(\b\d+(?:\.\d+)?%|\$\d+[Kk]?\+?(?:\/month)?|\b350\+\s*tools\b|\b150\+\s*skills\b|\b350\+\b|\b150\+\b|\b4,000\+\b|\b4K\+\b|\b99\.5%\b|\b9\.7\s*years\b|\b85%\b|\b90%\b|\b65%\b|\b70-80%\b|\b100%\b|\b98%\b|\b95%\b|\b80%\b|\b60%\b|\b55%\b|\b50%\b|\b45%\b|\b40%\b|\b35%\b|\b30%\b|\b25%\b|\b12%\b|\b100\+\b)/g, '<strong>$1</strong>');
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
        <div class="clean-cv-container">
            <!-- ==================== PAGE 1 ==================== -->
            <div class="clean-sheet page-1">
                <div class="sheet-content">
                    <!-- Clean Modern Header -->
                    <header class="clean-header" id="profile">
                        <div class="header-left">
                            <h1 class="candidate-name">${DATA.profile.name}</h1>
                            <div class="tagline">${DATA.profile.taglines.join(' &bull; ')}</div>
                            
                            <!-- Cloud-Native QE Specialization Badge -->
                            <div class="clean-spec-badge">
                                <i class="fas fa-certificate"></i>
                                <span><strong>Cloud-Native Quality Engineering Specialization</strong> &bull; AlphaSense (2024)</span>
                                <span class="badge-sub">&bull; Testkube &bull; Crossplane IaC &bull; SRE Observability</span>
                            </div>

                            <!-- Contact & Social Details -->
                            <div class="contact-grid">
                                <span class="contact-item"><i class="fas fa-map-marker-alt"></i> ${DATA.profile.contact.location}</span>
                                <span class="contact-item"><i class="fas fa-envelope"></i> <a href="mailto:${DATA.profile.contact.email}">${DATA.profile.contact.email}</a></span>
                                <span class="contact-item"><i class="fas fa-phone"></i> <span>${DATA.profile.contact.phone}</span></span>
                                <span class="contact-item"><i class="fab fa-linkedin"></i> <a href="${linkedinUrl}" target="_blank">${linkedinDisplay}</a></span>
                                <span class="contact-item"><i class="fab fa-github"></i> <a href="${githubUrl}" target="_blank">${githubDisplay}</a></span>
                                <span class="contact-item"><i class="fab fa-npm"></i> <a href="${npmUrl}" target="_blank">${npmDisplay}</a></span>
                            </div>
                        </div>

                        <img src="${DATA.profile.profilePic}" class="header-avatar" alt="${DATA.profile.name}">
                    </header>

                    <!-- Professional Summary -->
                    <section class="clean-sec" id="about">
                        <div class="clean-sec-head">
                            <span class="clean-sec-title"><i class="fas fa-user-tie"></i> Professional Summary</span>
                            <span class="clean-sec-tag">Enterprise Cloud-Native QA &bull; 9.7 Years</span>
                        </div>
                        ${DATA.summary.summary.map(p => `<p class="summary-p">${highlightMetrics(p)}</p>`).join('')}
                    </section>

                    <!-- Technical Skills & Competencies -->
                    <section class="clean-sec" id="skills">
                        <div class="clean-sec-head">
                            <span class="clean-sec-title"><i class="fas fa-code"></i> Skills & Technical Competencies</span>
                            <span class="clean-sec-tag">Technologies & Process Methodologies</span>
                        </div>
                        <div class="skills-block">
                            <div class="skills-row">
                                <span class="skills-label">Technical Stack:</span>
                                <div class="skills-pills">
                                    ${(DATA.skills.technical || []).map(skill => `<span class="pill">${skill}</span>`).join('')}
                                </div>
                            </div>
                            <div class="skills-row">
                                <span class="skills-label process-label">Process & Practices:</span>
                                <div class="skills-pills">
                                    ${(DATA.skills.process || []).map(skill => `<span class="pill process">${skill}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Clubbed Executive Highlights & Platform Innovations -->
                    <section class="clean-sec" id="exec-highlights">
                        <div class="clean-sec-head">
                            <span class="clean-sec-title"><i class="fas fa-layer-group"></i> Executive Highlights & Platforms</span>
                            <span class="clean-sec-tag">Scope, Architecture & Engineering Innovation</span>
                        </div>
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

                    <!-- Professional Journey: Staff SDET Role -->
                    <section class="clean-sec" id="experience" style="margin-bottom:0;">
                        <div class="clean-sec-head">
                            <span class="clean-sec-title"><i class="fas fa-briefcase"></i> Professional Journey</span>
                            <span class="clean-sec-tag">Flagship Staff SDET Role</span>
                        </div>

                        ${staffRole ? `
                            <div class="job-entry" style="border-bottom:none; margin-bottom:0; padding-bottom:0;">
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
                    <span>Page 1 of 2 &bull; Continued on Page 2</span>
                </div>
            </div>

            <!-- Screen Visual Divider -->
            <div class="screen-divider">
                <i class="fas fa-chevron-down"></i>
                <span>Page 1 of 2 &bull; Scroll for Page 2</span>
                <i class="fas fa-chevron-down"></i>
            </div>

            <!-- ==================== PAGE 2 ==================== -->
            <div class="clean-sheet page-2">
                <div class="sheet-content">
                    <!-- Professional Journey (No Redundant Continued Header, Starts Directly with Experience) -->
                    <section class="clean-sec" style="margin-bottom: 7px;">
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

                        <!-- QA Automation / Associate QA (Accenture) -->
                        ${accentureRole ? `
                            <div class="job-entry" style="border-bottom:none; margin-bottom:0; padding-bottom:0;">
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

                    <!-- Education & Certifications Row -->
                    <div class="bottom-grid">
                        <!-- Education -->
                        <section class="clean-sec" id="education" style="margin-bottom:0;">
                            <div class="clean-sec-head">
                                <span class="clean-sec-title"><i class="fas fa-graduation-cap"></i> Education</span>
                                <span class="clean-sec-tag">Academic Credentials</span>
                            </div>
                            ${DATA.education.degrees.map(d => `
                                <div class="edu-row">
                                    <span class="edu-degree">${d.degree}</span>
                                    <span class="edu-meta">${d.school} &bull; ${d.year} &bull; ${d.grade}</span>
                                </div>
                            `).join('')}
                        </section>

                        <!-- Certifications & Credentials -->
                        <section class="clean-sec" id="certifications" style="margin-bottom:0;">
                            <div class="clean-sec-head">
                                <span class="clean-sec-title"><i class="fas fa-award"></i> Certifications</span>
                                <span class="clean-sec-tag">Credentials</span>
                            </div>
                            <div class="cert-card">
                                <div class="cert-title">Selenium Professional Certification</div>
                                <div class="cert-meta">VSkills &bull; 2019</div>
                            </div>
                            <div class="cert-card">
                                <div class="cert-title">Cloud-Native Quality Engineering Specialization</div>
                                <div class="cert-meta">AlphaSense &bull; 2024</div>
                                <div class="cert-sub">Testkube &bull; Crossplane IaC &bull; SRE Observability</div>
                            </div>
                        </section>
                    </div>
                </div>

                <div class="sheet-footer">
                    <span>Shubham Sharma &bull; Staff SDET</span>
                    <span>End of Resume &bull; Page 2 of 2</span>
                </div>
            </div>
        </div>
    `;
};
