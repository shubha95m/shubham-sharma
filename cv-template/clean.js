window.renderClean = (DATA, ROOT, STYLE) => {
    // Robust Scoping: specific body class (ONLY for main app)
    if (ROOT.id === 'app-root') {
        document.body.className = 'clean-theme';
    }

    STYLE.innerHTML = `
        body.clean-theme { background: #f8fafc; color: #334155; font-family: 'Outfit', sans-serif; padding: 2rem 2rem; margin: 0; }
        .clean-theme .max-w { max-width: 900px; margin: 0 auto; }
        .clean-theme h1 { font-family: sans-serif; font-size: 2rem; margin: 0; color: #0f172a !important; font-weight: 700; }
        .clean-theme .tagline { color: #2563eb; font-weight: 600; font-size: 1.1rem; margin-top: 0.5rem; }
        .clean-theme .summary-text { color: #0f172a; line-height: 1.5; margin-top: 0.5rem; font-size: 1rem; font-weight: 400; }
        .clean-theme .section-head { font-size: 1.3rem; font-weight: 700; border-bottom: 2px solid #cbd5e1; padding-bottom: 0.5rem; margin-top: 0.8rem; margin-bottom: 0.3rem; color: #0f172a !important; }
        .clean-theme .job-card { background: white; padding: 0.8rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 0.6rem; transition: 0.3s; color: #0f172a; }
        .clean-theme .job-card:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); transform: translateY(-2px); }
        .clean-theme .job-title { font-size: 1.05rem; font-weight: 700; color: #0f172a; }
        .clean-theme .meta { color: #0f172a; font-size: 0.9rem; margin-bottom: 0.4rem; font-weight: 500; }
        .clean-theme .pill { display: inline-block; background: #e2e8f0; padding: 0.3rem 0.6rem; border-radius: 50px; margin: 0.2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); color: #0f172a; font-size: 0.85rem; font-weight: 500; border: 1px solid #cbd5e1; vertical-align: middle; }
        .clean-theme .text-dark { color: #0f172a !important; }
        .clean-theme ul, .clean-theme li, .clean-theme p, .clean-theme span, .clean-theme div { color: #0f172a; }
        .clean-theme h1, .clean-theme h2, .clean-theme h3, .clean-theme h4, .clean-theme h5, .clean-theme h6 { color: #0f172a !important; }
        .clean-theme .skill-container { line-height: 1.8; }
    `;

    ROOT.innerHTML = `
        <div class="max-w">
            <header id="profile" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h1>${DATA.profile.name}</h1>
                    <div class="tagline">${DATA.profile.taglines.join(' / ')}</div>
                    <p style="margin-top:1rem; color:#0f172a; font-weight: 500;">
                        <i class="fas fa-map-marker-alt"></i> ${DATA.profile.contact.location} &nbsp; | &nbsp; 
                        <i class="fas fa-envelope"></i> ${DATA.profile.contact.email} &nbsp; | &nbsp; 
                        <i class="fas fa-phone"></i> ${DATA.profile.contact.phone}
                    </p>
                </div>
                <img src="${DATA.profile.profilePic}" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 4px solid white; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            </header>
            <div id="about" class="summary-text">${DATA.summary.summary.join(' ')}</div>
            
            <div id="innovation">
                <h2 class="section-head">Executive Highlights</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
                    <div>
                        <h3 style="font-size:1rem; color:#2563eb; font-weight:600; margin-bottom:0.3rem;">Scope & Impact</h3>
                        <ul class="text-dark" style="padding-left:1.2rem; line-height:1.4;">${DATA.highlights.scope.map(s => `<li style="margin-bottom:0.2rem;">${s}</li>`).join('')}</ul>
                    </div>
                    <div>
                        <h3 style="font-size:1rem; color:#2563eb; font-weight:600; margin-bottom:0.3rem;">Architecture & Design</h3>
                        <ul class="text-dark" style="padding-left:1.2rem; line-height:1.4;">${DATA.highlights.architecture.map(s => `<li style="margin-bottom:0.2rem;">${s}</li>`).join('')}</ul>
                    </div>
                </div>
    
                <h2 class="section-head">Key Platforms</h2>
                 <ul class="text-dark" style="padding-left:1.2rem; columns: 2; line-height:1.4;">
                    ${DATA.highlights.platforms.map(s => `<li style="margin-bottom:0.2rem;">${s}</li>`).join('')}
                </ul>
            </div>

            <div id="skills">
                <h2 class="section-head">Skills</h2>
                <div>
                    ${(() => {
            if (Array.isArray(DATA.skills)) {
                return DATA.skills.map(s => `<span class="pill">${s}</span>`).join('');
            } else {
                let html = '';
                if (DATA.skills.technical && DATA.skills.technical.length > 0) {
                    html += `<div style="margin-bottom:0.5rem;"><h4 style="color:#2563eb; font-size:1rem; margin-bottom:0.2rem; font-weight:600;">Technical Skills</h4><div class="skill-container">${DATA.skills.technical.map(s => `<span class="pill">${s}</span>`).join('')}</div></div>`;
                }
                if (DATA.skills.process && DATA.skills.process.length > 0) {
                    html += `<div><h4 style="color:#0f172a; font-size:1rem; margin-bottom:0.2rem; font-weight:600;">Process & Methodology</h4><div class="skill-container">${DATA.skills.process.map(s => `<span class="pill" style="background:#f1f5f9; color:#0f172a;">${s}</span>`).join('')}</div></div>`;
                }
                return html;
            }
        })()}
                </div>
            </div>

            <div id="experience">
                <h2 class="section-head">Experience</h2>
                ${DATA.journey.map(j => `
                    <div class="job-card">
                        <div class="job-title">${j.role}</div>
                        <div class="meta text-dark">${j.company} · ${j.date}</div>
                        <ul class="text-dark" style="padding-left:1.2rem; line-height:1.4;">
                            ${j.details.map(d => `<li style="margin-bottom:0.2rem;">${d}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <div id="education">
                <h2 class="section-head">Education</h2>
                ${DATA.education.degrees.map(d => `<p style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;"><strong>${d.degree}</strong> <span style="color: #334155; font-size: 0.9rem; font-weight: 500;">| ${d.school} | ${d.year} | ${d.grade}</span></p>`).join('')}
                ${DATA.education.certifications && DATA.education.certifications.length > 0 ? `<p style="margin-top: 1rem; padding: 0.8rem; background: white; border-radius: 6px; font-size: 0.9rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>Certifications:</strong> ${DATA.education.certifications.map(c => `${c.name} (${c.issuer}, ${c.year})`).join(' • ')}</p>` : ''}
            </div>
        </div>
    `;
};
