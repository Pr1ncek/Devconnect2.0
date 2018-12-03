const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys').jwtSecret;
const passport = require('passport');

// Load input validation
const validateSignupInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load user model
const User = require('../../models/User');

// @route   POST api/user/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  // check if all inputs are valid
  const { isValid, errors } = validateSignupInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(400).json({ Error: err });

    if (foundUser)
      return res.status(400).json({ ...errors, email: 'Email already exists' });

    let { name, email, password, avatarURL } = req.body;
    name = name.trim();
    password = password.trim();
    bcrypt.hash(password, 10, (err, hash) => {
      User.create(
        { name, email, password: hash, avatarURL },
        (err, newUser) => {
          if (err) console.log(err);
          else res.json(newUser);
        }
      );
    });
  });
});

// @route   POST api/user/login
// @desc    Login user and return JWT
// @access  Public
router.post('/login', (req, res) => {
  // check if all inputs are valid
  const { isValid, errors } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;
  User.findOne({ email }, (err, foundUser) => {
    if (err) return res.status(400).json({ Error: err });
    if (!foundUser)
      return res.status(400).json({ ...errors, email: 'Email not found' });

    bcrypt.compare(password, foundUser.password, (err, isMatch) => {
      if (!isMatch) {
        res.status(400).json({ ...errors, password: 'Incorrect password' });
      } else {
        jwt.sign(
          {
            email: foundUser.email,
            id: foundUser.id,
            name: foundUser.name
          },
          secret,
          { expiresIn: '24h' },
          (err, token) => {
            res
              .status(200)
              .json({ Login: 'Success', token: `Bearer ${token}` });
          }
        );
      }
    });
  });
});

// @route   GET api/user/current
// @desc    Get info about current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
