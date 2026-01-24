const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// @route   POST /api/upload
// @desc    Upload single image to Cloudinary
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    res.json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images to Cloudinary
router.post('/multiple', upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files provided' });
    }
    const uploadedImages = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
    res.json(uploadedImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
