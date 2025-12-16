const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Save Resume Data
router.post('/save/:userId/:file', async (req, res) => {
    try {
        const { userId, file } = req.params;
        const newData = req.body;

        // Security check: prevent directory traversal
        if (userId.includes('..') || file.includes('..') || !file.endsWith('.json')) {
            return res.status(400).json({ error: 'Invalid path' });
        }

        const filePath = path.join(__dirname, '..', 'cv-content', userId, file);
        const userDir = path.join(__dirname, '..', 'cv-content', userId);

        // Create directory if it doesn't exist
        await fs.mkdir(userDir, { recursive: true });

        // Write file
        await fs.writeFile(filePath, JSON.stringify(newData, null, 2));

        console.log(`[SAVED] ${userId}/${file}`);
        res.json({ success: true, message: 'File saved successfully' });
    } catch (error) {
        console.error('Save Error:', error);
        res.status(500).json({ error: 'Failed to save file' });
    }
});

// Save users.json
router.post('/save-users', async (req, res) => {
    try {
        const users = req.body;
        const usersFile = path.join(__dirname, '..', 'cv-content', 'users.json');

        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

        console.log('[SAVED] users.json');
        res.json({ success: true, message: 'Users file saved successfully' });
    } catch (error) {
        console.error('Save Users Error:', error);
        res.status(500).json({ error: 'Failed to save users file' });
    }
});

// Delete Profile
router.delete('/delete/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Security check
        if (userId.includes('..') || userId === 'users.json') {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const userDir = path.join(__dirname, '..', 'cv-content', userId);
        const usersFile = path.join(__dirname, '..', 'cv-content', 'users.json');

        // Remove Directory
        await fs.rm(userDir, { recursive: true, force: true });

        // Remove from users.json
        let users = [];
        try {
            const usersData = await fs.readFile(usersFile, 'utf8');
            users = JSON.parse(usersData);

            const newUsers = users.filter(u => u.id !== userId);

            if (newUsers.length !== users.length) {
                await fs.writeFile(usersFile, JSON.stringify(newUsers, null, 2));
            }
        } catch (e) {
            console.error('Error updating users.json during delete', e);
        }

        console.log(`[DELETED] User: ${userId}`);
        res.json({ success: true });

    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ error: 'Delete failed: ' + error.message });
    }
});

module.exports = router;
