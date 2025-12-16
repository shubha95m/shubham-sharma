const express = require('express');
const { Anthropic } = require('@anthropic-ai/sdk');

const router = express.Router();

// Initialize Claude Client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// AI Optimization
router.post('/optimize', async (req, res) => {
    try {
        const { text, context, instruction } = req.body;

        if (!process.env.ANTHROPIC_API_KEY) {
            return res.status(500).json({ error: 'Server missing API Key' });
        }

        const prompt = `
        You are an expert Resume Writer and Career Coach. 
        Your task is to improve the following text for a professional resume.
        
        CONTEXT: This text belongs to the "${context}" section.
        INSTRUCTION: ${instruction || "Make it more impactful, concise, and result-oriented."}
        
        ORIGINAL TEXT:
        "${text}"

        Please provide ONLY the rewritten text without explanations or quotes.
        `;

        const response = await anthropic.messages.create({
            model: process.env.MODEL_NAME,
            max_tokens: 2000,
            messages: [{ role: "user", content: prompt }],
        });

        // Clean up response
        const refinedText = response.content[0].text
            .replace(/```json\n?|\n?```/g, '')
            .replace(/^"|"$/g, '')
            .trim();

        res.json({ refinedText });

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'AI processing failed: ' + error.message });
    }
});

// Conversational CV Builder
router.post('/build-cv', async (req, res) => {
    console.log('[CV BUILDER] Request received:', { currentSection: req.body.currentSection, hasMessage: !!req.body.userMessage });

    try {
        const { conversationHistory, userMessage, currentSection } = req.body;

        if (!process.env.ANTHROPIC_API_KEY) {
            console.error('[CV BUILDER] Missing API Key');
            return res.status(500).json({ error: 'Server missing API Key' });
        }

        // Define the sections and their prompts
        const sections = {
            start: {
                question: `Hi! I'm here to help you build a professional resume. Let's start with your basic information.\n\nWhat is your full name?`,
                next: 'email'
            },
            email: {
                question: `Great! What's your email address?`,
                next: 'location'
            },
            location: {
                question: `Where are you located? (City, Country)`,
                next: 'phone'
            },
            phone: {
                question: `What's your phone number?`,
                next: 'taglines'
            },
            taglines: {
                question: `What are your professional titles or taglines? (e.g., 'Senior Software Engineer', 'Full Stack Developer')\nYou can provide 2-3 titles.`,
                next: 'summary'
            },
            summary: {
                question: `Tell me about yourself professionally. You can write this as a paragraph - I'll format it into an impactful summary.\n\nDescribe your experience, expertise, and what makes you unique.`,
                next: 'experience'
            },
            experience: {
                question: `Let's talk about your work experience. For your most recent or current role:\n\n1. What is/was your job title?\n2. Company name?\n3. Duration (e.g., 'Jan 2020 - Present')?\n4. What did you accomplish? (You can write in paragraph form - I'll convert to bullet points)\n\nType 'done' when you've added all your roles.`,
                next: 'skills'
            },
            skills: {
                question: `What are your technical skills? List technologies, tools, frameworks, languages, etc.\n\nYou can write them as a comma-separated list or paragraph.`,
                next: 'education'
            },
            education: {
                question: `Tell me about your education:\n\n1. Degree name\n2. Institution\n3. Year\n4. Grade/GPA (optional)\n\nIf you have certifications, mention them too. Type 'done' when finished.`,
                next: 'highlights'
            },
            highlights: {
                question: `Finally, tell me about your key achievements or platforms you've built. What are you most proud of in your career?\n\nThis can be in paragraph form.`,
                next: 'complete'
            }
        };

        // Build conversation messages for Claude
        const messages = [];

        // Add conversation history
        if (conversationHistory && conversationHistory.length > 0) {
            conversationHistory.forEach(msg => {
                messages.push({
                    role: msg.role,
                    content: msg.content
                });
            });
        }

        // Add current user message
        if (userMessage) {
            messages.push({
                role: 'user',
                content: userMessage
            });
        }

        // Determine next action
        let nextSection = currentSection;
        let systemPrompt = '';

        if (currentSection === 'start' && !userMessage) {
            // Initial greeting
            return res.json({
                message: sections.start.question,
                section: 'email',
                complete: false
            });
        }

        // Process user's response and format it
        if (currentSection !== 'complete') {
            systemPrompt = `You are a professional resume writer helping someone build their CV. 
            
The user just provided information for the "${currentSection}" section.

Your task:
1. Acknowledge their input briefly
2. Reformat their response to be professional, impactful, and result-oriented
3. If they provided paragraph text, convert it to clear bullet points (for experience/highlights)
4. Make it quantifiable where possible
5. Then ask the next question: "${sections[sections[currentSection].next]?.question || 'Thank you!'}"

Keep your response conversational but professional. Format like:
"Great! I've formatted that as: [formatted content]

${sections[sections[currentSection].next]?.question || 'We have all the information needed!'}"`;

            messages.push({
                role: 'user',
                content: systemPrompt
            });

            const response = await anthropic.messages.create({
                model: process.env.MODEL_NAME || "claude-sonnet-4-5-20250929",
                max_tokens: 2000,
                messages: messages
            });

            const aiResponse = response.content[0].text;
            nextSection = sections[currentSection].next;

            return res.json({
                message: aiResponse,
                section: nextSection,
                complete: nextSection === 'complete'
            });
        }

        // If complete, generate final JSON
        if (currentSection === 'complete') {
            const finalPrompt = `Based on our entire conversation, generate a complete resume in JSON format matching this exact schema:

{
    "profile": {
        "name": "Full Name",
        "taglines": ["Title 1", "Title 2"],
        "contact": { "email": "email", "location": "City, Country", "phone": "+1-234-5678" },
        "social": [{ "icon": "fab fa-linkedin", "url": "https://linkedin.com/in/username" }, { "icon": "fab fa-github", "url": "https://github.com/username" }],
        "profilePic": "profile_pic.jpg"
    },
    "summary": { "summary": ["Paragraph 1", "Paragraph 2"] },
    "journey": [
        { "role": "Job Title", "company": "Company", "date": "2020 - Present", "details": ["Achievement 1", "Achievement 2"] }
    ],
    "skills": ["Skill 1", "Skill 2"],
    "education": {
        "degrees": [{ "degree": "Degree Name", "school": "University", "year": "2020", "grade": "3.8 GPA" }],
        "certifications": [{ "name": "Cert Name", "issuer": "Issuer", "year": "2021", "grade": "Pass" }]
    },
    "highlights": {
        "careerFocus": ["Focus 1", "Focus 2"],
        "scope": ["Scope item 1"],
        "architecture": ["Architecture item 1"],
        "platforms": ["Platform 1"]
    }
}

Return ONLY valid JSON, no explanations.`;

            messages.push({
                role: 'user',
                content: finalPrompt
            });

            const response = await anthropic.messages.create({
                model: process.env.MODEL_NAME || "claude-sonnet-4-5-20250929",
                max_tokens: 4000,
                messages: messages
            });

            let content = response.content[0].text;
            content = content.replace(/```json\n?|\n?```/g, '');
            const jsonMatch = content.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {
                throw new Error('Failed to generate JSON');
            }

            const cvData = JSON.parse(jsonMatch[0]);

            return res.json({
                message: "Perfect! Your CV is ready. Redirecting you now...",
                section: 'complete',
                complete: true,
                cvData: cvData
            });
        }

    } catch (error) {
        console.error('CV Builder Error:', error);
        res.status(500).json({ error: 'CV building failed: ' + error.message });
    }
});

module.exports = router;
