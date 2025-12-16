window.renderClean = (DATA, ROOT, STYLE) => {
    STYLE.innerHTML = `
        body { background: #f8fafc; color: #334155; font-family: 'Outfit', sans-serif; padding: 4rem 2rem; margin: 0; }
        .max-w { max-width: 900px; margin: 0 auto; }
        h1 { font-family: sans-serif; font-size: 2.2rem; margin: 0; color: #1e293b; }
        .tagline { color: #2563eb; font-weight: 600; font-size: 1.2rem; margin-top: 0.5rem; }
        .summary-text { color: #475569; line-height: 1.6; margin-top: 1.5rem; font-size: 1rem; }
        .section-head { font-size: 1.4rem; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-top: 2.5rem; margin-bottom: 1.5rem; color: #1e293b; }
        .job-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 1.5rem; transition: 0.3s; }
        .job-card:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); transform: translateY(-2px); }
        .job-title { font-size: 1.1rem; font-weight: 700; }
        .meta { color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }
        .pill { display: inline-block; background: white; padding: 0.5rem 1rem; border-radius: 50px; margin: 0.3rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); color: #334155; font-size: 0.9rem; }
    `;

    ROOT.innerHTML = `
        <div class="max-w">
            <header id="profile" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 2rem;">
                <div>
                    <h1>${DATA.profile.name}</h1>
                    <div class="tagline">${DATA.profile.taglines.join(' / ')}</div>
                    <p style="margin-top:1rem; color:#64748b;">
                        <i class="fas fa-map-marker-alt"></i> ${DATA.profile.contact.location} &nbsp; | &nbsp; 
                        <i class="fas fa-envelope"></i> ${DATA.profile.contact.email} &nbsp; | &nbsp; 
                        <i class="fas fa-phone"></i> ${DATA.profile.contact.phone}
                    </p>
                </div>
                <img src="${DATA.profile.profilePic}" style="width: 160px; height: 160px; border-radius: 50%; object-fit: cover; border: 4px solid white; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            </header>
            <div id="about" class="summary-text">${DATA.summary.summary.join(' ')}</div>
            
            <div id="innovation">
                <h2 class="section-head">Executive Highlights</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h3 style="font-size:1.1rem; color:#2563eb;">Scope & Impact</h3>
                        <ul style="color:#475569; padding-left:1.2rem;">${DATA.highlights.scope.map(s => `<li>${s}</li>`).join('')}</ul>
                    </div>
                    <div>
                        <h3 style="font-size:1.1rem; color:#2563eb;">Architecture & Design</h3>
                        <ul style="color:#475569; padding-left:1.2rem;">${DATA.highlights.architecture.map(s => `<li>${s}</li>`).join('')}</ul>
                    </div>
                </div>
    
                <h2 class="section-head">Key Platforms</h2>
                 <ul style="color:#475569; padding-left:1.2rem; columns: 2;">
                    ${DATA.highlights.platforms.map(s => `<li style="margin-bottom:0.5rem;">${s}</li>`).join('')}
                </ul>
            </div>

            <div id="skills">
                <h2 class="section-head">Skills</h2>
                <div>
                    ${DATA.skills.map(s => `<span class="pill">${s}</span>`).join('')}
                </div>
            </div>

            <div id="experience">
                <h2 class="section-head">Experience</h2>
                ${DATA.journey.map(j => `
                    <div class="job-card">
                        <div class="job-title">${j.role}</div>
                        <div class="meta">${j.company} · ${j.date}</div>
                        <ul style="padding-left:1.2rem; color:#475569;">
                            ${j.details.map(d => `<li style="margin-bottom:0.4rem;">${d}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <div id="education">
                <h2 class="section-head">Education</h2>
                ${DATA.education.degrees.map(d => `<p style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;"><strong>${d.degree}</strong> <span style="color: #64748b; font-size: 0.9rem;">| ${d.school} | ${d.year} | ${d.grade}</span></p>`).join('')}
                ${DATA.education.certifications && DATA.education.certifications.length > 0 ? `<p style="margin-top: 1rem; padding: 0.8rem; background: white; border-radius: 6px; font-size: 0.9rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><strong>Certifications:</strong> ${DATA.education.certifications.map(c => `${c.name} (${c.issuer}, ${c.year})`).join(' • ')}</p>` : ''}
            </div>
        </div>
    `;
};
