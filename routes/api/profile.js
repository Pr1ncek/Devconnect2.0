const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = mongoose.model('User');
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile/all
// @desc    Get all user profiles
// @access  Public
router.get('/all', (req, res) => {
  Profile.find()
    .populate('user', ['name', 'avatarURL'])
    .exec((err, profiles) => {
      if (profiles.length === 0 || err)
        res.status(404).json({ ...err, profile: 'No profiles found' });
      else res.status(200).json(profiles);
    });
});

// @route   GET api/profile/:handle
// @desc    Get user profile by handle
// @access  Public
router.get('/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatarURL'])
    .exec((err, profile) => {
      if (err) return res.status(404).json(err);
      if (!profile)
        res
          .status(404)
          .json({ ...errors, profile: 'There is no profile for this user' });
      else res.status(200).json(profile);
    });
});

// @route   GET api/profile/id/:id
// @desc    Get profile by user id
// @access  Public
router.get('/id/:id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.id })
    .populate('user', ['name', 'avatarURL'])
    .exec((err, profile) => {
      if (err)
        return res
          .status(404)
          .json({ ...err, profile: 'There is no profile for this user' });
      if (!profile)
        res
          .status(404)
          .json({ ...errors, profile: 'There is no profile for this user' });
      else res.status(200).json(profile);
    });
});

// @route   GET api/profile/current
// @desc    Get current user profile
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatarURL'])
      .exec((err, profile) => {
        if (err) return res.status(404).json(err);
        if (!profile)
          return res
            .status(404)
            .json({ errors, profile: 'There is no profile for this user' });
        res.json(profile);
      });
  }
);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check if all inputs are valid
    const { isValid, errors } = validateProfileInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const {
      skills,
      youtube,
      twitter,
      linkedin,
      github,
      instagram,
      handle
    } = req.body;
    const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(','),
      social: { youtube, twitter, linkedin, instagram, github }
    };
    Profile.findOne({ user: req.user.id }, (err, profile) => {
      if (err) return res.json(err);

      if (!profile) {
        // check if handle is unique
        Profile.findOne({ handle }, (err, profile) => {
          if (profile)
            return res.status(400).json({
              ...errors,
              handle: 'profile handle must be unique'
            });
        });
        Profile.create(profileFields, (err, newProfile) => {
          if (err) return res.json(err);
          res.json(newProfile);
        });
      } else {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { ...profileFields, handle: profile.handle } },
          (err, updatedProfile) => {
            if (err) return res.json(err);
            res.json(updatedProfile);
          }
        );
      }
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }, err => {
      if (err) return res.json(400).json(err);
      res.status(200).json({ Msg: 'Profile deleted' });
    });
  }
);

module.exports = router;
