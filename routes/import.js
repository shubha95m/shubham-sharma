const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs').promises;
const path = require('path');
const { Anthropic } = require('@anthropic-ai/sdk');

const router = express.Router();

// Initialize Claude Client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// Configure Multer for PDF/Text uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Import Resume (AI-Powered)
router.post('/import', upload.single('resumeFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Extract Text
        let resumeText = '';
        if (req.file.mimetype === 'application/pdf') {
            const data = await pdf(req.file.buffer);
            resumeText = data.text;
        } else {
            resumeText = req.file.buffer.toString('utf-8');
        }

        // AI Parsing with Claude
        if (!process.env.ANTHROPIC_API_KEY) {
            return res.status(500).json({ error: 'Server missing API Key' });
        }

        const prompt = `
        You are an expert Resume Parser. 
        Extract data from the following Resume Text and format it into strictly valid JSON matching the schema below.
        
        RESUME TEXT:
        ${resumeText.substring(0, 15000)}
        
        REQUIRED JSON SCHEMA (Return ONLY this JSON object):
        {
            "profile": {
                "name": "Full Name",
                "taglines": ["Tagline 1", "Tagline 2"],
                "contact": { "email": "email", "location": "City, Country" },
                "social": [{ "icon": "fab fa-linkedin", "url": "..." }, { "icon": "fab fa-github", "url": "..." }],
                "profilePic": "profile_pic.jpg"
            },
            "summary": { "summary": ["Paragraph 1", "Paragraph 2"] },
            "journey": [
                { "role": "Job Title", "company": "Company", "date": "e.g. 2020 - Present", "details": ["Bullet 1", "Bullet 2"] }
            ],
            "skills": ["Skill 1", "Skill 2", "Skill 3"],
            "education": {
                "degrees": [{ "degree": "Degree Name", "school": "University", "year": "Year", "grade": "GPA/Grade" }],
                "certifications": [{ "name": "Cert Name", "issuer": "Issuer", "year": "Year", "grade": "Score" }]
            },
            "highlights": {
                "careerFocus": ["Focus 1", "Focus 2"],
                "scope": ["Scope item 1", "Scope item 2"],
                "architecture": ["Arch item 1", "Arch item 2"],
                "platforms": ["Platform 1", "Platform 2"]
            }
        }
        `;

        const response = await anthropic.messages.create({
            model: process.env.MODEL_NAME || "claude-3-haiku-20240307",
            max_tokens: 4000,
            messages: [{ role: "user", content: prompt }],
        });

        // Process AI Response
        let content = response.content[0].text;
        content = content.replace(/```json\n?|\n?```/g, '');
        const jsonMatch = content.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error('Failed to parse AI response as JSON');
        }

        const parsedData = JSON.parse(jsonMatch[0]);

        // Create New User
        const userId = parsedData.profile.name.split(' ')[0].toLowerCase() + Math.floor(Math.random() * 1000);
        const userDir = path.join(__dirname, '..', 'cv-content', userId);

        await fs.mkdir(userDir, { recursive: true });

        // Write all files
        await fs.writeFile(path.join(userDir, 'profile.json'), JSON.stringify(parsedData.profile, null, 2));
        await fs.writeFile(path.join(userDir, 'summary.json'), JSON.stringify(parsedData.summary, null, 2));
        await fs.writeFile(path.join(userDir, 'journey.json'), JSON.stringify(parsedData.journey, null, 2));
        await fs.writeFile(path.join(userDir, 'skills.json'), JSON.stringify(parsedData.skills, null, 2));
        await fs.writeFile(path.join(userDir, 'education.json'), JSON.stringify(parsedData.education, null, 2));
        await fs.writeFile(path.join(userDir, 'highlights.json'), JSON.stringify(parsedData.highlights, null, 2));

        // Update users.json
        const usersFile = path.join(__dirname, '..', 'cv-content', 'users.json');
        let users = [];
        try {
            const usersData = await fs.readFile(usersFile, 'utf8');
            users = JSON.parse(usersData);
        } catch (e) { }

        const newUserEntry = {
            id: userId,
            name: parsedData.profile.name,
            title: parsedData.profile.taglines[0] || 'New User',
            avatar: 'profile_pic.jpg'
        };

        users.push(newUserEntry);
        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

        res.json({ success: true, userId: userId });

    } catch (error) {
        console.error('Import Error:', error);
        res.status(500).json({ error: 'Import failed: ' + error.message });
    }
});

module.exports = router;
