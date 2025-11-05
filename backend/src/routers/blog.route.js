const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, getSingleBlog, fetchUserBlogs } = require('../controllers/blog.controller');
const  authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')

const upload = multer({storage: multer.memoryStorage()})

// Simple test route without file upload first
router.get('/test', authMiddleware, (req, res) => {
  res.json({ message: 'Blog route working' });
});

router.get('/getAllBlogs', getAllBlogs);

router.get('/getSingleBlog/:blogId', getSingleBlog)

router.get('/getUserBlog/:id', authMiddleware, fetchUserBlogs)

// Create blog route with better error handling
router.post('/createBlog', upload.single("image"), authMiddleware, createBlog)// Call your controller

module.exports = router;