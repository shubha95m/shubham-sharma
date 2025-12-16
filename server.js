const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();
const { Anthropic } = require('@anthropic-ai/sdk');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Initialize Claude Client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// --- API Endpoints ---

// 1. Save Resume Data
app.post('/api/save/:userId/:file', async (req, res) => {
    try {
        const { userId, file } = req.params;
        const newData = req.body;

        // Security check: prevent directory traversal
        if (userId.includes('..') || file.includes('..') || !file.endsWith('.json')) {
            return res.status(400).json({ error: 'Invalid path' });
        }

        const filePath = path.join(__dirname, 'cv-content', userId, file);

        // Write file
        await fs.writeFile(filePath, JSON.stringify(newData, null, 2)); // Pretty print

        console.log(`[SAVED] ${userId}/${file}`);
        res.json({ success: true, message: 'File saved successfully' });
    } catch (error) {
        console.error('Save Error:', error);
        res.status(500).json({ error: 'Failed to save file' });
    }
});

// 2. AI Optimization (Claude)
app.post('/api/ai/optimize', async (req, res) => {
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
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }],
        });

        const refinedText = response.content[0].text.trim();
        res.json({ refinedText });

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'AI processing failed: ' + error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
