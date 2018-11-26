const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

// @route   GET api/post
// @desc    Get all post
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .exec((err, posts) => {
      if (err || posts.length === 0)
        return res.status(404).json({ err, posts: 'No posts found' });
      res.status(200).json(posts);
    });
});

// @route   GET api/post/:id
// @desc    Get a post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err || !post)
      return res.status(404).json({ err, posts: 'No post found with this id' });
    res.status(200).json(post);
  });
});

// @route   POST api/post
// @desc    Create a post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check if all inputs are valid
    const { isValid, errors } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Post.create({ ...req.body, user: req.user.id }, (err, post) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(post);
    });
  }
);

// @route   DELETE api/post/:id
// @desc    Delete a post by id
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err || !post)
        return res
          .status(404)
          .json({ ...err, post: 'No post found with this id' });
      if (post.user.toString() !== req.user.id)
        return res.status(401).json({ post: 'Not authorized' });
      post.remove().then(() => {
        res.status(200).json({ Msg: 'Post deleted succesfully' });
      });
    });
  }
);

// @route   POST api/post/like/:post_id
// @desc    Like a post
// @access  Private
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id, (err, post) => {
      if (err || !post)
        return res
          .status(404)
          .json({ err, post: 'No post found with this id' });
      // check to see if user already liked a post
      const index = post.likes.indexOf(req.user.id);
      index === -1 ? post.likes.push(req.user.id) : post.likes.splice(index, 1);
      post.save(err => {
        if (err)
          return res.status(400).json({ err, post: 'post could not be saved' });
        res.status(200).json({ Success: true });
      });
    });
  }
);

// @route   POST api/post/comment/:post_id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check if all inputs are valid
    const { isValid, errors } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Post.findById(req.params.post_id, (err, post) => {
      if (err || !post)
        return res
          .status(404)
          .json({ ...err, post: 'No post found with this id' });
      post.comments.push({ user: req.user.id, ...req.body });
      post.save(err => {
        if (err)
          return res
            .status(400)
            .json({ err, post: 'comment could not be saved' });
        res.status(200).json({ Success: true });
      });
    });
  }
);

// @route   DELETE api/post/comment/:post_id
// @desc    Delete a comment on a post
// @access  Private
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id, comment_id } = req.params;
    Post.findById(post_id, (err, post) => {
      if (err || !post)
        return res
          .status(404)
          .json({ ...err, post: 'No post found with this id' });
      const index = post.comments.findIndex(
        comment => comment.id === comment_id
      );
      if (index !== -1) post.comments.splice(index, 1);
      else return res.status(404).json({ post: 'comment not found' });
      post.save(err => {
        if (err)
          return res
            .status(400)
            .json({ err, post: 'comment could not be deleted' });
        res.status(200).json({ Success: true });
      });
    });
  }
);

module.exports = router;
