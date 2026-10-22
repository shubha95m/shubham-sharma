window.renderDual = (DATA, ROOT, STYLE) => {
    // Robust Scoping: specific body class (ONLY for main app)
    if (ROOT.id === 'app-root') {
        document.body.className = 'dual-theme';
    }

    STYLE.innerHTML = `
        body.dual-theme { 
            background: #f1f5f9; 
            color: #111111; 
            font-family: 'Times New Roman', Times, Georgia, Cambria, serif; 
            padding: 1.5rem 0.5rem; 
            margin: 0; 
            line-height: 1.30;
            -webkit-font-smoothing: antialiased;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            --primary: #000000;
            --muted: #333333;
            --border: #000000;
        }

        .dual-theme .cv-paper {
            max-width: 820px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .dual-theme .dual-sheet {
            background: #ffffff;
            padding: 26px 36px 20px 36px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border-radius: 2px;
            box-sizing: border-box;
            min-height: 1040px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .dual-theme .sheet-content {
            flex: 1;
        }

        /* Screen Visual Divider between pages */
        .dual-theme .screen-divider {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
            color: #64748b;
            font-size: 0.76rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            padding: 0.4rem 0;
            border-top: 1px dashed #cbd5e1;
            border-bottom: 1px dashed #cbd5e1;
        }

        /* Two-Column Clean Header */
        .dual-theme .header-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 5px;
        }
        .dual-theme h1.candidate-name {
            font-size: 1.65rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 2px 0;
            line-height: 1.1;
            letter-spacing: -0.01em;
        }
        .dual-theme .tagline {
            font-size: 0.82rem;
            font-weight: 600;
            font-style: italic;
            color: #334155;
            margin-bottom: 3px;
        }
        .dual-theme .header-left-links {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            font-size: 0.76rem;
            line-height: 1.35;
            color: #111111;
            margin-top: 2px;
        }
        .dual-theme .header-left-links a {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            color: #0f172a;
            text-decoration: underline;
            text-underline-offset: 2px;
        }
        .dual-theme .header-left-links a i.fa-linkedin {
            font-size: 0.88rem;
            color: #0a66c2;
        }
        .dual-theme .header-left-links a i.fa-github {
            font-size: 0.88rem;
            color: #1f2328;
        }
        .dual-theme .header-left-links .social-sep {
            color: #94a3b8;
            font-size: 0.65rem;
        }
        .dual-theme .header-right-contact a {
            color: #0f172a;
            text-decoration: underline;
            text-underline-offset: 2px;
        }
        .dual-theme .header-right-contact {
            text-align: right;
            font-size: 0.76rem;
            line-height: 1.35;
            color: #334155;
        }

        /* Page 2 Continuation Header */
        .dual-theme .page2-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            border-bottom: 1.2px solid #1e3a8a;
            padding-bottom: 2px;
            margin-bottom: 6px;
            font-size: 0.78rem;
            font-weight: 700;
            color: #1e3a8a;
            font-style: italic;
        }
        .dual-theme .page2-header .page2-subtitle {
            color: #64748b;
            font-weight: 600;
            font-style: italic;
        }

        /* Section Dividers with crisp Oxford Navy rule */
        .dual-theme h2.sec-title {
            font-size: 0.86rem;
            font-weight: 700;
            text-transform: none;
            color: #1e3a8a;
            border-bottom: 1.2px solid #1e3a8a;
            padding-bottom: 1.5px;
            margin-top: 7px;
            margin-bottom: 4px;
            letter-spacing: 0.01em;
        }

        /* Summary text */
        .dual-theme .summary-p {
            font-size: 0.74rem;
            line-height: 1.30;
            color: #1e293b;
            margin: 0 0 4px 0;
            text-align: justify;
        }

        /* Skills Summary List */
        .dual-theme ul.skills-list {
            list-style: none;
            padding: 0;
            margin: 0 0 2px 0;
        }
        .dual-theme ul.skills-list li {
            font-size: 0.73rem;
            line-height: 1.28;
            color: #1e293b;
            margin-bottom: 1.5px;
            text-align: justify;
        }
        .dual-theme ul.skills-list li strong {
            font-weight: 700;
            color: #1e3a8a;
        }

        /* Items (Experience, Projects, Education) */
        .dual-theme .item-entry {
            margin-bottom: 5px;
        }
        .dual-theme .item-row-1 {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 0.78rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.26;
        }
        .dual-theme .company-name {
            color: #1e40af;
            font-weight: 700;
        }
        .dual-theme .item-row-1 .right-text {
            font-weight: 600;
            color: #64748b;
            text-align: right;
        }
        .dual-theme .item-row-1 .right-text a {
            color: #0f172a;
            text-decoration: underline;
            text-underline-offset: 2px;
        }
        .dual-theme .item-row-2 {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 0.74rem;
            line-height: 1.25;
            margin-bottom: 1.5px;
        }
        .dual-theme .item-row-2 .left-role {
            font-weight: 600;
            font-style: italic;
            color: #0369a1;
        }
        .dual-theme .item-row-2 .right-date {
            font-style: italic;
            color: #475569;
            font-weight: 600;
            text-align: right;
        }

        /* Bullet Points */
        .dual-theme ul.bullets {
            margin: 0;
            padding-left: 18px;
            list-style-type: circle;
        }
        .dual-theme ul.bullets li {
            font-size: 0.72rem;
            line-height: 1.26;
            color: #111111;
            margin-bottom: 1.5px;
            text-align: justify;
        }
        .dual-theme ul.bullets li strong {
            font-weight: 700;
            color: #000000;
        }

        /* Running Footer */
        .dual-theme .cv-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 0.5px solid #cccccc;
            padding-top: 2px;
            margin-top: 6px;
            font-size: 0.65rem;
            color: #555555;
            font-style: italic;
        }

        /* STRICT DUAL PAGE PRINT CONFIGURATION - A4 ZERO CUTOFF & SUPPRESS BROWSER HEADERS */
        @media print {
            @page {
                size: A4 portrait;
                margin: 0 !important; /* Suppresses browser native header (date/title) and footer (URL) */
            }
            html {
                font-size: 13px !important;
            }
            html, body {
                width: 100% !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
            }
            body.dual-theme {
                padding: 0 !important;
                background: #ffffff !important;
            }
            .dual-theme .cv-paper {
                box-shadow: none !important;
                border: none !important;
                padding: 0 !important;
                margin: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                gap: 0 !important;
            }
            .dual-theme .dual-sheet {
                box-shadow: none !important;
                border: none !important;
                padding: 10mm 14mm 10mm 14mm !important;
                margin: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                min-height: 297mm !important;
                box-sizing: border-box !important;
            }
            .dual-theme .dual-sheet.page-1 {
                page-break-after: always !important;
                break-after: page !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
            }
            .dual-theme .dual-sheet.page-2 {
                page-break-after: avoid !important;
                break-after: avoid !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
            }
            .dual-theme .screen-divider {
                display: none !important;
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

    const linkedinUrl = linkedinObj ? linkedinObj.url : 'https://www.linkedin.com/in/shubham-sharma-4a4aaab9';
    const linkedinDisplay = linkedinUrl.replace(/^https?:\/\/(www\.)?/, '');
    const githubUrl = githubObj ? githubObj.url : 'https://github.com/shubha95m';
    const githubDisplay = githubUrl.replace(/^https?:\/\/(www\.)?/, '');

    ROOT.innerHTML = `
        <div class="cv-paper">
            <!-- ================= PAGE 1 ================= -->
            <div class="dual-sheet page-1">
                <div class="sheet-content">
                    <!-- Two-Column Clean Header -->
                    <header class="header-container" id="profile">
                        <div>
                            <h1 class="candidate-name">${DATA.profile.name}</h1>
                            <div class="tagline">${DATA.profile.taglines.join(' &bull; ')}</div>
                            <div class="header-left-links">
                                <a href="${linkedinUrl}" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i> <span>LinkedIn</span></a>
                                <span class="social-sep">&bull;</span>
                                <a href="${githubUrl}" target="_blank" rel="noopener"><i class="fab fa-github"></i> <span>GitHub</span></a>
                            </div>
                        </div>
                        <div class="header-right-contact">
                            <div>Email: <a href="mailto:${DATA.profile.contact.email}">${DATA.profile.contact.email}</a></div>
                            <div>Mobile: ${DATA.profile.contact.phone}</div>
                            <div>Location: ${DATA.profile.contact.location}</div>
                        </div>
                    </header>

                    <!-- Professional Summary -->
                    <section id="about">
                        <h2 class="sec-title">Professional Summary</h2>
                        ${DATA.summary.summary.map(p => `<p class="summary-p">${highlightMetrics(p)}</p>`).join('')}
                    </section>

                    <!-- Skills Summary -->
                    <section id="skills">
                        <h2 class="sec-title">Skills Summary</h2>
                        <ul class="skills-list">
                            <li>&bull; <strong>Test Automation & Frameworks :</strong> Playwright, Selenium, Cypress, RestAssured, K6, Testkube, Selenoid, Allure, ReportPortal, Contract Testing, API Testing</li>
                            <li>&bull; <strong>Languages & Stacks :</strong> Java, Kotlin, JavaScript, Python, Node.js, Spring Boot, GraphQL, Microservices</li>
                            <li>&bull; <strong>Cloud, DevOps & SRE :</strong> AWS, Azure, GCP, Docker, Kubernetes, Crossplane, Jenkins CI/CD, Git, Linux, Infrastructure as Code, Test Observability</li>
                            <li>&bull; <strong>Quality Architecture & Practices :</strong> Autonomous Self-Healing, Shift-Left Testing, TDD, Agile/Scrum, CI/CD Quality Gates, Release Management, Performance Engineering</li>
                        </ul>
                    </section>

                    <!-- Work Experience: Recent Leadership -->
                    <section id="experience">
                        <h2 class="sec-title">Work Experience (Recent Leadership)</h2>

                        <!-- Staff SDET -->
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
                                <li>${highlightMetrics("Engineered scheduled Self-Healing pipeline running on automated schedules to continuously detect persistent test failures, auto-heal broken tests, raise GitLab MRs, and request Slack peer reviews for 100% robust test coverage.")}</li>
                                <li>${highlightMetrics("Built AI-powered Auto-Review bot with agentic skills that automatically inspects raised MRs, validates code quality, identifies logical gaps, and enforces engineering best practices.")}</li>
                                <li>${highlightMetrics("Developed an intelligent CI/CD Troubleshooting Agent for hard-gate failures, correlating test history, MR diffs, and integration service health to provide instant diagnostic verdicts.")}</li>
                                <li>${highlightMetrics("Designed org-wide Playwright agentic tools generating base automation scripts in minutes, reducing test bootstrap time by 90%.")}</li>
                            </ul>
                        </div>

                        <!-- Team Lead -->
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
                                <li>${highlightMetrics("Integrated cloud resources using Crossplane across AWS, Azure, and GCP with 99.5% uptime; optimized cloud costs via IaC saving $1K+/month (12% reduction).")}</li>
                                <li>${highlightMetrics("Implemented and enhanced Testkube with in-cluster testing, triggers, and reusable workflows, improving test observability by 50%.")}</li>
                                <li>${highlightMetrics("Shifted validation to build-level execution in Jenkins continuous pipelines, reducing late-stage failures by 45%.")}</li>
                                <li>${highlightMetrics("Mentored QA engineers to independently own complex automation systems and cloud tooling, improving team autonomy by 60%.")}</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <!-- Page 1 Footer -->
                <div class="cv-footer">
                    <span>Shubham Sharma — Staff SDET &bull; QA Platform Engineer</span>
                    <span>Page 1 of 2</span>
                </div>
            </div>

            <!-- Screen Visual Divider -->
            <div class="screen-divider">
                <i class="fas fa-angle-double-down"></i> Page 2 &bull; Career History, Technical Systems & Education <i class="fas fa-angle-double-down"></i>
            </div>

            <!-- ================= PAGE 2 ================= -->
            <div class="dual-sheet page-2">
                <div class="sheet-content">
                    <!-- Page 2 Continuation Header -->
                    <div class="page2-header">
                        <span>Shubham Sharma — Staff SDET &bull; QA Platform Engineer</span>
                        <span class="page2-subtitle">Professional Experience &bull; Page 2</span>
                    </div>

                    <!-- Work Experience Continued -->
                    <section id="experience-continued">

                        <!-- Senior Automation QA -->
                        <div class="item-entry">
                            <div class="item-row-1">
                                <span>&bull; <span class="company-name">AlphaSense</span> — Framework Scalability & Core Automation</span>
                                <span class="right-text">Pune, India</span>
                            </div>
                            <div class="item-row-2">
                                <span class="left-role">Senior Automation QA</span>
                                <span class="right-date">Jan 2022 – Sept 2023</span>
                            </div>
                            <ul class="bullets">
                                <li>${highlightMetrics("Led team of 3 QA engineers; managed sprint planning and execution following Agile and Scrum methodologies.")}</li>
                                <li>${highlightMetrics("Built scalable automation frameworks using Java, JavaScript, Cypress, K6, and Selenide with test-driven development principles.")}</li>
                                <li>${highlightMetrics("Integrated post-deployment automation using Spinnaker for continuous testing and release management.")}</li>
                                <li>${highlightMetrics("Implemented performance testing strategies for microservices and SQS-based systems, improving throughput by 35% and reducing production incidents by 30%.")}</li>
                            </ul>
                        </div>

                        <!-- Automation QA -->
                        <div class="item-entry">
                            <div class="item-row-1">
                                <span>&bull; <span class="company-name">AlphaSense</span> — Multi-Tenant Quality Engineering</span>
                                <span class="right-text">Pune, India</span>
                            </div>
                            <div class="item-row-2">
                                <span class="left-role">Automation QA</span>
                                <span class="right-date">Mar 2020 – Dec 2021</span>
                            </div>
                            <ul class="bullets">
                                <li>${highlightMetrics("Implemented frontend automation using Selenium (Java) and Selenide (Kotlin) with comprehensive API testing coverage.")}</li>
                                <li>${highlightMetrics("Built backend API automation using Kotlin and RestAssured following shift-left testing practices.")}</li>
                                <li>${highlightMetrics("Automated GraphQL APIs and maintained large-scale regression suites (4K+ test cases) with 95% pass rate.")}</li>
                                <li>${highlightMetrics("Integrated Allure, ReportPortal, and Selenoid Grid for test observability, reporting, and execution scalability.")}</li>
                            </ul>
                        </div>

                        <!-- Accenture -->
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
                                <li>${highlightMetrics("Automated 100+ healthcare enterprise web applications across enterprise client engagements under strict compliance standards.")}</li>
                                <li>${highlightMetrics("Executed E2E, regression, smoke, UAT, and UI testing within complete SDLC, achieving a 98% defect detection rate.")}</li>
                                <li>${highlightMetrics("Built strong foundations in enterprise QA processes, documentation, and quality engineering methodologies.")}</li>
                            </ul>
                        </div>
                    </section>

                    <!-- Projects and Technical Systems -->
                    <section id="innovation">
                        <h2 class="sec-title">Projects and Technical Systems</h2>

                        <div class="item-entry">
                            <div class="item-row-1">
                                <span>&bull; <span class="company-name">Enterprise QA Platform MCP</span> — Autonomous Multi-Agent Testing Engine</span>
                            </div>
                            <ul class="bullets">
                                <li>${highlightMetrics("Architected multi-agent system consolidating GitLab, Linear, Slack, Allure & Testkube tools to diagnose and remediate CI/CD failures autonomously with 350+ tools and 150+ skills.")}</li>
                            </ul>
                        </div>

                        <div class="item-entry">
                            <div class="item-row-1">
                                <span>&bull; <span class="company-name">AI-Driven Regression Intelligence</span> & Self-Healing Pipeline</span>
                            </div>
                            <ul class="bullets">
                                <li>${highlightMetrics("Built AI-powered regression analyzer processing 4,000+ test cases, querying Grafana logs via MCP, analyzing GitLab commits, and diagnosing defect origins with 85% accuracy.")}</li>
                            </ul>
                        </div>

                        <div class="item-entry">
                            <div class="item-row-1">
                                <span>&bull; <span class="company-name">AI-Assisted Test Gen & Auto-SDK Pipeline</span> (Cursor, Claude, Swagger)</span>
                            </div>
                            <ul class="bullets">
                                <li>${highlightMetrics("Developed polyglot test generation toolkit saving 80% test authoring effort and auto-syncing SDKs from Swagger specs with 85% less maintenance overhead.")}</li>
                            </ul>
                        </div>

                        <div class="item-entry">
                            <div class="item-row-1">
                                <span>&bull; <span class="company-name">Crossplane Multi-Cloud Governance</span> & Infrastructure as Code</span>
                            </div>
                            <ul class="bullets">
                                <li>${highlightMetrics("Orchestrated cloud resources across AWS, Azure, and GCP using Crossplane with 99.5% uptime and automated governance saving $1K+/month.")}</li>
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

                    <!-- Certifications -->
                    <section id="certifications">
                        <h2 class="sec-title">Certifications</h2>
                        <div class="item-entry">
                            <div class="item-row-1">
                                <span>&bull; <span class="company-name">VSkills</span> Selenium Professional Certification</span>
                                <span class="right-text">Certified, 2019</span>
                            </div>
                            <div class="item-row-2">
                                <span class="left-role">VSkills &bull; Enterprise Web Automation, WebDriver Architecture, CI/CD Test Grids</span>
                                <span class="right-date"></span>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Page 2 Footer -->
                <div class="cv-footer">
                    <span>Shubham Sharma — Staff SDET &bull; QA Platform Engineer</span>
                    <span>Page 2 of 2</span>
                </div>
            </div>
        </div>
    `;
};
