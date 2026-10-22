window.renderSingle = (DATA, ROOT, STYLE) => {
    // Robust Scoping: specific body class (ONLY for main app)
    if (ROOT.id === 'app-root') {
        document.body.className = 'single-theme';
    }

    STYLE.innerHTML = `
        body.single-theme { 
            background: #f1f5f9; 
            color: #111111; 
            font-family: 'Times New Roman', Times, Georgia, Cambria, serif; 
            padding: 1.5rem 0.5rem; 
            margin: 0; 
            line-height: 1.28;
            -webkit-font-smoothing: antialiased;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            --primary: #000000;
            --muted: #333333;
            --border: #000000;
        }

        /* Screen Sheet container calibrated strictly to A4 proportions (210mm x 297mm) */
        .single-theme .single-page-wrapper {
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
            padding: 24px 34px 18px 34px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border-radius: 2px;
            box-sizing: border-box;
        }

        /* Two-Column Clean Header */
        .single-theme .header-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 4px;
        }
        .single-theme h1.candidate-name {
            font-size: 1.55rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 2px 0;
            line-height: 1.1;
            letter-spacing: -0.01em;
        }
        .single-theme .tagline {
            font-size: 0.80rem;
            font-weight: 600;
            font-style: italic;
            color: #334155;
            margin-bottom: 2px;
        }
        .single-theme .header-left-links {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            font-size: 0.74rem;
            line-height: 1.34;
            color: #111111;
            margin-top: 2px;
        }
        .single-theme .header-left-links a {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            color: #0f172a;
            text-decoration: underline;
            text-underline-offset: 2px;
        }
        .single-theme .header-left-links a i.fa-linkedin {
            font-size: 0.86rem;
            color: #0a66c2;
        }
        .single-theme .header-left-links a i.fa-github {
            font-size: 0.86rem;
            color: #1f2328;
        }
        .single-theme .header-left-links a i.fa-npm {
            font-size: 0.95rem;
            color: #cb3837;
        }
        .single-theme .header-left-links .social-sep {
            color: #94a3b8;
            font-size: 0.65rem;
        }
        .single-theme .header-right-contact a {
            color: #0f172a;
            text-decoration: underline;
            text-underline-offset: 2px;
        }
        .single-theme .header-right-contact {
            text-align: right;
            font-size: 0.74rem;
            line-height: 1.34;
            color: #334155;
        }

        /* Section Dividers with crisp Oxford Navy rule */
        .single-theme h2.sec-title {
            font-size: 0.84rem;
            font-weight: 700;
            text-transform: none;
            color: #1e3a8a;
            border-bottom: 1.2px solid #1e3a8a;
            padding-bottom: 1.5px;
            margin-top: 4.5px;
            margin-bottom: 2.5px;
            letter-spacing: 0.01em;
        }

        /* Skills Summary List */
        .single-theme ul.skills-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .single-theme ul.skills-list li {
            font-size: 0.72rem;
            line-height: 1.25;
            color: #1e293b;
            margin-bottom: 1.2px;
            text-align: justify;
        }
        .single-theme ul.skills-list li strong {
            font-weight: 700;
            color: #1e3a8a;
        }

        /* Items (Experience, Projects, Education) */
        .single-theme .item-entry {
            margin-bottom: 2.5px;
        }
        .single-theme .item-row-1 {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 0.76rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.24;
        }
        .single-theme .company-name {
            color: #1e40af;
            font-weight: 700;
        }
        .single-theme .item-row-1 .right-text {
            font-weight: 600;
            color: #64748b;
            text-align: right;
        }
        .single-theme .item-row-2 {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 0.73rem;
            line-height: 1.24;
            margin-bottom: 1px;
        }
        .single-theme .item-row-2 .left-role {
            font-weight: 600;
            font-style: italic;
            color: #0369a1;
        }
        .single-theme .item-row-2 .right-date {
            font-style: italic;
            color: #475569;
            font-weight: 600;
            text-align: right;
        }

        /* Bullet Points */
        .single-theme ul.bullets {
            margin: 0;
            padding-left: 17px;
            list-style-type: circle;
        }
        .single-theme ul.bullets li {
            font-size: 0.71rem;
            line-height: 1.23;
            color: #111111;
            margin-bottom: 1px;
            text-align: justify;
        }
        .single-theme ul.bullets li strong {
            font-weight: 700;
            color: #000000;
        }

        /* Education & Certifications */
        .single-theme .edu-entry {
            margin-bottom: 2px;
        }

        /* Running Footer */
        .single-theme .cv-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 0.5px solid #cccccc;
            padding-top: 2px;
            margin-top: 3px;
            font-size: 0.65rem;
            color: #555555;
            font-style: italic;
        }

        /* STRICT PRINT STYLES - A4 ZERO CUTOFF GUARANTEE & SUPPRESS BROWSER HEADERS */
        @media print {
            @page {
                size: A4 portrait;
                margin: 0 !important; /* Suppresses browser native header (date/title) and footer (URL) */
            }
            html {
                font-size: 12.6px !important;
            }
            html, body {
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
                overflow: visible !important;
            }
            body.single-theme {
                padding: 0 !important;
                margin: 0 !important;
                background: #ffffff !important;
            }
            .single-theme .single-page-wrapper {
                box-sizing: border-box !important;
                box-shadow: none !important;
                border: none !important;
                padding: 9mm 14mm 8mm 14mm !important;
                margin: 0 auto !important;
                width: 100% !important;
                max-width: 100% !important;
                page-break-after: avoid !important;
                break-after: avoid !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
            }
            .edit-trigger, #control-panel, #template-carousel {
                display: none !important;
            }
        }
    `;

    const highlightMetrics = (text) => {
        return text.replace(/(\b\d+(?:\.\d+)?%|\$\d+[Kk]?\+?(?:\/month)?|\b350\+\s*tools\b|\b150\+\s*skills\b|\b350\+\b|\b150\+\b|\b4K\+\b|\b99\.5%\b|\b9\.3\+?\s*years\b|\b85%\b|\b90%\b|\b65%\b|\b70-80%\b|\b100%\b|\b98%\b|\b80%\b|\b60%\b|\b50%\b|\b45%\b|\b40%\b|\b35%\b|\b30%\b|\b25%\b)/g, '<strong>$1</strong>');
    };

    const linkedinObj = DATA.profile.social ? DATA.profile.social.find(s => s.platform.toLowerCase() === 'linkedin') : null;
    const githubObj = DATA.profile.social ? DATA.profile.social.find(s => s.platform.toLowerCase() === 'github') : null;
    const npmObj = DATA.profile.social ? DATA.profile.social.find(s => s.platform.toLowerCase() === 'npm') : null;

    const linkedinUrl = linkedinObj ? linkedinObj.url : 'https://www.linkedin.com/in/shubham-sharma-4a4aaab9';
    const linkedinDisplay = linkedinUrl.replace(/^https?:\/\/(www\.)?/, '');
    const githubUrl = githubObj ? githubObj.url : 'https://github.com/shubha95m';
    const githubDisplay = githubUrl.replace(/^https?:\/\/(www\.)?/, '');
    const npmUrl = npmObj ? npmObj.url : 'https://www.npmjs.com/~shubha20m';

    ROOT.innerHTML = `
        <div class="single-page-wrapper">
            <!-- Two-Column Clean Header -->
            <header class="header-container" id="profile">
                <div>
                    <h1 class="candidate-name">${DATA.profile.name}</h1>
                    <div class="tagline">${DATA.profile.taglines.join(' &bull; ')}</div>
                    <div class="header-left-links">
                        <a href="${linkedinUrl}" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i> <span>LinkedIn</span></a>
                        <span class="social-sep">&bull;</span>
                        <a href="${githubUrl}" target="_blank" rel="noopener"><i class="fab fa-github"></i> <span>GitHub</span></a>
                        <span class="social-sep">&bull;</span>
                        <a href="${npmUrl}" target="_blank" rel="noopener"><i class="fab fa-npm"></i> <span>npm</span></a>
                    </div>
                </div>
                <div class="header-right-contact">
                    <div>Email: <a href="mailto:${DATA.profile.contact.email}">${DATA.profile.contact.email}</a></div>
                    <div>Mobile: ${DATA.profile.contact.phone}</div>
                    <div>Location: ${DATA.profile.contact.location}</div>
                </div>
            </header>

            <!-- Skills Summary -->
            <section id="skills">
                <h2 class="sec-title">Skills Summary</h2>
                <ul class="skills-list">
                    <li>&bull; <strong>Test Automation & Frameworks :</strong> Playwright, Selenium, Cypress, RestAssured, K6, Testkube, Selenoid, Allure, ReportPortal, Contract Testing, API Testing</li>
                    <li>&bull; <strong>Languages & Stacks :</strong> Java, Kotlin, JavaScript, Python, Node.js, Spring Boot, GraphQL, Microservices</li>
                    <li>&bull; <strong>Cloud, DevOps & SRE :</strong> AWS, Azure, GCP, Docker, Kubernetes, Crossplane, Jenkins CI/CD, Git, Linux, Infrastructure as Code, Test Observability</li>
                    <li>&bull; <strong>Quality Architecture & Practices :</strong> Autonomous Self-Healing, Shift-Left Testing, TDD, Agile/Scrum, CI/CD Quality Gates, Release Management</li>
                </ul>
            </section>

            <!-- Work Experience -->
            <section id="experience">
                <h2 class="sec-title">Work Experience</h2>

                <!-- Role 1 -->
                <div class="item-entry">
                    <div class="item-row-1">
                        <span>&bull; <span class="company-name">AlphaSense</span> — Software Quality & Platform Engineering</span>
                        <span class="right-text">Pune, India</span>
                    </div>
                    <div class="item-row-2">
                        <span class="left-role">Staff SDET</span>
                        <span class="right-date">March 2025 – Present</span>
                    </div>
                    <ul class="bullets">
                        <li>${highlightMetrics("Architected enterprise QA Platform MCP consolidating daily-driver MCP servers (GitLab, Linear, Slack, Allure, Testkube), exposing 350+ tools and 150+ skills for autonomous test execution.")}</li>
                        <li>${highlightMetrics("Engineered scheduled Self-Healing pipeline auto-recovering failing tests, raising GitLab MRs, and requesting Slack review for 100% robust test coverage.")}</li>
                        <li>${highlightMetrics("Built AI-driven Auto-Review bots & CI/CD troubleshooting agents analyzing hard-gate failures with test history and service health to trigger auto-healing.")}</li>
                    </ul>
                </div>

                <!-- Role 2 -->
                <div class="item-entry">
                    <div class="item-row-1">
                        <span>&bull; <span class="company-name">AlphaSense</span> — Cloud Infrastructure & Test Automation</span>
                        <span class="right-text">Pune, India</span>
                    </div>
                    <div class="item-row-2">
                        <span class="left-role">Team Lead – QA Automation</span>
                        <span class="right-date">Oct 2023 – March 2025</span>
                    </div>
                    <ul class="bullets">
                        <li>${highlightMetrics("Automated manual operational workflows using Slack automation, reducing response times by 65% and improving operational efficiency.")}</li>
                        <li>${highlightMetrics("Integrated cloud resources using Crossplane across AWS, Azure, and GCP with 99.5% uptime; optimized cloud costs via IaC saving $1K+/month.")}</li>
                        <li>${highlightMetrics("Implemented Testkube in-cluster testing and Jenkins continuous validation gates, shifting defects left and reducing late failures by 45%.")}</li>
                    </ul>
                </div>

                <!-- Role 3 -->
                <div class="item-entry">
                    <div class="item-row-1">
                        <span>&bull; <span class="company-name">AlphaSense</span> — Framework Scalability & Core Automation</span>
                        <span class="right-text">Pune, India</span>
                    </div>
                    <div class="item-row-2">
                        <span class="left-role">Senior Automation QA & Automation QA</span>
                        <span class="right-date">Mar 2020 – Sept 2023</span>
                    </div>
                    <ul class="bullets">
                        <li>${highlightMetrics("Led team of 3 QA engineers; built scalable frameworks using Java, JS, Cypress, K6, and RestAssured with shift-left testing practices.")}</li>
                        <li>${highlightMetrics("Automated GraphQL APIs, SQS pipelines, and maintained 4K+ regression suites with Allure, ReportPortal, and Selenoid Grid scalability.")}</li>
                    </ul>
                </div>

                <!-- Role 4 -->
                <div class="item-entry">
                    <div class="item-row-1">
                        <span>&bull; <span class="company-name">Accenture</span> — Enterprise Quality Engineering</span>
                        <span class="right-text">Pune, India</span>
                    </div>
                    <div class="item-row-2">
                        <span class="left-role">QA Automation / Associate QA</span>
                        <span class="right-date">Jan 2017 – Mar 2020</span>
                    </div>
                    <ul class="bullets">
                        <li>${highlightMetrics("Automated 100+ healthcare enterprise web applications under strict compliance, achieving a 98% defect detection rate across complete SDLC.")}</li>
                    </ul>
                </div>
            </section>

            <!-- Projects and Technical Systems -->
            <section id="innovation">
                <h2 class="sec-title">Projects and Technical Systems</h2>

                <div class="item-entry">
                    <div class="item-row-1">
                        <span>&bull; <span class="company-name">Enterprise QA Platform MCP</span> — Autonomous Testing Engine (Node.js, Claude, MCP)</span>
                    </div>
                    <ul class="bullets">
                        <li>${highlightMetrics("Architected multi-agent system consolidating GitLab, Linear, Slack & Testkube tools to diagnose and remediate CI/CD pipeline issues autonomously.")}</li>
                    </ul>
                </div>

                <div class="item-entry">
                    <div class="item-row-1">
                        <span>&bull; <span class="company-name">AI-Assisted Test Gen & Auto-SDK Pipeline</span> — Microservices Reliability (Claude, Cursor)</span>
                    </div>
                    <ul class="bullets">
                        <li>${highlightMetrics("Built polyglot test generation toolkit saving 80% test authoring effort and auto-syncing SDKs from Swagger specs with 85% less overhead.")}</li>
                    </ul>
                </div>
            </section>

            <!-- Education -->
            <section id="education">
                <h2 class="sec-title">Education</h2>
                <div class="item-entry">
                    <div class="item-row-1">
                        <span>&bull; <span class="company-name">JECRC Foundation</span></span>
                        <span class="right-text">Jaipur, Rajasthan, India</span>
                    </div>
                    <div class="item-row-2">
                        <span class="left-role">Bachelor of Technology in Mechanical Engineering | Aggregate: 68.1%</span>
                        <span class="right-date">July 2012 – June 2016</span>
                    </div>
                </div>
            </section>

            <!-- Honors & Certifications -->
            <section id="certifications">
                <h2 class="sec-title">Honors & Certifications</h2>
                <div class="item-entry" style="margin-bottom: 2px;">
                    <div class="item-row-1">
                        <span>&bull; <span class="company-name">AlphaAward — Engineering Performance & Impact</span></span>
                        <span class="right-date" style="font-style: italic; color: #b45309; font-weight: 700;"><i class="fas fa-trophy" style="color: #d97706;"></i> AlphaSense</span>
                    </div>
                </div>
                <div class="item-entry" style="margin-bottom: 0;">
                    <div class="item-row-1">
                        <span>&bull; <span class="company-name">VSkills Selenium Professional Certification</span></span>
                        <span class="right-date" style="font-style: italic; color: #475569; font-weight: 600;">Certified, 2019</span>
                    </div>
                </div>
            </section>

            <!-- Running Footer -->
            <div class="cv-footer">
                <span>Shubham Sharma — Staff SDET &bull; QA Platform Engineer</span>
            </div>
        </div>
    `;
};
