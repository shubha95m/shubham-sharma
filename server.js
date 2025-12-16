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

// ========================================
// ROUTES
// ========================================
const cvDataRoutes = require('./routes/cvData');
const aiRoutes = require('./routes/ai');
const importRoutes = require('./routes/import');

app.use('/api', cvDataRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', importRoutes);

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
