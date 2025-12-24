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

        // Set viewport with higher DPI for better quality
        await page.setViewport({
            width: 1400,
            height: 900,
            deviceScaleFactor: 2 // Increased for sharper text
        });

        // Navigate to preview URL (hides controls automatically)
        const url = `http://localhost:3000/resume.html?user=${user}&preview=true`;
        console.log(`📄 Loading: ${url}`);

        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Wait for content to render
        await page.evaluate(() => document.fonts.ready);
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('📸 Generating multi-page PDF with fixed sidebar...');

        // Get heights for both sidebar and content
        const dimensions = await page.evaluate(() => {
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            return {
                sidebarHeight: sidebar ? sidebar.scrollHeight : 0,
                contentHeight: mainContent ? mainContent.scrollHeight : 0
            };
        });

        console.log(`Sidebar height: ${dimensions.sidebarHeight}px, Content height: ${dimensions.contentHeight}px`);

        const PDFDocument = require('pdfkit');

        // Fixed sidebar width and better page height
        const sidebarWidth = 320;
        const pageWidth = 1400;
        const pageHeight = 1500; // Further reduced to avoid stretching

        const pdfDoc = new PDFDocument({
            size: [pageWidth, pageHeight],
            margin: 0
        });

        const chunks = [];
        pdfDoc.on('data', chunk => chunks.push(chunk));
        pdfDoc.on('end', () => {});

        // Calculate number of pages needed based on content height
        const numPages = Math.ceil(dimensions.contentHeight / pageHeight);
        console.log(`Generating ${numPages} pages...`);

        for (let pageNum = 0; pageNum < numPages; pageNum++) {
            if (pageNum > 0) {
                pdfDoc.addPage();
            }

            // Capture sidebar (full height, always from top) at 2x scale
            const sidebarScreenshot = await page.screenshot({
                clip: {
                    x: 0,
                    y: 0,
                    width: sidebarWidth,
                    height: Math.min(pageHeight, dimensions.sidebarHeight)
                },
                omitBackground: false
            });

            // Capture content portion for this page at 2x scale
            const contentScreenshot = await page.screenshot({
                clip: {
                    x: sidebarWidth,
                    y: pageNum * pageHeight,
                    width: pageWidth - sidebarWidth,
                    height: Math.min(pageHeight, dimensions.contentHeight - (pageNum * pageHeight))
                },
                omitBackground: false
            });

            // Place sidebar on left
            pdfDoc.image(sidebarScreenshot, 0, 0, {
                width: sidebarWidth,
                height: pageHeight
            });

            // Place content on right (no stretching - use actual height)
            const contentHeightForPage = Math.min(pageHeight, dimensions.contentHeight - (pageNum * pageHeight));
            pdfDoc.image(contentScreenshot, sidebarWidth, 0, {
                width: pageWidth - sidebarWidth,
                height: contentHeightForPage
            });

            console.log(`Page ${pageNum + 1}/${numPages} added`);
        }

        pdfDoc.end();

        // Wait for PDF to be generated
        const pdfBuffer = await new Promise((resolve) => {
            pdfDoc.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
        });

        await browser.close();

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
