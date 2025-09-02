const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//publico
router.get('/', postController.getAllPosts); 
router.get('/:id', postController.getPostById); 

//privado
router.post('/', authMiddleware.protect, postController.createPost); 
router.patch('/:id', authMiddleware.protect, postController.updatePost); 
router.delete('/:id', authMiddleware.protect, postController.deletePost);

module.exports = router;