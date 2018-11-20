const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys').jwtSecret;

// Load user model
const User = require('../../models/User');

// @route   POST api/user/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(400).json({ Error: err });

    if (foundUser)
      return res.status(400).json({ Email: 'Email already exists' });

    const { name, email, password, avatarURL } = req.body;
    //console.log(name, email, password, avatarURL);
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
  const { email, password } = req.body;

  User.findOne({ email }, (err, foundUser) => {
    if (err) return res.status(400).json({ Error: err });
    if (!foundUser) return res.status(400).json({ Email: 'Email not found' });

    bcrypt.compare(password, foundUser.password, (err, isMatch) => {
      if (!isMatch) {
        res.send({ Password: 'Incorrect password' });
      } else {
        jwt.sign(
          { email: foundUser.email, id: foundUser.id },
          secret,
          { expiresIn: '24h' },
          (err, token) => {
            res.send({ Login: 'Success', Token: `Bearer ${token}` });
          }
        );
      }
    });
  });
});

module.exports = router;
