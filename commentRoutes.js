const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments);
router.get('/:commentId', commentController.getCommentById);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
