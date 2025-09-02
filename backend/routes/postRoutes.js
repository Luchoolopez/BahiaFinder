const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', postController.getAllPosts); // Get all posts
router.get('/:id', postController.getPostById); // Get a single post by ID

// Protected routes
router.post('/', authMiddleware.protect, postController.createPost); // Create a new post
router.patch('/:id', authMiddleware.protect, postController.updatePost); // Update a post
router.delete('/:id', authMiddleware.protect, postController.deletePost); // Delete a post

module.exports = router;