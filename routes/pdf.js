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

        // Set viewport to match your webpage width (wider than A4)
        await page.setViewport({
            width: 1400,  // Wider to match your split view
            height: 2000,
            deviceScaleFactor: 2
        });

        // Navigate to resume page
        const url = `http://localhost:3000/resume.html?user=${user}`;
        console.log(`📄 Loading: ${url}`);

        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Wait for content to render and fonts to load
        await page.evaluate(() => document.fonts.ready);
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Hide UI controls and setup PDF-friendly layout
        await page.evaluate(() => {
            const controlPanel = document.getElementById('control-panel');
            const carousel = document.getElementById('template-carousel');
            const editButtons = document.querySelectorAll('.edit-trigger');

            if (controlPanel) controlPanel.style.display = 'none';
            if (carousel) carousel.style.display = 'none';
            editButtons.forEach(btn => btn.style.display = 'none');

            // Add CSS for PDF generation - make sidebar appear on every page
            const style = document.createElement('style');
            style.textContent = `
                @page {
                    size: 1400px 2000px;
                    margin: 0;
                }

                body {
                    margin: 0;
                    padding: 0;
                }

                .sidebar {
                    position: fixed !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 280px !important;
                    height: 2000px !important;
                    overflow: visible !important;
                }

                .main-content {
                    margin-left: 280px !important;
                    position: relative !important;
                }
            `;
            document.head.appendChild(style);
        });

        console.log('📸 Taking screenshot of full page...');

        // Get full page height
        const bodyHandle = await page.$('body');
        const { width, height } = await bodyHandle.boundingBox();
        await bodyHandle.dispose();

        console.log(`Page dimensions: ${width}x${height}`);

        // Take full page screenshot
        const screenshot = await page.screenshot({
            fullPage: true,
            type: 'png'
        });

        await browser.close();

        console.log('📄 Converting screenshot to PDF...');

        // Convert screenshot to PDF using PDFKit
        const PDFDocument = require('pdfkit');
        const stream = require('stream');

        // Create PDF document with custom page size
        const doc = new PDFDocument({
            size: [width, height],
            margins: { top: 0, bottom: 0, left: 0, right: 0 }
        });

        // Collect PDF buffer
        const buffers = [];
        const pdfStream = new stream.PassThrough();

        pdfStream.on('data', (chunk) => buffers.push(chunk));
        doc.pipe(pdfStream);

        // Add screenshot as image to PDF
        doc.image(screenshot, 0, 0, { width: width, height: height });
        doc.end();

        // Wait for PDF to be generated
        const pdfBuffer = await new Promise((resolve) => {
            pdfStream.on('end', () => resolve(Buffer.concat(buffers)));
        });

        console.log('✅ PDF generated successfully! Size:', pdfBuffer.length, 'bytes');

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
