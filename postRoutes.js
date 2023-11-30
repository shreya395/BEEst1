const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.put('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);

router.post('/:postId/comments', postController.addComment);
router.get('/:postId/comments', postController.getCommentsForPost);
router.put('/:postId/comments/:commentId', postController.updateComment);
router.delete('/:postId/comments/:commentId', postController.deleteComment);

module.exports = router;
