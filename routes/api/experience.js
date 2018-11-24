const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const validateExperienceInput = require('../../validation/experience');

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check if all inputs are valid
    const { isValid, errors } = validateExperienceInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    Profile.findOne({ user: req.user.id }, (err, profile) => {
      if (err || !profile)
        return res.status(404).json({ ...err, profile: 'No profile found' });
      profile.experience.unshift({ ...req.body });
      profile.save(err => {
        if (err) return res.status(400).json(err);
        res.json({ Msg: 'Experience saved to profile' });
      });
    });
  }
);

// @route   DELETE api/profile/experience/:id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }, (err, profile) => {
      if (err) return res.status(404).json(err);
      const index = profile.experience
        .map(exp => exp.id)
        .indexOf(req.params.id);
      if (index === -1) {
        res
          .status(404)
          .json({ ...errors, experience: 'No experience found with this id' });
      } else {
        profile.experience.splice(index, 1);
        profile.save((err, profile) => {
          if (err) return res.status(404).json(err);
          res.status(200).json({ Msg: 'Experience removed', profile });
        });
      }
    });
  }
);

module.exports = router;
