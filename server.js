// ========================================
// RESUME BUILDER - MAIN SERVER
// ========================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE
// ========================================
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(__dirname));
// Serve temp-pdfs directory for direct PDF access
app.use('/temp-pdfs', express.static(__dirname + '/temp-pdfs'));

// ========================================
// ROUTES
// ========================================
const cvDataRoutes = require('./routes/cvData');
const aiRoutes = require('./routes/ai');
const importRoutes = require('./routes/import');
const pdfRoutes = require('./routes/pdf');

app.use('/api', cvDataRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', importRoutes);
app.use('/api/pdf', pdfRoutes);

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
