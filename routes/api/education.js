const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const validateEducationInput = require('../../validation/education');

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check if all inputs are valid
    const { isValid, errors } = validateEducationInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    Profile.findOne({ user: req.user.id }, (err, profile) => {
      if (err || !profile)
        return res.status(404).json({ ...err, profile: 'No profile found' });
      profile.education.unshift({ ...req.body });
      profile.save(err => {
        if (err) return res.status(400).json(err);
        res.json({ Msg: 'Education saved to profile' });
      });
    });
  }
);

// @route   DELETE api/profile/education/:id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }, (err, profile) => {
      if (err) return res.status(404).json(err);
      const index = profile.education.map(edu => edu.id).indexOf(req.params.id);
      if (index === -1) {
        res
          .status(404)
          .json({ ...errors, education: 'No education found with this id' });
      } else {
        profile.education.splice(index, 1);
        profile.save((err, profile) => {
          if (err) return res.status(404).json(err);
          res.status(200).json({ Msg: 'Education removed', profile });
        });
      }
    });
  }
);

module.exports = router;
