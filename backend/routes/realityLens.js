const express = require('express');
const multer = require('multer');
const router = express.Router();
const { scanProduct } = require('../controllers/realityLens');
const { authMiddleware } = require('../middleware/auth');

// Use memory storage — we don't actually need to save the file on disk
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/scan', authMiddleware, upload.single('file'), scanProduct);

module.exports = router;
