const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Store for generated PDFs (temporary, in-memory storage)
const pdfCache = new Map();

// GET /api/pdf/generate?user=Shubham
router.get('/generate', async (req, res) => {
    const { user } = req.query;

    if (!user) {
        return res.status(400).json({ error: 'User parameter is required' });
    }

    console.log(`🚀 Generating PDF for user: ${user}`);

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Set viewport for proper rendering (A4 landscape proportions)
        await page.setViewport({
            width: 1400,   // Wide viewport for split layout
            height: 990,   // A4 landscape proportions
            deviceScaleFactor: 1
        });

        // Navigate to resume page with PDF export mode
        const url = `http://localhost:3000/resume.html?user=${user}&export=pdf`;
        console.log(`📄 Loading: ${url}`);

        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Wait for content to render and fonts to load
        await page.evaluate(() => document.fonts.ready);
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Hide UI controls
        await page.evaluate(() => {
            const controlPanel = document.getElementById('control-panel');
            const carousel = document.getElementById('template-carousel');
            const editButtons = document.querySelectorAll('.edit-trigger');

            if (controlPanel) controlPanel.style.display = 'none';
            if (carousel) carousel.style.display = 'none';
            editButtons.forEach(btn => btn.style.display = 'none');
        });

        console.log('📸 Generating PDF with native rendering...');

        // Generate PDF directly using Puppeteer (much smaller file size)
        const pdfBuffer = await page.pdf({
            format: 'A4',
            landscape: true,
            printBackground: true,
            preferCSSPageSize: false,
            margin: {
                top: '0px',
                bottom: '0px',
                left: '0px',
                right: '0px'
            },
            displayHeaderFooter: false,
            scale: 0.72,  // Adjusted scale to fit all content
            tagged: false,
            omitBackground: false
        });

        await browser.close();

        console.log('✅ PDF generated successfully! Size:', pdfBuffer.length, 'bytes', `(${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB)`);

        // Save to temp file AND Downloads folder
        const filename = `${user.replace(/\s+/g, '_')}_Resume.pdf`;
        const tempDir = path.join(__dirname, '..', 'temp-pdfs');

        // Create temp directory if it doesn't exist
        try {
            await fs.mkdir(tempDir, { recursive: true });
        } catch (err) {
            // Directory already exists
        }

        const tempFilePath = path.join(tempDir, filename);
        await fs.writeFile(tempFilePath, pdfBuffer);

        console.log('💾 PDF saved to temp:', tempFilePath);

        // Also save to Downloads folder
        const os = require('os');
        const downloadsPath = path.join(os.homedir(), 'Downloads', filename);
        await fs.writeFile(downloadsPath, pdfBuffer);

        console.log('✅ PDF copied to Downloads:', downloadsPath);

        // Store in cache with timestamp
        const pdfId = Date.now().toString();
        pdfCache.set(pdfId, {
            buffer: pdfBuffer,
            filename: filename,
            timestamp: Date.now()
        });

        // Clean up old PDFs from cache (older than 5 minutes)
        for (const [id, data] of pdfCache.entries()) {
            if (Date.now() - data.timestamp > 5 * 60 * 1000) {
                pdfCache.delete(id);
            }
        }

        // Return success with PDF ID and direct download URL
        res.json({
            success: true,
            pdfId: pdfId,
            filename: filename,
            downloadUrl: `/api/pdf/download/${pdfId}`,
            viewUrl: `/api/pdf/view/${pdfId}`,
            size: pdfBuffer.length
        });

    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        if (browser) await browser.close();
        res.status(500).json({ error: 'Failed to generate PDF', message: error.message });
    }
});

// GET /api/pdf/download/:id - Download PDF
router.get('/download/:id', (req, res) => {
    const { id } = req.params;
    const pdfData = pdfCache.get(id);

    if (!pdfData) {
        return res.status(404).json({ error: 'PDF not found or expired' });
    }

    console.log('📥 Downloading PDF:', pdfData.filename);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${pdfData.filename}"`);
    res.send(pdfData.buffer);
});

// GET /api/pdf/view/:id - View PDF in browser
router.get('/view/:id', (req, res) => {
    const { id } = req.params;
    const pdfData = pdfCache.get(id);

    if (!pdfData) {
        return res.status(404).json({ error: 'PDF not found or expired' });
    }

    console.log('👁️ Viewing PDF:', pdfData.filename);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${pdfData.filename}"`);
    res.send(pdfData.buffer);
});

module.exports = router;
