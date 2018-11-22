const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = mongoose.model('User');

// @route   GET api/profile/current
// @desc    Get current user profile
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }, (err, profile) => {
      if (err) return res.status(404).json(err);
      if (!profile)
        return res
          .status(404)
          .json({ ...errors, profile: 'Profile not found' });
      res.json(profile);
    });
  }
);

module.exports = router;
