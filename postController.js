const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const newPost = new Post({ title, content, author, tags });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('comments');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { title, content, author, tags },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new comment to a post
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const { content, author } = req.body;
    const newComment = new Comment({ content, author });
    const savedComment = await newComment.save();
    post.comments.push(savedComment);
    await post.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all comments for a specific post
exports.getCommentsForPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a comment within a post by ID
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

// Delete a comment within a post by ID
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const updatedComments = post.comments.filter(
      commentId => commentId.toString() !== req.params.commentId
    );
    if (updatedComments.length === post.comments.length) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    post.comments = updatedComments;
    await post.save();
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
