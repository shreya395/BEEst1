const Comment = require('../models/commentModel');
const Post = require('../models/postModel');


exports.createComment = async (req, res) => {
  try {
    const { content, author } = req.body;
    const newComment = new Comment({ content, author });
    const savedComment = await newComment.save();


    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push(savedComment);
    await post.save();

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments = post.comments.filter(
      commentId => commentId.toString() !== req.params.commentId
    );
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
